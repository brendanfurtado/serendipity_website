import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/resend";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export async function POST(req: NextRequest) {
  try {
    const { email, gender } = await req.json();
    const headers = req.headers;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get source information
    const referer = headers.get("referer") || "";
    const userAgent = headers.get("user-agent") || "";
    const url = new URL(req.url);
    const source = url.searchParams.get("source") || "website";
    const utmSource = url.searchParams.get("utm_source") || null;
    const utmMedium = url.searchParams.get("utm_medium") || null;
    const utmCampaign = url.searchParams.get("utm_campaign") || null;

    // Get country information from headers if available (in real implementation
    // you might use a geolocation service instead of storing raw IP)
    const country = headers.get("cf-ipcountry") || null; // Cloudflare provides this

    // Store the submission using our function
    const supabase = createClient();
    const { data: signupData, error: signupError } = await supabase.rpc(
      "add_waitlist_signup",
      {
        p_email: email,
        p_gender: gender,
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

    // Send confirmation email to the user
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

    // Also send a notification to the admin
    await sendEmail({
      to:
        config.resend.supportEmail ||
        config.resend.fromAdmin.split("<")[1].replace(">", ""),
      subject: "New Waitlist Signup",
      text: `New waitlist signup: ${email} (${gender}). Total waitlist: ${totalSignups}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Gender:</strong> ${gender || "Not specified"}</p>
          <p><strong>Total Signups:</strong> ${totalSignups}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Country:</strong> ${country || "Unknown"}</p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist",
        totalSignups,
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
async function getSignupCount(supabase: any) {
  try {
    const { data, error } = await supabase.rpc("get_signup_count");
    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error("Error getting signup count:", error);
    return 0;
  }
}
