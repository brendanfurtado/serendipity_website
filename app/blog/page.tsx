import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPreview } from "@/components/landing/BlogPreview";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Blog | ${config.appName}`,
  description:
    "Dating insights, authentic connection stories, and community updates.",
  canonicalUrlRelative: "/blog",
});

export default function Blog() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
