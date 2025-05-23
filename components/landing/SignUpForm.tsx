"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import config from "@/config";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to your backend
      // Example:
      // const response = await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, gender }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set submitted to true to show success message
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show message, etc)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="join-waitlist"
      className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-rose-50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700">
            Join the Movement
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Be Part of the Change
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            {config.serendipity?.leadMagnets?.primary ||
              "Join our waitlist to be among the first to experience the new era of balance and authentic dating."}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-md">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="space-y-4">
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
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender Identity
                  </label>
                  <select
                    id="gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="" disabled>
                      How would you like to be represented?
                    </option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="queer">Queer</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="pt-2">
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
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center pt-2">
                  By joining, you agree to our Terms of Service and Privacy
                  Policy. We`&apos;`ll notify you when we`&apos;`re ready to
                  welcome you to our balanced community.
                </p>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
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
              <h3 className="text-lg font-medium text-gray-900">
                Thank you for joining!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                We`&apos;`ve added you to our waitlist. We`&apos;`ll notify you
                when we`&apos;`re ready to welcome you to our community!
              </p>
            </div>
          )}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="flex -space-x-2">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-violet-200"></div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
            </div>
            <div className="text-sm text-gray-500">
              {config.serendipity?.leadMagnets?.urgency ||
                "+500 people already on the waitlist"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
