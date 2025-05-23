"use client";

import React from "react";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./Features";
import { EventsSection } from "./EventsSection";
import { Community } from "./Community";
import { TransparencySection } from "./TransparencySection";
import { SignUpForm } from "./SignUpForm";

export function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <EventsSection />
      <Community />
      <TransparencySection />
      <SignUpForm />
    </>
  );
}

export default LandingPage;
