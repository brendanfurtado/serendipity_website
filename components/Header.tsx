"use client";

import { Navbar } from "@/components/landing/Navbar";

// We're wrapping the imported Navbar component in a new Header component
// to maintain compatibility with the existing codebase
export default function Header() {
  return <Navbar />;
}
