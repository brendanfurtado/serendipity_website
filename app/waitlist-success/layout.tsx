"use client";

import { ReactNode } from "react";
import { Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/Footer";

export default function WaitlistSuccessLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>

      {children}

      <Footer />
    </>
  );
}
