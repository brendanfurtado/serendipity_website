// components/landing/Hero.tsx - Updated version with centered content

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import { LiveCounter } from "./LiveCounter";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-rose-50">
      {/* Changed from 'container px-4 md:px-6' to add mx-auto and max-w settings */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Modified this div to center the content */}
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700">
              Bringing back the Spontaneity and Serendipity in Our Lives
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Dating with <span className="text-rose-500">Balance</span> and{" "}
              <span className="text-violet-600">Authenticity</span>
            </h1>
            <p className="max-w-[600px] text-gray-600 md:text-xl">
              The first dating app designed for true balance across communities,
              creating an equitable platform for authentic connections without
              algorithmic manipulation.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#join-waitlist"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Join the Waitlist
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-violet-200"></div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-violet-200"></div>
              </div>
              <LiveCounter />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-violet-200 rounded-full blur-3xl opacity-20"></div>
              <Image
                src="/herocouple.jpg"
                alt="Couple enjoying a date"
                className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
