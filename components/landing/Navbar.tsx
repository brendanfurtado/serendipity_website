"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import config from "@/config";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection, scrollToHashOnLoad } from "@/utils/scrollUtils";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle hash navigation on initial load
  useEffect(() => {
    scrollToHashOnLoad();
  }, []);

  // Define navigation links
  const navigationLinks = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#features", label: "Features" },
    { href: "/#events", label: "Events" },
    { href: "/#community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ];

  // Handle scroll to section when on home page, or navigate to home page with hash
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.substring(1);

      if (pathname === "/") {
        // If we're on the home page, just scroll to the section
        scrollToSection(hash);
      } else {
        // If we're on another page, navigate to home page with the hash
        router.push(`/${hash}`);
      }
    }
  };

  // Check if a link is active based on the current pathname
  const isActiveLink = (href: string): boolean => {
    if (href === "/blog" && pathname.startsWith("/blog")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="flex items-center">
          {/* <Image
            src="/apple-icon.png"
            alt="Serendipity Logo"
            width={32}
            height={32}
          /> */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            <span className="text-rose-500">Seren</span>
            <span className="text-violet-600">dipity</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors ${
                isActiveLink(link.href)
                  ? "text-rose-500"
                  : "hover:text-rose-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={
              config.serendipity?.twitter ||
              "https://twitter.com/serendipity_dev"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-blue-400 transition-colors"
          >
            Updates
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/#join-waitlist"
            onClick={(e) => handleNavClick(e, "/#join-waitlist")}
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          >
            Join Waitlist
          </Link>
          <button
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b pb-4 px-4 mx-auto max-w-screen-xl">
          <nav className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActiveLink(link.href)
                    ? "text-rose-500"
                    : "hover:text-rose-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#join-waitlist"
              onClick={(e) => handleNavClick(e, "/#join-waitlist")}
              className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
