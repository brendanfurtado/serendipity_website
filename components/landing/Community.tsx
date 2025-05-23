"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Community() {
  return (
    <section id="community" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
            Our Community
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            A Dating Experience Built on Community Values
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            We believe in creating spaces where authentic connections flourish.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 order-1 md:order-2">
            <p className="text-gray-600 md:text-lg">
              We believe that the best dating experiences come from diverse,
              balanced communities with shared values. Our platform is designed
              to foster respect, authenticity, and meaningful connections for
              everyone.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-rose-500 mr-2"></div>
                <span>Regular community feedback sessions</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-violet-600 mr-2"></div>
                <span>Moderated spaces for safe interactions</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-rose-500 mr-2"></div>
                <span>Community-guided feature development</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-violet-600 mr-2"></div>
                <span>Transparency reports on platform metrics</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="#join-waitlist"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-10 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Join Our Community
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/community-1.jpg"
                  alt="Friends laughing together"
                  className="w-full h-full object-cover"
                  width={250}
                  height={250}
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/community-2.jpg"
                  alt="Group of friends talking"
                  className="w-full h-full object-cover"
                  width={250}
                  height={250}
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl col-span-2">
                <Image
                  src="/community-3.jpg"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                  width={500}
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;
