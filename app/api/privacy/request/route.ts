// app/api/privacy/request/route.ts - Clean API route without JSX
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import config from "@/config";
import {
  validatePrivacyRequestForm,
  INPUT_LIMITS,
} from "@/utils/inputValidation";
import {
  generateDeletionToken,
  generateDeletionConfirmationUrl,
  validateJwtConfiguration,
} from "@/utils/jwtUtils";

const ALLOWED_REQUEST_TYPES = ["access", "delete", "opt-out"] as const;

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Rate limiting check (basic implementation)
 * In production, consider using Redis or a proper rate limiting service
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per window

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
    // Validate JWT configuration on startup
    if (!validateJwtConfiguration()) {
      console.error("JWT configuration invalid");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

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
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate and sanitize input using utils
    const validation = validatePrivacyRequestForm({
      email: body.email,
      requestType: body.requestType,
      additionalInfo: body.additionalInfo,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { email, requestType, additionalInfo } = validation.sanitizedData!;

    // Submit the request using our Supabase function
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("submit_privacy_request", {
      p_email: email,
      p_request_type: requestType,
      p_additional_info: additionalInfo || null,
    });

    if (error || (data && !data.success)) {
      console.error(
        "Error submitting privacy request:",
        error || data?.message
      );
      return NextResponse.json(
        {
          error: "Failed to submit request",
          details: error?.message || data?.message,
        },
        { status: 500 }
      );
    }

    const requestId = data.id;

    // Handle deletion requests differently
    if (requestType === "delete") {
      await handleDeletionRequest(email, requestId, ip, supabase);
    } else {
      // Handle other request types (access, opt-out) as before
      await handleStandardPrivacyRequest(
        email,
        requestType,
        additionalInfo,
        ip,
        requestId
      );
    }

    // Log the request for security monitoring
    console.log(
      `Privacy request submitted: ${requestType} for ${email} from IP: ${ip}`
    );

    // Return success response with appropriate message
    const responseMessage =
      requestType === "delete"
        ? "If your email exists in our system, you'll receive a confirmation email to complete the deletion process."
        : "Privacy request submitted successfully";

    return NextResponse.json({
      success: true,
      message: responseMessage,
      requestId: requestId,
    });
  } catch (error) {
    console.error("Error processing privacy request:", error);
    return NextResponse.json(
      { error: "Failed to process privacy request" },
      { status: 500 }
    );
  }
}

/**
 * Handle deletion requests with email confirmation
 */
async function handleDeletionRequest(
  email: string,
  requestId: string,
  ip: string,
  supabase: any
): Promise<void> {
  try {
    // Check if user exists in waitlist (for logging, but don't reveal to user)
    const { data: userExists } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .single();

    // Log deletion attempt for non-existent users
    if (!userExists) {
      console.log(
        `Deletion request for non-existent user: ${email} from IP: ${ip}`
      );
    }

    // Generate JWT token for confirmation (2 hours expiry)
    const token = await generateDeletionToken(email, requestId, 2);
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

    // Create deletion confirmation record (only if user exists)
    if (userExists) {
      const { data: confirmationData, error: confirmationError } =
        await supabase.rpc("create_deletion_confirmation", {
          p_email: email,
          p_token: token,
          p_privacy_request_id: requestId,
          p_ip_address: ip,
          p_expires_at: expiresAt.toISOString(),
        });

      if (confirmationError || !confirmationData?.success) {
        console.error(
          "Error creating deletion confirmation:",
          confirmationError || confirmationData
        );

        // Check if it's a pending request or rate limit issue
        if (confirmationData?.error === "pending_request") {
          throw new Error(
            "A deletion request is already pending for this email address."
          );
        } else if (confirmationData?.error === "rate_limit_exceeded") {
          throw new Error(
            "Too many deletion requests from this location. Please try again in 24 hours."
          );
        } else {
          throw new Error("Failed to create deletion confirmation");
        }
      }

      // Send confirmation email
      await sendDeletionConfirmationEmail(email, token);
    }

    // Always send admin notification (whether user exists or not)
    await sendAdminDeletionNotification(email, requestId, ip, !!userExists);
  } catch (error) {
    console.error("Error handling deletion request:", error);
    throw error;
  }
}

/**
 * Handle standard privacy requests (access, opt-out)
 */
async function handleStandardPrivacyRequest(
  email: string,
  requestType: string,
  additionalInfo: string | null,
  ip: string,
  requestId: string
): Promise<void> {
  // Notify admin of the request
  try {
    await sendEmail({
      to:
        config.resend.supportEmail ||
        config.resend.fromAdmin.split("<")[1].replace(">", ""),
      subject: `Privacy Request: ${requestType}`,
      text: `New privacy request:
        
Email: ${email}
Request Type: ${requestType}
Additional Info: ${additionalInfo || "None provided"}
IP Address: ${ip}
Timestamp: ${new Date().toISOString()}

Please review this request in the admin dashboard and process it according to our privacy policy guidelines.`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Privacy Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Request Type:</strong> ${requestType}</p>
          <p><strong>Additional Information:</strong> ${
            additionalInfo || "None provided"
          }</p>
          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p style="margin-top: 20px;">Please review this request in the admin dashboard and process it according to our privacy policy guidelines.</p>
        </div>
      `,
      replyTo: email,
    });
  } catch (emailError) {
    console.error("Error sending admin notification:", emailError);
    // Continue processing even if admin email fails
  }

  // Send confirmation to user
  try {
    await sendEmail({
      to: email,
      subject: `Your Privacy Request - ${config.appName}`,
      text: `We've received your ${requestType} request. We'll process this within the timeframe required by applicable privacy laws and contact you if we need additional information.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e11d48; margin-bottom: 20px;">Privacy Request Received</h1>
          <p>Thank you for submitting your privacy request. We've received your request to ${getRequestDescription(
            requestType
          )}.</p>
          <p>We'll process this within the timeframe required by applicable privacy laws (typically within 30 days) and contact you if we need additional information.</p>
          <p>If you have any questions, please contact us at ${
            config.resend.supportEmail || "dev@serendipitydating.io"
          }.</p>
          <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
            <p style="margin: 0; color: #111827; font-weight: bold;">The ${
              config.appName
            } Team</p>
          </div>
        </div>
      `,
    });
  } catch (emailError) {
    console.error("Error sending confirmation email:", emailError);
    // Continue processing even if confirmation email fails
  }
}

/**
 * Send deletion confirmation email to user
 */
async function sendDeletionConfirmationEmail(
  email: string,
  token: string
): Promise<void> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${config.domainName}`;

  const confirmationUrl = generateDeletionConfirmationUrl(baseUrl, token);

  await sendEmail({
    to: email,
    subject: `Confirm Account Deletion - ${config.appName}`,
    text: `
You requested to delete your account and all data from ${config.appName}.

⚠️ IMPORTANT: This action will permanently remove you from our waitlist and delete all your data. This cannot be undone.

If you want to proceed with deletion, click this link within 2 hours:
${confirmationUrl}

If you don't want to delete your account, simply ignore this email and no action will be taken.

This link expires in 2 hours for your security.

If you didn't request this deletion, please contact us at ${
      config.resend.supportEmail || "dev@serendipitydating.io"
    }.
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e11d48; margin-bottom: 20px;">Confirm Account Deletion</h1>
        
        <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin-top: 0;">⚠️ Important Notice</h3>
          <p style="color: #dc2626; margin-bottom: 0;">This action will permanently remove you from our waitlist and delete all your data. This cannot be undone.</p>
        </div>

        <p>You requested to delete your account and all data from ${
          config.appName
        }.</p>
        
        <p>If you want to proceed with deletion, click the button below within 2 hours:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmationUrl}" 
             style="display: inline-block; background: linear-gradient(to right, #ef4444, #dc2626); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Confirm Deletion
          </a>
        </div>
        
        <p><strong>If you don't want to delete your account</strong>, simply ignore this email and no action will be taken.</p>
        
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0;">What happens when you confirm:</h4>
          <ul style="margin-bottom: 0;">
            <li>Your email will be removed from our waitlist</li>
            <li>All your profile information will be deleted</li>
            <li>You will no longer receive updates about Serendipity</li>
            <li>This action cannot be reversed</li>
          </ul>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          <strong>Security Notice:</strong> This link expires in 2 hours and can only be used once.
        </p>
        
        <p style="font-size: 12px; color: #6b7280;">
          If you didn't request this deletion, please contact us immediately at ${
            config.resend.supportEmail || "dev@serendipitydating.io"
          }.
        </p>
        
        <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
          <p style="margin: 0; color: #111827; font-weight: bold;">The ${
            config.appName
          } Team</p>
        </div>
      </div>
    `,
  });
}

/**
 * Send admin notification for deletion requests
 */
async function sendAdminDeletionNotification(
  email: string,
  requestId: string,
  ip: string,
  userExists: boolean
): Promise<void> {
  try {
    await sendEmail({
      to:
        config.resend.supportEmail ||
        config.resend.fromAdmin.split("<")[1].replace(">", ""),
      subject: `Deletion Request: ${email}`,
      text: `New deletion request received:
        
Email: ${email}
User Exists: ${userExists ? "Yes" : "No"}
Request ID: ${requestId}
IP Address: ${ip}
Timestamp: ${new Date().toISOString()}

${
  userExists
    ? "Confirmation email sent to user."
    : "No confirmation email sent (user not found)."
}

Monitor for completion or expiration.`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Deletion Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>User Exists:</strong> ${userExists ? "Yes" : "No"}</p>
          <p><strong>Request ID:</strong> ${requestId}</p>
          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Status:</strong> ${
            userExists
              ? "Confirmation email sent to user"
              : "No confirmation email sent (user not found)"
          }</p>
          <p style="margin-top: 20px;">Monitor for completion or expiration.</p>
        </div>
      `,
      replyTo: email,
    });
  } catch (emailError) {
    console.error("Error sending admin deletion notification:", emailError);
  }
}

// Helper function to get human-readable request descriptions
function getRequestDescription(requestType: string): string {
  const descriptions: Record<string, string> = {
    access: "access your personal data",
    delete: "delete your personal data",
    correct: "correct your personal data",
    restrict: "restrict processing of your personal data",
    object: "object to processing of your personal data",
    "opt-out": "opt out of marketing communications",
  };

  return descriptions[requestType] || requestType;
}
