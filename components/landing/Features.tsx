"use client";
// Modified components/landing/Features.tsx file with competitor comparison subtitle

"use client";

import React from "react";
import {
  Heart,
  Shield,
  Users,
  Zap,
  Sparkles,
  AlertOctagon,
} from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 bg-rose-50">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
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
          
          {/* New competitor comparison subtitle */}
          <div className="mt-4 bg-white rounded-xl p-4 max-w-2xl shadow-sm border border-gray-100">
            <p className="font-medium text-gray-800 mb-2">What makes us different from:</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <span className="font-medium">Bumble</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-md flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M13.5 1.5c-.4 0-.7.3-.9.7L9.7 11h3.2l-3.6 9c-.1.3.2.6.5.4l10.5-11h-4.3l4.3-7.5c.2-.3-.1-.8-.5-.6L13.5 1.5z" />
                  </svg>
                </div>
                <span className="font-medium">Tinder</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 rounded-md flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M6.2 2.44l2.95 2.95 2.95-2.95c1.3-1.3 3.4-1.3 4.7 0s1.3 3.4 0 4.7L13.85 10.2l2.95 2.95c1.3 1.3 1.3 3.4 0 4.7s-3.4 1.3-4.7 0l-2.95-2.95-2.95 2.95c-1.3 1.3-3.4 1.3-4.7 0s-1.3-3.4 0-4.7l2.95-2.95L1.5 7.15c-1.3-1.3-1.3-3.4 0-4.7s3.4-1.3 4.7-.01z" />
                  </svg>
                </div>
                <span className="font-medium">Hinge</span>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-gray-600">
              While others optimize for engagement metrics and endless swiping, we prioritize balanced communities, 
              authentic connections, and transparency in our matching process.
            </p>
          </div>
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
            <AlertOctagon className="h-10 w-10 text-violet-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Safety & Security</h3>
            <p className="text-gray-600 flex-grow">
              End-to-end encryption, identity verification, and a 24/7 monitored reporting system to create a secure environment for all users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;