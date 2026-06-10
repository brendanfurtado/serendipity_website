import Link from "next/link";
import config from "@/config";

// Static notice shown after Serendipity wound down operations.
// Kept intentionally simple and self-contained so the domain stays reachable
// for any late data/privacy questions even after the rest of the app is removed.
const ClosedNotice = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100 px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {config.appName}
        </p>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-base-content">
          We&apos;ve closed our doors
        </h1>

        <p className="mt-6 text-base-content/80 leading-relaxed">
          Serendipity is no longer operating, and the waitlist is now closed.
          Thank you to everyone who signed up early and believed in a more
          balanced, authentic way to date — it meant a great deal.
        </p>

        <p className="mt-4 text-base-content/80 leading-relaxed">
          All personal data collected during the waitlist has been deleted. If
          you have any questions about your data, you can reach us at{" "}
          <a
            href="mailto:dev@serendipitydating.io"
            className="link link-primary font-medium"
          >
            dev@serendipitydating.io
          </a>
          .
        </p>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm">
          <Link href="/privacy-policy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link href="/tos" className="link link-hover">
            Terms
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ClosedNotice;
