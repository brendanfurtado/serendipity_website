// app/confirm-deletion/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import config from "@/config";

interface DeletionResult {
  success: boolean;
  message: string;
  userExisted?: boolean;
  deletedCount?: number;
  error?: string;
}

function DeletionConfirmationContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<DeletionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = searchParams?.get("token");

    if (!token) {
      setResult({
        success: false,
        error: "missing_token",
        message:
          "No confirmation token provided. Please check your email for the correct link.",
      });
      setIsLoading(false);
      return;
    }

    // Process the deletion confirmation
    confirmDeletion(token);
  }, [searchParams]);

  useEffect(() => {
    if (result?.success) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const confirmDeletion = async (token: string) => {
    try {
      const response = await fetch(
        `/api/confirm-deletion?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: data.message,
          userExisted: data.userExisted,
          deletedCount: data.deletedCount,
        });
      } else {
        setResult({
          success: false,
          error: data.error,
          message: data.message,
        });
      }
    } catch (error) {
      console.error("Error confirming deletion:", error);
      setResult({
        success: false,
        error: "network_error",
        message: "Network error occurred. Please try again or contact support.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
              Processing Deletion...
            </h1>
            <p className="text-gray-600 md:text-lg mb-4">
              Please wait while we process your account deletion request.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 md:py-24 bg-white">
      {/* Success Toast */}
      {showToast && result?.success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-opacity">
          <svg
            className="h-5 w-5"
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
          <span>Account successfully deleted</span>
        </div>
      )}

      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        {result?.success ? (
          // Success State
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg
                className="h-10 w-10 text-green-600"
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

            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-green-800">
              Account Deleted Successfully
            </h1>

            <p className="text-green-700 md:text-lg mb-6">
              {result.userExisted
                ? "Your account and all associated data have been permanently removed from our waitlist."
                : "Your deletion request has been processed. No account data was found to delete."}
            </p>

            {result.userExisted && result.deletedCount && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  What was deleted:
                </h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Your email address from our waitlist</li>
                  <li>• All profile information and preferences</li>
                  <li>• Marketing and communication preferences</li>
                  <li>• All associated account data</li>
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-green-600 text-sm">
                This action cannot be undone. If you wish to rejoin our waitlist
                in the future, you'll need to sign up again.
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          // Error State
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg
                className="h-10 w-10 text-red-600"
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

            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-red-800">
              {result?.error === "token_expired"
                ? "Confirmation Link Expired"
                : result?.error === "invalid_token"
                ? "Invalid Confirmation Link"
                : "Deletion Failed"}
            </h1>

            <p className="text-red-700 md:text-lg mb-6">
              {result?.message ||
                "An unexpected error occurred while processing your deletion request."}
            </p>

            {result?.error === "token_expired" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200 mb-6">
                <h3 className="font-semibold text-red-800 mb-2">
                  What to do next:
                </h3>
                <ul className="text-red-700 text-sm space-y-2 text-left">
                  <li>
                    • Submit a new deletion request through our privacy portal
                  </li>
                  <li>• Check your email for a new confirmation link</li>
                  <li>
                    • Complete the deletion within 2 hours of receiving the new
                    email
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(result?.error === "token_expired" ||
                result?.error === "invalid_token") && (
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                >
                  Submit New Request
                </Link>
              )}

              <a
                href={`mailto:${
                  config.resend.supportEmail || "dev@serendipitydating.io"
                }`}
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Contact Support
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Loading component for Suspense fallback
function DeletionConfirmationLoading() {
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
export default function DeletionConfirmationPage() {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>

      <Suspense fallback={<DeletionConfirmationLoading />}>
        <DeletionConfirmationContent />
      </Suspense>

      <Footer />
    </>
  );
}
