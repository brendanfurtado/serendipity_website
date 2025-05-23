"use client";

import { Footer as CustomFooter } from "@/components/landing/Footer";

// We're wrapping the imported Footer component in a new Footer component
// to maintain compatibility with the existing codebase
export default function Footer() {
  return <CustomFooter />;
}
