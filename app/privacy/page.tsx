// app/privacy/page.tsx - Updated version with clickable cards
"use client";

import { useState } from "react";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import PrivacyRequestForm from "@/components/PrivacyRequestForm";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

type RequestType = "access" | "delete" | "opt-out";

export default function PrivacyPage() {
  const [selectedRequestType, setSelectedRequestType] =
    useState<RequestType>("access");
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
                  <button
                    type="button"
                    onClick={() => setSelectedRequestType("access")}
                    className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedRequestType === "access"
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:bg-rose-50 hover:border-rose-200"
                    }`}
                  >
                    <div className="font-medium">Access My Data</div>
                    <div className="text-sm text-gray-600">
                      Request a copy of all data we have about you
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRequestType("delete")}
                    className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedRequestType === "delete"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`font-medium flex items-center gap-2 ${
                        selectedRequestType === "delete"
                          ? "text-red-800"
                          : "text-gray-800"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          selectedRequestType === "delete"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      Delete My Data
                    </div>
                    <div
                      className={`text-sm ${
                        selectedRequestType === "delete"
                          ? "text-red-700"
                          : "text-gray-600"
                      }`}
                    >
                      <strong>⚠️ Warning:</strong> This will permanently remove
                      you from our waitlist and delete all your data. You'll
                      receive an email confirmation before deletion.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRequestType("opt-out")}
                    className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedRequestType === "opt-out"
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:bg-rose-50 hover:border-rose-200"
                    }`}
                  >
                    <div className="font-medium">Opt Out of Marketing</div>
                    <div className="text-sm text-gray-600">
                      Stay on waitlist but stop receiving promotional emails
                    </div>
                  </button>
                </div>
              </div>

              {/* Important Notice for Deletion */}
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Important: Data Deletion Notice
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Requesting data deletion will{" "}
                        <strong>
                          permanently remove you from our waitlist
                        </strong>
                        . This action cannot be undone. You will:
                      </p>
                      <ul className="mt-2 list-disc list-inside space-y-1">
                        <li>Lose your position on the waitlist</li>
                        <li>
                          No longer receive updates about {config.appName}
                        </li>
                        <li>Need to sign up again if you change your mind</li>
                      </ul>
                      <p className="mt-2">
                        If you only want to stop marketing emails, choose "Opt
                        Out of Marketing" instead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <PrivacyRequestForm
                selectedRequestType={selectedRequestType}
                compact={false}
              />
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Right to Access</h3>
                  <p className="text-gray-600">
                    Request a copy of your personal data, including your
                    waitlist information and any preferences we've stored.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-red-700">
                    Right to Delete
                  </h3>
                  <p className="text-gray-600">
                    Request permanent deletion of your personal data from our
                    waitlist and systems.{" "}
                    <strong className="text-red-600">
                      This will remove you from the waitlist permanently.
                    </strong>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Opt Out of Marketing
                  </h3>
                  <p className="text-gray-600">
                    Remain on the waitlist but opt out of promotional and
                    marketing communications. You'll still receive essential
                    updates.
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
                  For deletion requests, you'll receive an email to confirm your
                  decision. Other requests may require identity verification.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 mb-4">
                  <span className="text-rose-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Request Fulfilled</h3>
                <p className="text-gray-600 text-sm">
                  We'll fulfill your request within the required timeframe
                  (30-45 days for most requests, immediate for confirmed
                  deletions).
                </p>
              </div>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Need Help Deciding?</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">
                  Choose "Opt Out of Marketing" if:
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• You want to stay on the waitlist</li>
                  <li>
                    • You're interested in {config.appName} but don't want
                    promotional emails
                  </li>
                  <li>• You want to receive launch notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  Choose "Delete My Data" if:
                </h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• You're no longer interested in {config.appName}</li>
                  <li>• You want all your data permanently removed</li>
                  <li>• You don't mind losing your waitlist position</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
