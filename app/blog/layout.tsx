import { ReactNode } from "react";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default async function LayoutBlog({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense>
        <Navbar />
      </Suspense>

      {/* Updated max-width and added mx-auto for consistent container sizing */}
      <main className="min-h-screen max-w-screen-xl mx-auto p-8">{children}</main>

      <div className="h-24" />

      <Footer />
    </div>
  );
}