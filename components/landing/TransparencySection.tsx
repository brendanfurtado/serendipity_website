"use client";

import React from "react";
import { Twitter, Construction } from "lucide-react";
import config from "@/config";

export function TransparencySection() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700">
              <Construction className="h-4 w-4" />
              <span>In Development</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Building Something Different
            </h2>
            <p className="text-gray-600 md:text-lg max-w-[600px]">
              We believe in transparency from day one. Serendipity is currently
              in active development, and we`&apos;`re excited to share our
              journey with you.
            </p>
          </div>
          <div className="bg-gradient-to-r from-rose-50 to-violet-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Follow Our Progress</h3>
                  <p className="text-gray-600">
                    We`&apos;`re building in public and sharing regular updates
                    about our development process, community insights, and
                    upcoming features.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <a
                    href={
                      config.serendipity?.twitter ||
                      "https://twitter.com/serendipity_dev"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                    Follow for Updates
                  </a>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Current Focus</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                      </div>
                      <span className="text-gray-600">
                        Building our balanced matching algorithm
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                      </div>
                      <span className="text-gray-600">
                        Designing inclusive community features
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                      </div>
                      <span className="text-gray-600">
                        Planning our first in-person events
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransparencySection;