// scripts/send-farewell.js
/**
 * One-off farewell email to waitlist signups as part of winding down Serendipity.
 *
 * Sends individually (not BCC) so addresses are never exposed to each other,
 * and skips anyone with marketing_opt_out = true.
 *
 * Usage:
 *   node scripts/send-farewell.js --dry-run         # list recipients, send nothing
 *   node scripts/send-farewell.js --to=me@x.com     # send only to one address (preview)
 *   node scripts/send-farewell.js                   # send for real to all waitlist
 *
 * Requires in .env / .env.local:
 *   RESEND_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

// Load .env.local then .env if dotenv is available; otherwise rely on
// whatever is already exported in the shell.
try {
  require("dotenv").config({ path: ".env.local" });
  require("dotenv").config(); // fall back to .env
} catch {
  console.warn("(dotenv not installed — using already-exported env vars)");
}

const { Resend } = require("resend");
const { createClient } = require("@supabase/supabase-js");

const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith("--")) {
    const [key, value] = arg.substring(2).split("=");
    acc[key] = value === undefined ? true : value;
  }
  return acc;
}, {});

const dryRun = !!args["dry-run"];
const onlyTo = typeof args.to === "string" ? args.to : null;

const SUPPORT_EMAIL = "dev@serendipitydating.io";
const FROM = "Serendipity <noreply@serendipitydating.io>";
const SUBJECT = "Serendipity is winding down — and a thank you";

function buildEmail() {
  const text = `Hi there,

When you joined the Serendipity waitlist, you were betting on a more balanced,
authentic way to date. We're grateful you did.

We've made the difficult decision to wind Serendipity down, and the waitlist is
now closed. As part of this, we are deleting all personal data we collected
during the waitlist, including your email address. You don't need to do anything.

If you have any questions about your data, just reply to this email or reach us
at ${SUPPORT_EMAIL}.

Thank you for being one of the early believers.

— The Serendipity team`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#faf7f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:40px 32px;">
          <tr><td style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#e11d48;font-weight:700;">Serendipity Dating</td></tr>
          <tr><td style="padding-top:12px;font-size:22px;font-weight:800;">Winding down — and a thank you</td></tr>
          <tr><td style="padding-top:20px;font-size:15px;line-height:1.6;color:#374151;">
            When you joined the Serendipity waitlist, you were betting on a more balanced, authentic way to date. We're grateful you did.
          </td></tr>
          <tr><td style="padding-top:14px;font-size:15px;line-height:1.6;color:#374151;">
            We've made the difficult decision to wind Serendipity down, and the waitlist is now closed. As part of this, we're deleting all personal data we collected during the waitlist, including your email address. <strong>You don't need to do anything.</strong>
          </td></tr>
          <tr><td style="padding-top:14px;font-size:15px;line-height:1.6;color:#374151;">
            Any questions about your data? Just reply to this email or reach us at <a href="mailto:${SUPPORT_EMAIL}" style="color:#e11d48;">${SUPPORT_EMAIL}</a>.
          </td></tr>
          <tr><td style="padding-top:24px;font-size:15px;line-height:1.6;color:#374151;">
            Thank you for being one of the early believers.<br/>— The Serendipity team
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

async function getRecipients() {
  if (onlyTo) return [{ email: onlyTo }];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("waitlist")
    .select("email, marketing_opt_out");

  if (error) throw error;

  return data.filter((r) => r.email && !r.marketing_opt_out);
}

async function main() {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is not set.");
    process.exit(1);
  }
  if (!onlyTo && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
    console.error("❌ Supabase env vars missing (need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).");
    process.exit(1);
  }

  const recipients = await getRecipients();
  console.log(`Found ${recipients.length} recipient(s).`);

  if (dryRun) {
    recipients.forEach((r) => console.log(`  - ${r.email}`));
    console.log("\n--dry-run set, no emails sent.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { text, html } = buildEmail();

  let sent = 0;
  for (const r of recipients) {
    try {
      const { data, error } = await resend.emails.send({
        from: FROM,
        to: r.email,
        subject: SUBJECT,
        text,
        html,
        replyTo: SUPPORT_EMAIL,
      });
      if (error) throw error;
      sent++;
      console.log(`✅ ${r.email} (${data?.id})`);
    } catch (err) {
      console.error(`❌ ${r.email}:`, err.message || err);
    }
    // gentle pace to stay well under Resend rate limits
    await new Promise((res) => setTimeout(res, 600));
  }

  console.log(`\nDone. Sent ${sent}/${recipients.length}.`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
