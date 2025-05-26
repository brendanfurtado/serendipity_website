// app/blog/page.tsx
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { articles } from "./_assets/content";

export const metadata = getSEOTags({
  title: `Blog | ${config.appName}`,
  description:
    "Dating insights, authentic connection stories, and community updates.",
  canonicalUrlRelative: "/blog",
});

export default async function Blog() {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
            Our Blog
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Stories & Insights
          </h1>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            Exploring authentic connections, dating insights, and community
            stories.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((post) => (
            <div
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-48 w-full">
                {post.image?.src && (
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    width={400}
                    height={240}
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-violet-600" />
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
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
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
