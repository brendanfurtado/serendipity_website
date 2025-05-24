"use client";

import React from "react";
import { Users, Shield, BarChart } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 bg-white">
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
            Our Approach
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-rose-50 via-violet-50 to-rose-50 rounded-2xl p-6 max-w-[800px] mx-auto">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Tired of...
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-rose-400"></div>
                  <span>Endless swiping?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                  <span>Dating app fatigue?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-rose-400"></div>
                  <span>Superficial matches?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                  <span>App manipulation?</span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Discover the Magic of{" "}
              <span className="text-rose-500">Serendipity</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl">
              We are reimagining dating with a focus on authentic connections
              and meaningful encounters, both online and in real life.
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <Users className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold">Balanced Communities</h3>
            <p className="text-gray-600">
              Experience a dating platform where everyone has an equal chance to
              find meaningful connections through our balanced community
              approach.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Shield className="h-8 w-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold">Natural Connections</h3>
            <p className="text-gray-600">
              Let serendipity guide you to authentic matches through our
              transparent, manipulation-free approach to dating. No hidden
              algorithms.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <BarChart className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold">Real-Life Magic</h3>
            <p className="text-gray-600">
              Discover the joy of unexpected connections through our curated
              events and community-driven experiences.
            </p>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="rounded-xl bg-gradient-to-r from-rose-50 to-violet-50 p-8 max-w-3xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  How Serendipity Works
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs">
                      1
                    </div>
                    <span>Curated community of genuine people</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs">
                      2
                    </div>
                    <span>Balanced gender representation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs">
                      3
                    </div>
                    <span>In-person events for natural connections</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs">
                      4
                    </div>
                    <span>Community-driven experience</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative h-48 w-48">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-violet-300 rounded-full opacity-50 blur-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-violet-600 text-transparent bg-clip-text">
                      Serendipity
                    </div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-3 w-16 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;