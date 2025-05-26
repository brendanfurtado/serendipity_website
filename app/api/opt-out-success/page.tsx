// app/opt-out-success/page.tsx
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

export const metadata = getSEOTags({
  title: `Opt-Out Successful | ${config.appName}`,
  description:
    "Your opt-out preferences have been updated. You'll remain on our waitlist with your specified data processing preferences.",
  canonicalUrlRelative: "/opt-out-success",
});

export default function OptOutSuccess() {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>

      <main className="min-h-screen py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-rose-50 to-violet-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-rose-300 to-violet-300 flex items-center justify-center mb-6">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Preferences Updated Successfully
            </h1>

            <p className="text-gray-600 md:text-lg mb-6">
              Your opt-out preferences have been updated. You'll remain on our
              waitlist but we'll respect your choices regarding how your data is
              used.
            </p>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold mb-4">What this means:</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-gray-600">
                    You're still on our waitlist and will be notified when
                    Serendipity Dating launches.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                  </div>
                  <span className="text-gray-600">
                    You won't receive promotional or marketing emails from us.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-gray-600">
                    You can request complete data deletion at any time.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Privacy Center
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Return to Home
              </Link>
            </div>
          </div>

          {/* What if you change your mind section */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bold text-xl mb-2">Changed Your Mind?</h3>
              <p className="text-gray-600 mb-4">
                If you'd like to update your preferences again or completely
                delete your data, you can do so at any time through our Privacy
                Center.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Manage Preferences
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
