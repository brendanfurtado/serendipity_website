// scripts/send-test-email.js
/**
 * Command-line utility for testing email functionality
 *
 * Usage:
 * node scripts/send-test-email.js --email=user@example.com --type=deletion
 */

// Load environment variables
require("dotenv").config();

const { Resend } = require("resend");

// Parse command-line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith("--")) {
    const [key, value] = arg.substring(2).split("=");
    acc[key] = value || true;
  }
  return acc;
}, {});

// Default values
const emailType = args.type || "standard";
const recipient = args.email || "dev@serendipitydating.io";
const appName = "Serendipity Dating";

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error("❌ RESEND_API_KEY is not set in your environment variables");
  process.exit(1);
}

const resend = new Resend(resendApiKey);

// Determine the from address
const fromAddress =
  process.env.NODE_ENV === "production"
    ? "Team Serendipity <dev@serendipitydating.io>"
    : "Serendipity <onboarding@resend.dev>";

async function sendTestEmail() {
  console.log(`🚀 Sending ${emailType} test email to ${recipient}...`);

  try {
    let emailOptions = {
      from: fromAddress,
      to: recipient,
    };

    if (emailType === "deletion") {
      // Test deletion confirmation email
      emailOptions = {
        ...emailOptions,
        subject: `Test: Confirm Account Deletion - ${appName}`,
        text: `
This is a TEST email to verify the deletion confirmation email functionality.

⚠️ IMPORTANT: This is just a test. No actual deletion will occur.

If this were a real deletion request, you would click a confirmation link here.

This email was sent from the diagnostic testing tool.
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #e11d48; margin-bottom: 20px;">TEST: Confirm Account Deletion</h1>
            
            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">⚠️ Test Email Notice</h3>
              <p style="color: #dc2626; margin-bottom: 0;">This is just a test email. No actual deletion will occur.</p>
            </div>

            <p>This email confirms that the deletion email template is working correctly.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" 
                 style="display: inline-block; background: linear-gradient(to right, #ef4444, #dc2626); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                This Would Be The Deletion Link
              </a>
            </div>
            
            <p>If this were a real email, clicking the button would confirm deletion of your account.</p>
            
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Diagnostic Information:</h4>
              <ul style="margin-bottom: 0;">
                <li>Test timestamp: ${new Date().toISOString()}</li>
                <li>Test email type: Deletion confirmation</li>
                <li>Email service: Resend</li>
                <li>Command line test</li>
              </ul>
            </div>
            
            <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: #111827; font-weight: bold;">Diagnostic Test - ${appName} Team</p>
            </div>
          </div>
        `,
      };
    } else {
      // Standard test email
      emailOptions = {
        ...emailOptions,
        subject: `Test Email - ${appName}`,
        text: `This is a test email to verify that the email sending functionality is working correctly.
        
Timestamp: ${new Date().toISOString()}
        
If you're receiving this, it means the email service is configured properly.

This email was sent from the command line testing tool.`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #e11d48; margin-bottom: 20px;">Email Service Test</h1>
            <p>This is a test email to verify that the email sending functionality is working correctly.</p>
            <p>If you're receiving this, it means the email service is configured properly.</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Diagnostic Information:</h4>
              <ul style="margin-bottom: 0;">
                <li>Test timestamp: ${new Date().toISOString()}</li>
                <li>Test email type: Standard</li>
                <li>Email service: Resend</li>
                <li>Command line test</li>
              </ul>
            </div>
            <div style="margin: 30px 0; padding: 20px; background: linear-gradient(to right, #f9a8d4, #c4b5fd); border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: #111827; font-weight: bold;">Diagnostic Test - ${appName} Team</p>
            </div>
          </div>
        `,
      };
    }

    // Send the email
    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error("❌ Error sending email:", error);
      process.exit(1);
    }

    console.log("✅ Email sent successfully!");
    console.log("📧 Email ID:", data.id);
  } catch (error) {
    console.error("❌ Exception sending email:", error);
    process.exit(1);
  }
}

// Execute the email sending function
sendTestEmail();
