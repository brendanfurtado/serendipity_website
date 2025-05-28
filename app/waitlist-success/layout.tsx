// app/waitlist-success/layout.tsx
"use client";

import { ReactNode, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

// Loading component for navbar
function NavbarLoading() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="text-2xl font-bold tracking-tighter">
          <span className="text-rose-500">Seren</span>
          <span className="text-violet-600">dipity</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:inline-flex h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="inline-flex md:hidden w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}

export default function WaitlistSuccessLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<NavbarLoading />}>
        <Navbar />
      </Suspense>

      {children}

      <Footer />
    </>
  );
}
