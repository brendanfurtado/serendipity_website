// app/api/privacy/opt-out/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import config from "@/config";

// Define the types of opt-out requests we support
type OptOutType = "marketing" | "all";

export async function POST(req: NextRequest) {
  try {
    const { email, optOutType, additionalInfo } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate opt-out type
    if (!optOutType || !["marketing", "all"].includes(optOutType)) {
      return NextResponse.json(
        {
          error: "Invalid opt-out type",
          allowedTypes: ["marketing", "all"],
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    let marketingResult;

    // Process marketing opt-out
    const { data, error } = await supabase.rpc("process_marketing_opt_out", {
      p_email: email,
    });

    if (error) {
      console.error("Error processing marketing opt-out:", error);
      return NextResponse.json(
        {
          error: "Failed to process marketing opt-out",
          details: error.message,
        },
        { status: 500 }
      );
    }

    marketingResult = data;

    // Submit a privacy request to track this opt-out
    // This ensures we have a record of the request for compliance purposes
    await supabase.rpc("submit_privacy_request", {
      p_email: email,
      p_request_type: "opt-out",
      p_additional_info: JSON.stringify({
        optOutType,
        userNotes: additionalInfo,
        timestamp: new Date().toISOString(),
      }),
    });

    // Send confirmation to user
    try {
      await sendEmail({
        to: email,
        subject: `Opt-Out Confirmation - ${config.appName}`,
        text: getOptOutEmailText(email, optOutType),
        html: getOptOutEmailHtml(email, optOutType),
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Continue processing even if confirmation email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Opt-out request processed successfully",
      marketingResult: marketingResult || null,
    });
  } catch (error) {
    console.error("Error processing opt-out request:", error);
    return NextResponse.json(
      { error: "Failed to process opt-out request" },
      { status: 500 }
    );
  }
}

// Get user's opt-out status
export async function GET(req: NextRequest) {
  // Extract email from query parameters
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_opt_out_status", {
      p_email: email,
    });

    if (error) {
      console.error("Error getting opt-out status:", error);
      return NextResponse.json(
        {
          error: "Failed to get opt-out status",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting opt-out status:", error);
    return NextResponse.json(
      { error: "Failed to get opt-out status" },
      { status: 500 }
    );
  }
}

// Helper functions for email content
function getOptOutEmailText(email: string, optOutType: OptOutType): string {
  let content = `Dear ${config.appName} User,\n\nWe've processed your opt-out request for ${email}.\n\n`;

  content +=
    "You have opted out of receiving marketing communications. You will still receive essential communications about your waitlist status and when the app launches.\n\n";

  content += `If you wish to completely delete your data from our systems, you can submit a deletion request through our privacy portal.\n\nThank you for your interest in ${config.appName}.\n\nBest regards,\nThe ${config.appName} Team`;

  return content;
}

function getOptOutEmailHtml(email: string, optOutType: OptOutType): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #e11d48; margin-bottom: 20px;">Opt-Out Request Processed</h1>
      <p>Dear ${config.appName} User,</p>
      <p>We've processed your opt-out request for <strong>${email}</strong>.</p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #e11d48; border-radius: 4px;">
        <h3 style="margin-top: 0;">Marketing Communications</h3>
        <p>You have opted out of receiving marketing communications. You will still receive essential communications about your waitlist status and when the app launches.</p>
      </div>
      
      <p>If you wish to completely delete your data from our systems, you can <a href="${
        process.env.NEXT_PUBLIC_SUPABASE_URL
          ? `https://${config.domainName}/privacy`
          : "http://localhost:3000/privacy"
      }" style="color: #e11d48;">submit a deletion request</a> through our privacy portal.</p>
      
      <p>Thank you for your interest in ${config.appName}.</p>
      
      <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
        <p style="margin: 0; color: #111827; font-weight: bold;">The ${
          config.appName
        } Team</p>
      </div>
    </div>
  `;
}
