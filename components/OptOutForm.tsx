// components/OptOutForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type OptOutType = "marketing" | "all";

interface OptOutFormProps {
  initialEmail?: string;
  compact?: boolean;
}

export default function OptOutForm({
  initialEmail = "",
  compact = false,
}: OptOutFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [optOutType, setOptOutType] = useState<OptOutType>("marketing");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/privacy/opt-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          optOutType,
          additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process opt-out request");
      }

      setSubmitted(true);

      // On successful submission, redirect after a brief delay
      setTimeout(() => {
        router.push("/opt-out-success");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      console.error("Error submitting opt-out request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`bg-white ${
        compact ? "p-4" : "p-6"
      } rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto`}
    >
      {!submitted ? (
        <>
          {!compact && (
            <>
              <h2 className="text-xl font-bold mb-4">Opt-Out Preferences</h2>
              <p className="text-gray-600 mb-6">
                Use this form to opt out of specific data processing activities
                while remaining on the waitlist.
              </p>
            </>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="optOutType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What would you like to opt out of?
              </label>
              <select
                id="optOutType"
                required
                value={optOutType}
                onChange={(e) => setOptOutType(e.target.value as OptOutType)}
                className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="marketing">Marketing Communications</option>
                <option value="all">All Non-Essential Communications</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Information {compact ? "(Optional)" : ""}
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                rows={compact ? 2 : 3}
                placeholder="Please provide any additional details about your opt-out preferences..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  Processing...
                </span>
              ) : (
                "Submit Opt-Out Request"
              )}
            </button>

            {!compact && (
              <p className="text-xs text-gray-500 text-center pt-2">
                By opting out, you'll remain on our waitlist but we'll limit how
                we use your data according to your preferences.
              </p>
            )}
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg
              className="h-6 w-6 text-green-600"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Opt-Out Request Submitted
          </h3>
          <p className="text-gray-600">
            Your preferences have been updated. You'll remain on our waitlist
            but we'll respect your opt-out choices.
          </p>
        </div>
      )}
    </div>
  );
}
