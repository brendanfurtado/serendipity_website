"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import config from "@/config";

export function EventsSection() {
  // Use the event cities from config if available, or fallback to default events
  const eventCities = config.serendipity?.eventCities || [
    {
      name: "New York City",
      date: "June (TBD)",
      title: "Rooftop Mixer in Manhattan",
      description:
        "Join our founders for an evening of meaningful conversations and unexpected connections.",
      image:
        "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?q=80&w=1000&auto=format&fit=crop",
      interested: 48,
      featured: true,
    },
    {
      name: "Chicago",
      date: "July (TBD)",
      title: "Lakefront Social",
      image:
        "https://images.unsplash.com/photo-1467226632440-65f0b4957563?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Los Angeles",
      date: "August (TBD)",
      title: "Beachside Connections",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Austin",
      date: "September (TBD)",
      title: "Margaritas and Meetups",
      image:
        "https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Seattle",
      date: "September (TBD)",
      title: "Innovation Hub Social",
      image:
        "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // Find the featured city or default to the first one
  const featuredCity =
    eventCities.find((city) => city.featured) || eventCities[0];
  // Get the remaining cities (non-featured or all except the first if none are featured)
  const otherCities = eventCities.filter((city) => city !== featuredCity);

  return (
    <section
      id="events"
      className="w-full py-12 md:py-24 bg-gradient-to-br from-violet-50 via-white to-rose-50"
    >
      {/* Added mx-auto and max-w-screen-xl for consistent container sizing */}
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-violet-600 px-4 py-1.5 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            <span>Bringing Back Spontaneity</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Meet In Real Life
          </h2>
          <p className="max-w-[800px] text-gray-600 md:text-xl">
            Rediscover the magic of serendipitous connections through our
            founder-hosted gatherings across America.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured City Event Card */}
          <div className="col-span-full lg:col-span-1 row-span-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src={featuredCity.image}
                alt={`${featuredCity.name} event`}
                className="h-full w-full object-cover"
                width={500}
                height={320}
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                <div className="bg-rose-500 rounded-full p-1.5">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-medium">
                  {featuredCity.name}
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-violet-600" />
                <span className="text-sm text-gray-500">
                  {featuredCity.date}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{featuredCity.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {featuredCity.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-violet-200"></div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-rose-200"></div>
                </div>
                <span className="text-sm text-gray-500">
                  {featuredCity.interested || "25+"} interested
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          {otherCities.slice(0, 4).map((city, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <Image
                  src={city.image}
                  alt={`${city.name} event`}
                  className="h-full w-full object-cover"
                  width={400}
                  height={240}
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                  <div
                    className={`${
                      index % 2 === 0 ? "bg-violet-600" : "bg-rose-500"
                    } rounded-full p-1.5`}
                  >
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{city.name}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-violet-600" />
                  <span className="text-xs text-gray-500">{city.date}</span>
                </div>
                <h3 className="text-lg font-bold">{city.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;