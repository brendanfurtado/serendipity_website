// libs/resend.ts - Enhanced version with better error handling and logging
import { Resend } from "resend";
import config from "@/config";

// Check for RESEND_API_KEY in environment variables
if (!process.env.RESEND_API_KEY) {
  console.warn(
    "RESEND_API_KEY is not set. Email functionality will be limited."
  );
}

// Create a Resend instance if the API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Flag to skip email sending in development (useful for testing without email)
const skipEmails = process.env.SKIP_EMAILS === "true";

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string | string[];
}): Promise<any> => {
  // Add detailed logging for debugging
  console.log(
    `[Email] Attempting to send email: "${subject}" to ${
      Array.isArray(to) ? to.join(", ") : to
    }`
  );

  // If skipEmails is true, just log the email
  if (skipEmails) {
    console.log("[Email] SKIP_EMAILS=true, email would have been sent:");
    console.log({ to, subject, from: config.resend.fromAdmin, text, replyTo });
    return { id: "dev-mode-no-email-sent" };
  }

  // If Resend is not available, throw an error
  if (!resend) {
    console.error(
      "[Email] Resend API key is not configured. Cannot send emails."
    );
    throw new Error("Resend API key is not configured. Cannot send emails.");
  }

  // Handle development environment properly - use onboarding@resend.dev as sender
  // or send only to the developer's email if in development
  const isDev = process.env.NODE_ENV === "development";

  try {
    let fromAddress = isDev
      ? "Serendipity <onboarding@resend.dev>" // Use Resend's test address in dev
      : config.resend.fromAdmin; // Use your domain in production

    console.log(`[Email] Using from address: ${fromAddress}`);

    let emailTo = to;

    // In development, if sending to external emails, redirect to your own email
    if (isDev && process.env.DEVELOPER_EMAIL) {
      // If 'to' is an array, replace it with developer email
      if (Array.isArray(to)) {
        console.log(
          `[Email] [DEV] Redirecting emails meant for ${to.join(", ")} to ${
            process.env.DEVELOPER_EMAIL
          }`
        );
        emailTo = process.env.DEVELOPER_EMAIL;
      }
      // If 'to' is not your own email, redirect to your email
      else if (to !== process.env.DEVELOPER_EMAIL) {
        console.log(
          `[Email] [DEV] Redirecting email meant for ${to} to ${process.env.DEVELOPER_EMAIL}`
        );
        emailTo = process.env.DEVELOPER_EMAIL;
      }
    }

    console.log(
      `[Email] Final recipient(s): ${
        Array.isArray(emailTo) ? emailTo.join(", ") : emailTo
      }`
    );

    // Send the email using Resend
    console.log(`[Email] Calling Resend API to send email`);
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: emailTo,
      subject: isDev ? `[TEST] ${subject}` : subject, // Prefix subject in dev mode
      text,
      html,
      ...(replyTo && { replyTo }),
    });

    if (error) {
      console.error("[Email] Error from Resend API:", error);
      throw error;
    }

    console.log(`[Email] Email sent successfully: ${data?.id}`);
    return data;
  } catch (error: any) {
    // Better error handling
    console.error(`[Email] Error details:`, {
      statusCode: error.statusCode,
      message: error.message,
      error: error,
    });

    if (
      error.statusCode === 403 &&
      error.message?.includes("domain is not verified")
    ) {
      console.error("[Email] Email domain verification error:", error.message);

      // In development, we'll try to recover by using the Resend test domain
      if (isDev) {
        console.log(
          "[Email] Attempting recovery with onboarding@resend.dev address"
        );
        // Try again with the onboarding@resend.dev address
        try {
          const { data, error: retryError } = await resend.emails.send({
            from: "Serendipity <onboarding@resend.dev>",
            to: process.env.DEVELOPER_EMAIL || to, // Send to developer in dev mode
            subject: `[TEST] ${subject}`,
            text,
            html,
            ...(replyTo && { replyTo }),
          });

          if (retryError) {
            console.error("[Email] Error on retry:", retryError);
            throw retryError;
          }

          console.log("[Email] Email sent using fallback address");
          return data;
        } catch (retryError) {
          console.error(
            "[Email] Failed to send with fallback address:",
            retryError
          );
          throw retryError;
        }
      } else {
        console.error(
          "[Email] Domain not verified and not in development mode"
        );
        throw error;
      }
    } else if (error.statusCode === 429) {
      console.error("[Email] Rate limit exceeded:", error.message);
      throw new Error("Email rate limit exceeded. Please try again later.");
    } else if (error.statusCode === 400) {
      console.error("[Email] Bad request:", error.message);
      throw new Error(`Email sending failed: ${error.message}`);
    } else {
      console.error("[Email] Unhandled error sending email:", error);
      throw error;
    }
  }
};
