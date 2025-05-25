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
  // If skipEmails is true, just log the email
  if (skipEmails) {
    console.log("Email would have been sent:");
    console.log({ to, subject, from: config.resend.fromAdmin, text, replyTo });
    return { id: "dev-mode-no-email-sent" };
  }

  // If Resend is not available, throw an error
  if (!resend) {
    throw new Error("Resend API key is not configured. Cannot send emails.");
  }

  // Handle development environment properly - use onboarding@resend.dev as sender
  // or send only to the developer's email if in development
  const isDev = process.env.NODE_ENV === "development";

  try {
    let fromAddress = isDev
      ? "Serendipity <onboarding@resend.dev>" // Use Resend's test address in dev
      : config.resend.fromAdmin; // Use your domain in production

    let emailTo = to;

    // In development, if sending to external emails, redirect to your own email
    if (isDev && process.env.DEVELOPER_EMAIL) {
      // If 'to' is an array, replace it with developer email
      if (Array.isArray(to)) {
        console.log(
          `[DEV] Redirecting emails meant for ${to.join(", ")} to ${
            process.env.DEVELOPER_EMAIL
          }`
        );
        emailTo = process.env.DEVELOPER_EMAIL;
      }
      // If 'to' is not your own email, redirect to your email
      else if (to !== process.env.DEVELOPER_EMAIL) {
        console.log(
          `[DEV] Redirecting email meant for ${to} to ${process.env.DEVELOPER_EMAIL}`
        );
        emailTo = process.env.DEVELOPER_EMAIL;
      }
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: emailTo,
      subject: isDev ? `[TEST] ${subject}` : subject, // Prefix subject in dev mode
      text,
      html,
      ...(replyTo && { replyTo }),
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    // Better error handling
    if (
      error.statusCode === 403 &&
      error.message?.includes("domain is not verified")
    ) {
      console.error("Email domain verification error:", error.message);

      // In development, we'll try to recover by using the Resend test domain
      if (isDev) {
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
            console.error("Error on retry:", retryError);
            throw retryError;
          }

          console.log("Email sent using fallback address");
          return data;
        } catch (retryError) {
          console.error("Failed to send with fallback address:", retryError);
          throw retryError;
        }
      } else {
        throw error;
      }
    } else {
      console.error("Error sending email:", error);
      throw error;
    }
  }
};
