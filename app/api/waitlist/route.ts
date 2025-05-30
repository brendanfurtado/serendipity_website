// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/resend";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import {
  validateEmail,
  validateAge,
  validateText,
  INPUT_LIMITS,
} from "@/utils/inputValidation";

const ALLOWED_GENDERS = [
  "man",
  "woman",
  "non-binary",
  "queer",
  "other",
  "prefer-not-to-say",
] as const;

interface ValidationError {
  field: string;
  message: string;
}

interface WaitlistData {
  email: string;
  gender: string;
  age: number;
}

/**
 * Server-side validation for waitlist signup
 */
function validateWaitlistData(data: {
  email?: string;
  gender?: string;
  age?: number | string;
}): {
  isValid: boolean;
  errors: ValidationError[];
  sanitizedData?: WaitlistData;
} {
  const errors: ValidationError[] = [];
  const sanitizedData: Partial<WaitlistData> = {};

  // Validate email using utils
  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push({ field: "email", message: emailValidation.error! });
    } else {
      sanitizedData.email = emailValidation.sanitizedValue!;
    }
  }

  // Validate age using utils
  if (data.age === undefined || data.age === null) {
    errors.push({ field: "age", message: "Age is required" });
  } else {
    const ageValidation = validateAge(data.age);
    if (!ageValidation.isValid) {
      errors.push({ field: "age", message: ageValidation.error! });
    } else {
      sanitizedData.age = parseInt(ageValidation.sanitizedValue!, 10);
    }
  }

  // Validate gender
  if (!data.gender) {
    errors.push({ field: "gender", message: "Gender identity is required" });
  } else if (typeof data.gender !== "string") {
    errors.push({ field: "gender", message: "Gender must be a string" });
  } else if (!ALLOWED_GENDERS.includes(data.gender as any)) {
    errors.push({
      field: "gender",
      message: "Invalid gender identity selected",
    });
  } else {
    const genderValidation = validateText(data.gender, {
      maxLength: 50,
      allowHtml: false,
      required: true,
    });
    if (!genderValidation.isValid) {
      errors.push({ field: "gender", message: genderValidation.error! });
    } else {
      sanitizedData.gender = genderValidation.sanitizedValue!;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData:
      errors.length === 0 ? (sanitizedData as WaitlistData) : undefined,
  };
}

/**
 * Detects malicious content (SQL injection, XSS) - removed since it's in utils now
 */

/**
 * Rate limiting check (basic implementation)
 * In production, consider using Redis or a proper rate limiting service
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // 3 signups per window per IP

  const current = rateLimitMap.get(ip);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Extract client IP address properly
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip"); // Cloudflare

    // Get the first IP if x-forwarded-for contains multiple IPs
    const ip =
      cfConnectingIp ||
      realIp ||
      (forwarded ? forwarded.split(",")[0].trim() : null) ||
      "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate and sanitize input
    const validation = validateWaitlistData(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {} as Record<string, string>),
        },
        { status: 400 }
      );
    }

    const { email, gender, age } = validation.sanitizedData!;

    // Get additional source information
    const headers = req.headers;
    const referer = headers.get("referer") || "";
    const userAgent = headers.get("user-agent") || "";
    const url = new URL(req.url);
    const source = url.searchParams.get("source") || "website";
    const utmSource = url.searchParams.get("utm_source") || null;
    const utmMedium = url.searchParams.get("utm_medium") || null;
    const utmCampaign = url.searchParams.get("utm_campaign") || null;

    // Get country information from headers if available
    const country = headers.get("cf-ipcountry") || null; // Cloudflare provides this

    // Store the submission using our function
    const supabase = await createClient();
    const { data: signupData, error: signupError } = await supabase.rpc(
      "add_waitlist_signup",
      {
        p_email: email,
        p_gender: gender,
        p_age: age,
        p_source: source,
        p_utm_source: utmSource,
        p_utm_campaign: utmCampaign,
        p_utm_medium: utmMedium,
        p_referrer: referer,
        p_user_agent: userAgent,
        p_country_code: country,
      }
    );

    if (signupError || (signupData && !signupData.success)) {
      console.error(
        "Error saving to database:",
        signupError || signupData?.message
      );

      // If the user is already on the waitlist, let them know but don't treat as an error
      if (signupData?.error === "email_exists") {
        return NextResponse.json(
          {
            success: true,
            message: "You're already on our waitlist!",
            alreadySignedUp: true,
            totalSignups: await getSignupCount(supabase),
          },
          { status: 200 }
        );
      }

      throw signupError || new Error(signupData?.message);
    }

    // Get the total signup count
    const totalSignups =
      signupData?.total_signups || (await getSignupCount(supabase));

    // Log successful signup for security monitoring
    console.log(
      `Waitlist signup: ${email} (${gender}, Age: ${age}) from IP: ${ip} at ${new Date().toISOString()}`
    );

    // Track email sending errors but don't fail the whole signup process
    let confirmationEmailError = null;
    let adminEmailError = null;

    // Send confirmation email to the user
    try {
      await sendEmail({
        to: email,
        subject: `Welcome to the ${config.appName} Waitlist!`,
        text: `Thank you for joining our waitlist! We'll keep you updated on our progress and let you know when we're ready to welcome you to our community.`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #e11d48; margin-bottom: 20px;">Welcome to the ${config.appName} Waitlist!</h1>
            <p>Thank you for joining our waitlist! We're excited to have you as part of our growing community.</p>
            <p>We're building a dating platform focused on balance and authenticity, and we can't wait to share it with you.</p>
            <p>You're number <strong>${totalSignups}</strong> to join our waitlist!</p>
            <p>We'll keep you updated on our progress and let you know when we're ready to welcome you.</p>
            <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: #111827; font-weight: bold;">The ${config.appName} Team</p>
            </div>
            <p style="font-size: 12px; color: #6b7280;">If you didn't sign up for this waitlist, please ignore this email.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      confirmationEmailError = error;
      // Continue with the process even if email fails
    }

    // Send notification to admin
    try {
      await sendEmail({
        to:
          config.resend.supportEmail ||
          config.resend.fromAdmin.split("<")[1].replace(">", ""),
        subject: "New Waitlist Signup",
        text: `New waitlist signup: ${email} (${gender}, Age: ${age}). Total waitlist: ${totalSignups}. IP: ${ip}`,
        html: `
          <div style="font-family: sans-serif;">
            <h2>New Waitlist Signup</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Total Signups:</strong> ${totalSignups}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Country:</strong> ${country || "Unknown"}</p>
            <p><strong>IP Address:</strong> ${ip}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
        replyTo: email,
      });
    } catch (error) {
      console.error("Error sending admin notification email:", error);
      adminEmailError = error;
      // Continue with the process even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist",
        totalSignups,
        confirmationEmailError: confirmationEmailError ? true : undefined,
        adminEmailError: adminEmailError ? true : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Failed to process waitlist submission" },
      { status: 500 }
    );
  }
}

// Helper function to get the current signup count
async function getSignupCount(supabase: any): Promise<number> {
  try {
    const { data, error } = await supabase.rpc("get_signup_count");
    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error("Error getting signup count:", error);
    return 0;
  }
}
