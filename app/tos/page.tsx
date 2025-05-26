import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://serendipitydating.io
// - Name: Serendipity Dating
// - Contact information: dev@serendipitydating.io
// - Description: A dating app based on a balance between communities to create an equitable platform for authentic connections. The first dating app designed for true balance across communities, creating an equitable platform for authentic connections.
// - User data collected: name, email, age, gender
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://serendipitydating.io/privacy-policy
// - Governing Law: United states
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <div
          className="prose prose-slate max-w-none leading-relaxed"
          style={{ fontFamily: "sans-serif" }}
        >
          <p className="text-sm text-gray-500">Last Updated: May 26, 2025</p>

          <h2>Welcome to Serendipity Dating</h2>

          <p>
            These Terms of Service ("Terms") govern your use of the Serendipity
            Dating website at https://serendipitydating.io ("Website") and all
            related services provided by Serendipity Dating. By accessing or
            using our Website and services, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you should
            not use our services.
          </p>

          <h2>1. Description of Serendipity Dating</h2>

          <p>
            Serendipity Dating is a platform designed to create balanced
            communities and foster authentic connections between users. We aim
            to provide an equitable environment for users to meet and connect
            with others who share similar interests and values.
          </p>

          <h2>2. Eligibility</h2>

          <p>
            To use Serendipity Dating, you must be at least 18 years old. By
            creating an account or using our services, you represent and warrant
            that you are at least 18 years of age. We reserve the right to
            request proof of age at any time and to terminate or suspend
            accounts where we have reason to believe the user is under 18 years
            of age.
          </p>

          <h2>3. Account Creation and Security</h2>

          <p>
            When you create an account with Serendipity Dating, you agree to
            provide accurate, current, and complete information. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
            You agree to immediately notify us of any unauthorized use of your
            account or any other breach of security.
          </p>

          <h2>4. User Conduct</h2>

          <p>You agree not to use Serendipity Dating to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Post or share inappropriate, offensive, or explicit content</li>
            <li>Attempt to circumvent any security features of the platform</li>
            <li>Use the service for commercial purposes without our consent</li>
            <li>
              Engage in any activity that could damage, disable, or impair the
              functioning of the service
            </li>
          </ul>

          <h2>5. User Content</h2>

          <p>
            You retain ownership of any content you submit to Serendipity
            Dating. By posting content on our platform, you grant us a
            non-exclusive, worldwide, royalty-free license to use, reproduce,
            modify, and display your content for the purpose of operating and
            improving our services.
          </p>

          <h2>6. Privacy</h2>

          <p>
            Our Privacy Policy, available at{" "}
            <a
              href="https://serendipitydating.io/privacy-policy"
              className="text-rose-600 hover:text-rose-800"
            >
              https://serendipitydating.io/privacy-policy
            </a>
            , describes how we collect, use, and share your personal
            information. By using Serendipity Dating, you consent to our
            collection and use of personal data as outlined in the Privacy
            Policy.
          </p>

          <h2>7. User Data</h2>

          <p>
            We collect and store user data, including email, age, gender, and
            other information you choose to provide. This information is used to
            create and maintain your account, provide our services, and improve
            your experience. We also collect non-personal data through web
            cookies to enhance our website functionality and user experience.
          </p>

          <h2>8. Termination</h2>

          <p>
            We reserve the right to suspend or terminate your account at any
            time for any reason, including but not limited to, violation of
            these Terms. Upon termination, your right to use Serendipity Dating
            will immediately cease.
          </p>

          <h2>9. Disclaimers</h2>

          <p>
            Serendipity Dating is provided "as is" and "as available" without
            warranties of any kind, either express or implied. We do not
            guarantee that our services will be uninterrupted, secure, or
            error-free. We are not responsible for the conduct of any users on
            our platform.
          </p>

          <h2>10. Limitation of Liability</h2>

          <p>
            To the maximum extent permitted by law, Serendipity Dating shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use or inability to use our
            services.
          </p>

          <h2>11. Indemnification</h2>

          <p>
            You agree to indemnify and hold Serendipity Dating harmless from any
            claims, damages, liabilities, and expenses arising out of your use
            of our services, your violation of these Terms, or your violation of
            any rights of another.
          </p>

          <h2>12. Governing Law</h2>

          <p>
            These Terms are governed by the laws of the United States without
            regard to its conflict of law provisions.
          </p>

          <h2>13. Changes to Terms</h2>

          <p>
            We may update these Terms from time to time. We will notify you of
            any changes by posting the new Terms on this page and sending you an
            email notification. Your continued use of Serendipity Dating after
            such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>14. Contact Information</h2>

          <p>
            For questions or concerns regarding these Terms, please contact us
            at{" "}
            <a
              href="mailto:dev@serendipitydating.io"
              className="text-rose-600 hover:text-rose-800"
            >
              dev@serendipitydating.io
            </a>
            .
          </p>

          <p className="mt-8 text-center">
            Thank you for using Serendipity Dating!
          </p>
        </div>
      </div>
    </main>
  );
};

export default TOS;
