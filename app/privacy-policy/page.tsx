// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://serendipitydating.io
// - Name: Serendipity Dating
// - Description: A dating app based on a balance between communities to create an equitable platform for authentic connections. The first dating app designed for true balance across communities, creating an equitable platform for authentic connections.
// - User data collected: email, age, gender
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Email collection for user updates and future onboarding
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: keep the current children's privacy policy
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: dev@serendipitydating.io

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <div className="leading-relaxed prose prose-slate max-w-none">
          <p className="text-sm text-gray-500">Last Updated: May 25, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Thank you for your interest in Serendipity Dating ("we," "us," or
            "our"). This Privacy Policy outlines how we collect, use, and
            protect your personal and non-personal information when you use our
            website located at https://serendipitydating.io (the "Website") and
            our waitlist service.
          </p>
          <p>
            We are committed to protecting your personal data and complying with
            applicable data protection laws, including the General Data
            Protection Regulation (GDPR) of the European Union and the
            California Consumer Privacy Act (CCPA).
          </p>
          <p>
            By accessing or using the Website, you agree to the terms of this
            Privacy Policy. If you do not agree with the practices described in
            this policy, please do not use the Website.
          </p>

          <h2>2. Data Controller</h2>
          <p>
            For the purposes of applicable data protection laws, Serendipity
            Dating is the data controller of your personal information. This
            means we determine the purposes and means of processing your
            personal data.
          </p>

          <h2>3. Information We Collect</h2>

          <h3>3.1 Personal Data</h3>
          <p>We collect the following personal information from you:</p>
          <ul>
            <li>
              <strong>Email Address:</strong> We collect your email address to
              communicate with you about our service launch, provide updates,
              and send relevant information about Serendipity Dating.
            </li>
            <li>
              <strong>Age:</strong> We collect your age to verify that you meet
              the minimum age requirement to use our service and to better
              understand our user demographics.
            </li>
            <li>
              <strong>Gender:</strong> We collect gender information to help us
              maintain balanced communities within our platform and improve our
              service offering.
            </li>
          </ul>

          <h3>3.2 Non-Personal Data</h3>
          <p>
            We use web cookies and similar technologies to collect non-personal
            information such as your IP address, browser type, device
            information, and browsing patterns. This information helps us to
            enhance your browsing experience, analyze trends, and improve our
            services.
          </p>
          <p>
            In the future, we may use Google Analytics to help us understand how
            our website is being used. Google Analytics may collect additional
            data in accordance with their own privacy policy.
          </p>

          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>
            Under the GDPR, we process your personal data on the following legal
            bases:
          </p>
          <ul>
            <li>
              <strong>Consent:</strong> When you voluntarily join our waitlist,
              you provide consent for us to collect and process your data for
              the specified purposes.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> We may process your data
              based on our legitimate interests in providing, improving, and
              promoting our services, as long as these interests are not
              overridden by your rights.
            </li>
            <li>
              <strong>Legal Obligation:</strong> We may process your data to
              comply with legal obligations to which we are subject.
            </li>
            <li>
              <strong>Contract Performance:</strong> When you become a user of
              our service, we will process your data as necessary to perform our
              contract with you.
            </li>
          </ul>

          <h2>5. How We Use Your Information</h2>
          <p>
            We collect and use your personal data for the following purposes:
          </p>
          <ul>
            <li>To add you to our waitlist for Serendipity Dating</li>
            <li>To provide updates about our product development and launch</li>
            <li>To notify you when you can join our platform</li>
            <li>To create balanced communities within our dating platform</li>
            <li>
              To improve our services based on user demographics and preferences
            </li>
            <li>To communicate important information about our services</li>
            <li>To comply with legal obligations</li>
            <li>To respond to your inquiries and provide customer support</li>
          </ul>

          <h2>6. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, or trade your personal information to third
            parties. We may share your information in the following limited
            circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with trusted third-party service providers who help us operate our
              website and provide our services, such as email service providers
              and hosting services. These providers are contractually bound to
              use your information only for the purposes of providing services
              to us.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to valid
              requests by public authorities (e.g., a court or government
              agency).
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a
              merger, acquisition, or sale of all or a portion of our assets,
              your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information
              with third parties when we have your explicit consent to do so.
            </li>
          </ul>
          <p>
            Under the CCPA, California residents have the right to opt out of
            the "sale" of their personal information. We do not sell personal
            information as defined by the CCPA.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. For
            waitlist data, we will retain your information until either:
          </p>
          <ul>
            <li>You request deletion of your data</li>
            <li>
              You become a registered user of our platform (at which point our
              user privacy policy will apply)
            </li>
            <li>
              We determine that the waitlist is no longer necessary for our
              business purposes
            </li>
          </ul>

          <h2>8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>9. Your Privacy Rights</h2>

          <h3>9.1 GDPR Rights (EU Residents)</h3>
          <p>
            If you are a resident of the European Economic Area (EEA), you have
            the following rights:
          </p>
          <ul>
            <li>
              <strong>Right to Access:</strong> You have the right to request a
              copy of the personal information we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to
              request that we correct any inaccurate or incomplete information
              about you.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You have the right to request
              that we delete your personal information in certain circumstances.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You have the right
              to request that we restrict the processing of your personal
              information in certain circumstances.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to
              receive a copy of your personal information in a structured,
              commonly used, and machine-readable format.
            </li>
            <li>
              <strong>Right to Object:</strong> You have the right to object to
              the processing of your personal information in certain
              circumstances.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> You have the right to
              withdraw your consent at any time where we rely on consent to
              process your personal information.
            </li>
          </ul>

          <h3>9.2 CCPA Rights (California Residents)</h3>
          <p>
            If you are a California resident, the CCPA provides you with
            specific rights regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Right to Know:</strong> You have the right to request that
              we disclose certain information to you about our collection and
              use of your personal information over the past 12 months.
            </li>
            <li>
              <strong>Right to Delete:</strong> You have the right to request
              that we delete any of your personal information that we collected
              from you and retained, subject to certain exceptions.
            </li>
            <li>
              <strong>Right to Opt-Out of Sales:</strong> You have the right to
              opt-out of the sale of your personal information. However, we do
              not sell personal information.
            </li>
            <li>
              <strong>Right to Non-Discrimination:</strong> You have the right
              not to be discriminated against for exercising any of your CCPA
              rights.
            </li>
          </ul>

          <h3>9.3 Exercising Your Rights</h3>
          <p>
            To exercise any of these rights, please contact us at
            dev@serendipitydating.io. We will respond to your request within the
            timeframe required by applicable law (30 days for GDPR requests and
            45 days for CCPA requests, with possible extensions).
          </p>
          <p>
            We may need to verify your identity before responding to your
            request. We will not discriminate against you for exercising any of
            your privacy rights.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Serendipity Dating is not intended for individuals under the age of
            18. We do not knowingly collect personal information from children
            under 18. If you are a parent or guardian and believe that your
            child has provided us with personal information, please contact us
            at the email address provided below. If we learn that we have
            collected personal information from a child under 18, we will take
            steps to delete such information promptly.
          </p>

          <h2>11. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar tracking technologies to
            collect information about your browsing activities. We use the
            following types of cookies:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function properly.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies remember your
              preferences and settings.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies help us
              understand how visitors interact with our website.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings and other
            tools. However, if you block certain cookies, you may not be able to
            use all the features of our website.
          </p>

          <h2>12. International Data Transfers</h2>
          <p>
            Your personal information may be transferred to, and processed in,
            countries other than the country in which you are resident. These
            countries may have data protection laws that are different from the
            laws of your country.
          </p>
          <p>
            When we transfer your personal information to other countries, we
            will ensure that appropriate safeguards are in place to protect your
            personal information, as required by applicable data protection
            laws.
          </p>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. Any updates will be posted on this page, and we
            will notify you via email about significant changes. The date at the
            top of this Privacy Policy indicates when it was last updated.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            If you have any questions, concerns, or requests related to this
            Privacy Policy, you can contact us at:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:dev@serendipitydating.io">
              dev@serendipitydating.io
            </a>
          </p>
          <p>
            For EU residents: If you have concerns about our privacy practices,
            you also have the right to make a complaint to your local data
            protection authority.
          </p>
          <p>
            For California residents: To exercise your rights under the CCPA,
            you can contact us using the information above.
          </p>

          <p className="mt-8">
            By using Serendipity Dating, you consent to the terms of this
            Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
