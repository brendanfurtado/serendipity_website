import Link from "next/link";
import Image from "next/image";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: "Building Better Connections in the Digital Age | Serendipity Blog",
  description:
    "How we're reimagining online dating to create more meaningful relationships in the digital age.",
  canonicalUrlRelative: "/blog/building-better-connections",
});

export default function BlogPost() {
  return (
    <article className="pt-6">
      {/* Go back link */}
      <div>
        <Link
          href="/blog"
          className="link !no-underline text-base-content/80 hover:text-base-content inline-flex items-center gap-1"
          title="Back to Blog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Header with categories, date, title */}
      <section className="my-12 md:my-20 max-w-[800px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="badge badge-lg bg-rose-100 text-rose-700 border-none">
            Dating Insights
          </div>
          <span className="text-base-content/80">March 15, 2024</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 md:mb-8">
          Building Better Connections in the Digital Age
        </h1>

        <p className="text-base-content/80 md:text-lg max-w-[700px]">
          How we&apos;re reimagining online dating to create more meaningful
          relationships in a world of endless swiping and algorithm-driven
          matches.
        </p>
      </section>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar with author and related articles */}
        <section className="max-md:pb-4 md:pl-12 max-md:border-b md:border-l md:order-last md:w-72 shrink-0 border-base-content/10">
          <p className="text-base-content/80 text-sm mb-2 md:mb-3">Posted by</p>
          <div className="inline-flex items-center gap-2 group">
            <div>
              <Image
                src="/images/authors/founder.jpg"
                alt="Founder"
                className="w-7 h-7 rounded-full object-cover object-center"
                width={28}
                height={28}
              />
            </div>
            <span className="group-hover:underline">Serendipity Team</span>
          </div>

          <div className="hidden md:block mt-12">
            <p className="text-base-content/80 text-sm mb-2 md:mb-3">
              Related reading
            </p>
            <div className="space-y-2 md:space-y-5">
              <div>
                <p className="mb-0.5">
                  <Link
                    href="/blog/power-of-community-dating"
                    className="link link-hover hover:link-primary font-medium"
                    title="The Power of Community-First Dating"
                    rel="bookmark"
                  >
                    The Power of Community-First Dating
                  </Link>
                </p>
                <p className="text-base-content/80 max-w-full text-sm">
                  Why building strong communities leads to better matches and
                  lasting connections.
                </p>
              </div>
              <div>
                <p className="mb-0.5">
                  <Link
                    href="/blog/online-to-in-person"
                    className="link link-hover hover:link-primary font-medium"
                    title="From Online to In-Person"
                    rel="bookmark"
                  >
                    From Online to In-Person
                  </Link>
                </p>
                <p className="text-base-content/80 max-w-full text-sm">
                  Tips for transitioning your online connections to meaningful
                  real-life relationships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section className="w-full max-md:pt-4 md:pr-20 space-y-12 md:space-y-20">
          <Image
            src="/images/blog/connections.jpg"
            alt="People connecting authentically"
            width={700}
            height={400}
            className="rounded-box w-full"
          />

          <div>
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
              The Problem with Modern Dating Apps
            </h2>
            <p className="text-base-content/90 leading-relaxed mb-4">
              The rise of dating apps has transformed how we meet potential
              partners, but it&apos;s also created new challenges. Endless
              swiping, superficial connections, and algorithm-driven matches
              have left many feeling disconnected and frustrated.
            </p>
            <p className="text-base-content/90 leading-relaxed">
              Dating app fatigue is real. Many users report feeling overwhelmed
              by the paradox of choice, spending hours swiping through profiles
              only to find themselves still searching for meaningful
              connections.
            </p>
          </div>

          <div>
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
              Reimagining Connection
            </h2>
            <p className="text-base-content/90 leading-relaxed mb-4">
              At Serendipity, we believe that authentic connections flourish in
              balanced, transparent environments. That&apos;s why we&apos;re
              building a platform focused on meaningful interactions rather than
              endless swiping.
            </p>
            <p className="text-base-content/90 leading-relaxed">
              Our approach prioritizes quality over quantity, with features
              designed to encourage deeper conversations and connections based
              on shared values and interests. By creating a balanced community
              with equal representation, we ensure everyone has a fair
              opportunity to find meaningful relationships.
            </p>
          </div>

          <div>
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
              The Power of In-Person Connection
            </h2>
            <p className="text-base-content/90 leading-relaxed mb-4">
              While digital platforms provide convenience, we recognize that the
              most meaningful connections often happen face-to-face. That&apos;s
              why we&apos;re integrating real-life events and meetups into our
              platform, creating opportunities for serendipitous encounters.
            </p>
            <p className="text-base-content/90 leading-relaxed">
              These curated gatherings provide a safe, welcoming environment for
              community members to connect authentically, moving beyond the
              limitations of digital interaction to forge genuine relationships.
            </p>
          </div>

          <div>
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
              Join the Movement
            </h2>
            <p className="text-base-content/90 leading-relaxed mb-4">
              We&apos;re building more than just another dating app—we&apos;re
              creating a movement for authentic connection in the digital age.
              By joining our community, you&apos;re helping shape a future where
              meaningful relationships are valued over quick matches.
            </p>
            <p className="text-base-content/90 leading-relaxed">
              As we continue to develop Serendipity, we&apos;re committed to
              transparency, community feedback, and creating a platform that
              truly serves its members. Together, we can transform the dating
              landscape and rediscover the magic of authentic connection.
            </p>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-violet-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">
              Ready to experience a different approach to dating?
            </h3>
            <p className="mb-6">
              Join our waitlist to be among the first to explore Serendipity
              when we launch.
            </p>
            <Link
              href="/#join-waitlist"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-500 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:from-rose-600 hover:to-violet-700"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
