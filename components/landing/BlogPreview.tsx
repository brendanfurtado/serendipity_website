"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

// Define blog post type
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export function BlogPreview() {
  // Sample blog posts - In a real implementation, these would come from your CMS or API
  const blogPosts: BlogPost[] = [
    {
      slug: "building-better-connections",
      title: "Building Better Connections in the Digital Age",
      description:
        "How we're reimagining online dating to create more meaningful relationships.",
      date: "March 15, 2024",
      image: "/images/blog/connections.jpg",
    },
    {
      slug: "power-of-community-dating",
      title: "The Power of Community-First Dating",
      description:
        "Why building strong communities leads to better matches and lasting connections.",
      date: "March 10, 2024",
      image: "/images/blog/community.jpg",
    },
    {
      slug: "online-to-in-person",
      title: "From Online to In-Person",
      description:
        "Tips for transitioning your online connections to meaningful real-life relationships.",
      date: "March 5, 2024",
      image: "/images/blog/meetings.jpg",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
            Our Blog
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Stories & Insights
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            Exploring authentic connections, dating insights, and community
            stories.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  width={400}
                  height={240}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-violet-600" />
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-violet-600 font-medium hover:text-violet-700"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;
