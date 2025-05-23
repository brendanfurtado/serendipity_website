"use client";

import React from "react";
import {
  Heart,
  Shield,
  Users,
  Zap,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 bg-rose-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Designed for Authentic Connections
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            We&apos;ve built features that encourage genuine interactions and
            eliminate the problems that cause dating app fatigue.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <Heart className="h-10 w-10 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Meaningful Matches</h3>
            <p className="text-gray-600 flex-grow">
              Our matching process focuses on compatibility and shared interests
              rather than superficial swiping.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <Shield className="h-10 w-10 text-violet-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Transparent Experience</h3>
            <p className="text-gray-600 flex-grow">
              See exactly how our platform works with no hidden algorithms or
              manipulative features.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <Users className="h-10 w-10 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
            <p className="text-gray-600 flex-grow">
              A welcoming environment where everyone can be their authentic
              selves and find meaningful connections within diverse communities.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <Zap className="h-10 w-10 text-violet-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Anti-Ghosting Measures</h3>
            <p className="text-gray-600 flex-grow">
              Features designed to encourage respectful communication and reduce
              ghosting behavior.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <Sparkles className="h-10 w-10 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Quality Over Quantity</h3>
            <p className="text-gray-600 flex-grow">
              We focus on meaningful connections rather than endless swiping
              through profiles.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <MessageSquare className="h-10 w-10 text-violet-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Conversation Starters</h3>
            <p className="text-gray-600 flex-grow">
              Thoughtful prompts and icebreakers to help you start meaningful
              conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
