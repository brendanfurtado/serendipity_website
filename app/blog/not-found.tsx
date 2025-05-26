// app/blog/not-found.tsx
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { articles } from "./_assets/content";

export const metadata = getSEOTags({
  title: `Article Not Found | ${config.appName} Blog`,
  description: "Sorry, we couldn't find the article you're looking for.",
  canonicalUrlRelative: "/blog",
});

export default function BlogNotFound() {
  // Get the most recent articles to suggest as alternatives
  const recentArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    )
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the article you're looking for.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-rose-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          Browse All Articles
        </Link>
      </div>

      {recentArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            You might be interested in these articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <Link href={`/blog/${article.slug}`}>
                  {article.image?.src && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={article.image.urlRelative}
                        alt={article.image.alt}
                        className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 hover:text-rose-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
