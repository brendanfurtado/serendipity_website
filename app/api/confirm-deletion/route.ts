// app/api/confirm-deletion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { verifyDeletionToken, extractTokenFromUrl } from "@/utils/jwtUtils";

/**
 * Handle deletion confirmation via GET request with token parameter
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = extractTokenFromUrl(url.searchParams);

    if (!token) {
      return NextResponse.json(
        {
          error: "missing_token",
          message: "No confirmation token provided",
        },
        { status: 400 }
      );
    }

    // Verify the JWT token
    const tokenPayload = await verifyDeletionToken(token);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          error: "invalid_token",
          message: "Invalid or expired confirmation token",
        },
        { status: 400 }
      );
    }

    // Process the deletion confirmation
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("confirm_deletion", {
      p_token: token,
    });

    if (error) {
      console.error("Error confirming deletion:", error);
      return NextResponse.json(
        {
          error: "confirmation_failed",
          message: "Failed to process deletion confirmation",
        },
        { status: 500 }
      );
    }

    if (!data.success) {
      // Handle specific error cases
      if (data.error === "token_expired") {
        return NextResponse.json(
          {
            error: "token_expired",
            message:
              "Confirmation token has expired. Please submit a new deletion request.",
          },
          { status: 410 } // 410 Gone - resource no longer available
        );
      } else if (data.error === "invalid_token") {
        return NextResponse.json(
          {
            error: "invalid_token",
            message: "Invalid or already used confirmation token",
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          {
            error: data.error || "confirmation_failed",
            message: data.message || "Failed to process deletion confirmation",
          },
          { status: 400 }
        );
      }
    }

    // Log successful deletion
    const email = tokenPayload.email;
    console.log(`Deletion confirmed for ${email}: ${data.message}`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: data.message,
      userExisted: data.user_existed,
      deletedCount: data.deleted_count || 0,
    });
  } catch (error) {
    console.error("Error in deletion confirmation endpoint:", error);
    return NextResponse.json(
      {
        error: "server_error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * Handle deletion confirmation via POST request (alternative method)
 * This allows for additional security measures if needed
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        {
          error: "missing_token",
          message: "No confirmation token provided",
        },
        { status: 400 }
      );
    }

    // Rate limiting for POST requests
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Simple rate limiting (in production, use Redis)
    const rateLimitKey = `deletion_confirm_${ip}`;

    // Verify the JWT token
    const tokenPayload = await verifyDeletionToken(token);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          error: "invalid_token",
          message: "Invalid or expired confirmation token",
        },
        { status: 400 }
      );
    }

    // Process the deletion confirmation
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("confirm_deletion", {
      p_token: token,
    });

    if (error) {
      console.error("Error confirming deletion:", error);
      return NextResponse.json(
        {
          error: "confirmation_failed",
          message: "Failed to process deletion confirmation",
        },
        { status: 500 }
      );
    }

    if (!data.success) {
      // Handle specific error cases (same as GET)
      if (data.error === "token_expired") {
        return NextResponse.json(
          {
            error: "token_expired",
            message:
              "Confirmation token has expired. Please submit a new deletion request.",
          },
          { status: 410 }
        );
      } else if (data.error === "invalid_token") {
        return NextResponse.json(
          {
            error: "invalid_token",
            message: "Invalid or already used confirmation token",
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          {
            error: data.error || "confirmation_failed",
            message: data.message || "Failed to process deletion confirmation",
          },
          { status: 400 }
        );
      }
    }

    // Log successful deletion
    const email = tokenPayload.email;
    console.log(`Deletion confirmed for ${email}: ${data.message}`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: data.message,
      userExisted: data.user_existed,
      deletedCount: data.deleted_count || 0,
    });
  } catch (error) {
    console.error("Error in deletion confirmation endpoint:", error);
    return NextResponse.json(
      {
        error: "server_error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
