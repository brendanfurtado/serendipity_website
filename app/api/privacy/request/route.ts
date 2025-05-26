// app/api/privacy/request/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import config from "@/config";

// Define the allowed request types
const ALLOWED_REQUEST_TYPES = [
  "access", // Access to their data
  "delete", // Delete their data
  "opt-out", // Opt out of marketing
];

export async function POST(req: NextRequest) {
  try {
    const { email, requestType, additionalInfo } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate request type
    if (!requestType || !ALLOWED_REQUEST_TYPES.includes(requestType)) {
      return NextResponse.json(
        {
          error: "Invalid request type",
          allowedTypes: ALLOWED_REQUEST_TYPES,
        },
        { status: 400 }
      );
    }

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

Please review this request in the admin dashboard and process it according to our privacy policy guidelines.`,
        html: `
          <div style="font-family: sans-serif;">
            <h2>New Privacy Request</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Request Type:</strong> ${requestType}</p>
            <p><strong>Additional Information:</strong> ${
              additionalInfo || "None provided"
            }</p>
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

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Privacy request submitted successfully",
      requestId: data.id,
    });
  } catch (error) {
    console.error("Error processing privacy request:", error);
    return NextResponse.json(
      { error: "Failed to process privacy request" },
      { status: 500 }
    );
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
