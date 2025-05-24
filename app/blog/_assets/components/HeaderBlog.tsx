"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import config from "@/config";

export default function HeaderBlog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams, pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-screen-xl">
        {/* Logo/Name */}
        <div className="flex lg:flex-1">
          <Link
            className="text-2xl font-bold tracking-tighter"
            href="/"
            title={`${config.appName} homepage`}
          >
            <span className="text-rose-500">Seren</span>
            <span className="text-violet-600">dipity</span>
          </Link>
        </div>

        {/* Burger button for mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          <Link
            href="/blog/"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
            title="All Posts"
          >
            All Posts
          </Link>

          <Link
            href="/"
            className="text-sm font-medium hover:text-rose-500 transition-colors"
            title="Home"
          >
            Home
          </Link>
        </div>

        {/* CTA on desktop */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">
          <Link
            href="/#join-waitlist"
            className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          >
            Join Waitlist
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="relative z-50">
          <div className="fixed inset-y-0 right-0 z-10 w-full px-8 py-3 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300">
            {/* Logo in mobile menu */}
            <div className="flex items-center justify-between">
              <Link
                className="text-2xl font-bold tracking-tighter"
                title={`${config.appName} homepage`}
                href="/"
              >
                <span className="text-rose-500">Seren</span>
                <span className="text-violet-600">dipity</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile links */}
            <div className="flow-root mt-6">
              <div className="py-4">
                <div className="flex flex-col gap-y-4 items-start">
                  <Link
                    href="/blog/"
                    className="text-sm font-medium hover:text-rose-500 transition-colors py-2"
                    title="All Posts"
                  >
                    All Posts
                  </Link>
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-rose-500 transition-colors py-2"
                    title="Home"
                  >
                    Home
                  </Link>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                {/* Mobile CTA */}
                <Link
                  href="/#join-waitlist"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}