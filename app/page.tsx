import { Suspense } from "react";
import { LandingPage } from "@/components/landing/LandingPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}
