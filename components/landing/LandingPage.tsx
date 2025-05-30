"use client";

import React from "react";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./Features";
import { EventsSection } from "./EventsSection";
import { Community } from "./Community";
import { TransparencySection } from "./TransparencySection";
import { SignUpForm } from "./SignUpForm";
import BlogPreview from "./BlogPreview";

export function LandingPage() {
  return (
    <div className="pt-4">
      <Hero />
      <HowItWorks />
      <Features />
      <EventsSection />
      <Community />
      <TransparencySection />
      <SignUpForm />
      <BlogPreview />
    </div>
  );
}
