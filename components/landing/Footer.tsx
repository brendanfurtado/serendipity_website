"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import config from "@/config";

export function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-900 text-white">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Serendipity</h3>
            <p className="text-gray-400 text-sm">
              Dating with balance and authenticity. Creating an equitable
              platform where meaningful connections flourish across diverse
              communities.
            </p>
            <div className="flex space-x-4">
              <a
                href={config.serendipity?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={config.serendipity?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-400 hover:text-white"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Dating Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Community Rules
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/tos" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Serendipity. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="h-8 px-3 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-violet-600 flex items-center justify-center text-xs font-medium">
              Balanced Communities
            </div>
            <Link
              href="/#join-waitlist"
              className="h-8 px-3 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;