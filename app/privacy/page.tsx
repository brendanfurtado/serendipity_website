// app/privacy/page.tsx
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import PrivacyRequestForm from "@/components/PrivacyRequestForm";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

export const metadata = getSEOTags({
  title: `Privacy Rights | ${config.appName}`,
  description:
    "Exercise your privacy rights under GDPR and CCPA. Request access to, deletion of, or changes to your personal data.",
  canonicalUrlRelative: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Your Privacy Rights
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl">
              At {config.appName}, we respect your privacy rights. Use this page
              to submit privacy-related requests.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Privacy Request Options
              </h2>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xl font-semibold mb-4">Submit a Request</h3>
                <p className="text-gray-600 mb-4">
                  Choose the type of privacy request you'd like to submit:
                </p>

                <div className="space-y-2">
                  <Link
                    href="/privacy"
                    className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                  >
                    <div className="font-medium">Access My Data</div>
                    <div className="text-sm text-gray-600">
                      Request a copy of all data we have about you
                    </div>
                  </Link>

                  <Link
                    href="/privacy"
                    className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                  >
                    <div className="font-medium">Delete My Data</div>
                    <div className="text-sm text-gray-600">
                      Request complete removal from our systems
                    </div>
                  </Link>

                  <Link
                    href="/privacy"
                    className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                  >
                    <div className="font-medium">Opt Out of Marketing</div>
                    <div className="text-sm text-gray-600">
                      Stay on waitlist but stop receiving promotional emails
                    </div>
                  </Link>
                </div>
              </div>

              <PrivacyRequestForm />
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Right to Access</h3>
                  <p className="text-gray-600">
                    Request a copy of your personal data, including your
                    waitlist information.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Right to Delete</h3>
                  <p className="text-gray-600">
                    Request deletion of your personal data from our waitlist and
                    systems.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Opt Out of Marketing
                  </h3>
                  <p className="text-gray-600">
                    Remain on the waitlist but opt out of promotional and
                    marketing communications.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/privacy-policy"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  View our full Privacy Policy →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 mb-4">
                  <span className="text-rose-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Request Received</h3>
                <p className="text-gray-600 text-sm">
                  We'll acknowledge your request within 1 business day.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 mb-4">
                  <span className="text-violet-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Verification</h3>
                <p className="text-gray-600 text-sm">
                  We may contact you to verify your identity if needed.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 mb-4">
                  <span className="text-rose-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Request Fulfilled</h3>
                <p className="text-gray-600 text-sm">
                  We'll fulfill your request within the required timeframe
                  (30-45 days).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
