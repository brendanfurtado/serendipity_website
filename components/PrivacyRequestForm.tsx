// components/PrivacyRequestForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  validatePrivacyRequestForm,
  INPUT_LIMITS,
  ValidationResult,
} from "@/utils/inputValidation";

type RequestType = "access" | "delete" | "opt-out";

interface PrivacyRequestFormProps {
  initialEmail?: string;
  compact?: boolean;
}

interface FormErrors {
  email?: string;
  requestType?: string;
  additionalInfo?: string;
  general?: string;
}

export default function PrivacyRequestForm({
  initialEmail = "",
  compact = false,
}: PrivacyRequestFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [requestType, setRequestType] = useState<RequestType>("access");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();

  // Real-time validation for email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Prevent input if exceeding length limit
    if (value.length > INPUT_LIMITS.EMAIL) {
      return;
    }

    setEmail(value);

    // Clear email error if user is typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Real-time validation for additional info
  const handleAdditionalInfoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    // Prevent input if exceeding length limit (500 chars for privacy requests)
    if (value.length > 500) {
      return;
    }

    setAdditionalInfo(value);

    // Clear error if user is typing
    if (errors.additionalInfo) {
      setErrors((prev) => ({ ...prev, additionalInfo: undefined }));
    }
  };

  const handleRequestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestType(e.target.value as RequestType);

    // Clear error if user selects something
    if (errors.requestType) {
      setErrors((prev) => ({ ...prev, requestType: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Comprehensive validation
    const validation = validatePrivacyRequestForm({
      email,
      requestType,
      additionalInfo: additionalInfo.trim() || undefined,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/privacy/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.sanitizedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmitted(true);

      // On successful submission, redirect after a brief delay
      setTimeout(() => {
        router.push("/privacy-request-success");
      }, 2000);
    } catch (err: any) {
      setErrors({
        general: err.message || "An error occurred. Please try again.",
      });
      console.error("Error submitting privacy request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterCount = (text: string, limit: number) => {
    const remaining = limit - text.length;
    const isNearLimit = remaining <= 50;
    return (
      <div
        className={`text-xs mt-1 ${
          isNearLimit ? "text-red-500" : "text-gray-500"
        }`}
      >
        {text.length}/{limit} characters
      </div>
    );
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
              <h2 className="text-xl font-bold mb-4">Privacy Request</h2>
              <p className="text-gray-600 mb-6">
                Use this form to exercise your privacy rights under GDPR and
                CCPA.
              </p>
            </>
          )}

          {errors.general && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                maxLength={INPUT_LIMITS.EMAIL}
                className={`w-full rounded-md border ${
                  errors.email
                    ? "border-red-500 ring-red-500"
                    : "border-gray-200"
                } px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {getCharacterCount(email, INPUT_LIMITS.EMAIL)}
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="requestType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Request Type *
              </label>
              <select
                id="requestType"
                required
                value={requestType}
                onChange={handleRequestTypeChange}
                className={`w-full rounded-md border ${
                  errors.requestType
                    ? "border-red-500 ring-red-500"
                    : "border-gray-200"
                } px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
              >
                <option value="access">Access My Data</option>
                <option value="delete">Delete My Data</option>
                <option value="opt-out">Opt Out of Marketing</option>
              </select>
              {errors.requestType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.requestType}
                </p>
              )}
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
                onChange={handleAdditionalInfoChange}
                maxLength={500}
                className={`w-full rounded-md border ${
                  errors.additionalInfo
                    ? "border-red-500 ring-red-500"
                    : "border-gray-200"
                } px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                rows={compact ? 2 : 3}
                placeholder="Please provide any additional details about your request..."
              />
              {getCharacterCount(additionalInfo, 500)}
              {errors.additionalInfo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.additionalInfo}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                "Submit Request"
              )}
            </button>

            {!compact && (
              <p className="text-xs text-gray-500 text-center pt-2">
                We will process your request in accordance with applicable
                privacy laws and may contact you for verification purposes.
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
            Request Submitted
          </h3>
          <p className="text-gray-600">
            Thank you for your request. We'll process it as soon as possible and
            contact you if we need additional information.
          </p>
        </div>
      )}
    </div>
  );
}
