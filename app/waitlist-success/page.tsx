// app/waitlist-success/page.tsx
"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import { Twitter, Instagram, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Separate component that uses useSearchParams
function WaitlistSuccessContent() {
  const searchParams = useSearchParams();
  const totalSignups = searchParams?.get("total")
    ? parseInt(searchParams.get("total")!, 10)
    : null;

  return (
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
            You&apos;re on the Waitlist!
          </h1>

          <p className="text-gray-600 md:text-lg mb-4">
            Thank you for joining the {config.appName} community. We&apos;re
            building something special, and we&apos;re excited to have you along
            for the journey.
          </p>

          {totalSignups && (
            <div className="flex items-center justify-center gap-2 mb-8 text-xl">
              <Users className="h-5 w-5 text-violet-500" />
              <span>
                <span className="font-bold text-rose-500">#{totalSignups}</span>{" "}
                on our waitlist
              </span>
            </div>
          )}

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-gray-600">
                    We&apos;ve sent a confirmation email to your inbox. If you
                    don&apos;t see it, please check your spam folder.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                  </div>
                  <span className="text-gray-600">
                    We&apos;ll keep you updated on our progress and let you know
                    when we&apos;re ready to welcome you to our community.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-gray-600">
                    Follow us on social media for real-time updates on our
                    development journey.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={
                  config.serendipity?.twitter ||
                  "https://twitter.com/serendipity_dev"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1DA1F2] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#1a91da] transition-colors"
              >
                <Twitter className="h-5 w-5" />
                Follow on Twitter
              </a>
              <a
                href={
                  config.serendipity?.instagram ||
                  "https://instagram.com/serendipity.dating"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] px-6 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                Follow on Instagram
              </a>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Testimonial/Encouragement */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <p className="italic text-gray-600 mb-4">
              &quot;We&apos;re building a community where authentic connections
              flourish, and we&apos;re thrilled to have you be a part of
              it.&quot;
            </p>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-violet-500"></div>
              <span className="font-medium">The {config.appName} Team</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Loading component for Suspense fallback
function WaitlistSuccessLoading() {
  return (
    <main className="min-h-screen py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-rose-50 to-violet-50 rounded-2xl p-8 md:p-12 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-rose-300 to-violet-300 flex items-center justify-center mb-6">
            <svg
              className="h-10 w-10 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
            Loading...
          </h1>
          <p className="text-gray-600 md:text-lg mb-4">
            Please wait while we prepare your confirmation.
          </p>
        </div>
      </div>
    </main>
  );
}

// Main component with Suspense boundary
export default function WaitlistSuccess() {
  return (
    <Suspense fallback={<WaitlistSuccessLoading />}>
      <WaitlistSuccessContent />
    </Suspense>
  );
}
