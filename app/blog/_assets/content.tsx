import type { JSX } from "react";
import Image, { StaticImageData } from "next/image";
import serendipityImg from "@/app/blog/_assets/images/authors/serendipity.png";
import introducingSupabaseImg from "@/public/blog/introducing-supabase/header.png";

// Import new blog post images
import connectionsImg from "@/public/blog/connections.jpg";
import communityImg from "@/public/blog/community.jpg";
import meetingsImg from "@/public/blog/meetings.jpg";
// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

export type categoryType = {
  slug: string;
  title: string;
  titleShort?: string;
  description: string;
  descriptionShort?: string;
};

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs: { [key: string]: string } = {
  feature: "feature",
  tutorial: "tutorial",
  dating: "dating-insights",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories: categoryType[] = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.feature,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "New Features",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Features",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Here are the latest features we've added to ShipFast. I'm constantly improving our product to help you ship faster.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Latest features added to Serendity Dating.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use ShipFast with these step-by-step tutorials. I'll show you how to ship faster and save time.",
    descriptionShort:
      "Learn how to use ShipFast with these step-by-step tutorials.",
  },
  {
    slug: categorySlugs.dating,
    title: "Dating Insights",
    titleShort: "Dating",
    description:
      "Exploring authentic connections, dating insights, and community stories for better relationships.",
    descriptionShort: "Authentic dating insights and community stories.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

export type authorType = {
  slug: string;
  name: string;
  job: string;
  description: string;
  avatar: StaticImageData | string;
  socials?: {
    name: string;
    icon: JSX.Element;
    url: string;
  }[];
};

// Social icons used in the author's bio.
const socialIcons: {
  [key: string]: {
    name: string;
    svg: JSX.Element;
  };
} = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs: {
  [key: string]: string;
} = {
  marc: "Serendipity",
  team: "serendipity-team", // Added new author for the team
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors: authorType[] = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.marc,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Serendipity",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Maker of ByeDispute",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Marc is a developer and an entrepreneur. He's built 20 startups in the last 3 years. 6 were profitable and 3 were acquired. He's currently building ByeDispute, the #1 Stripe Chargebacks Protection tool.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: serendipityImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/marc_louvion",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/marclouvion/",
      },
      {
        name: socialIcons.github.name,
        icon: socialIcons.github.svg,
        url: "https://github.com/Marc-Lou-Org/ship-fast",
      },
    ],
  },
  {
    slug: authorSlugs.team,
    name: "Serendipity Team",
    job: "Dating Experts",
    description:
      "The Serendipity team is dedicated to creating authentic connections and reimagining online dating with a focus on balanced communities and meaningful relationships.",
    avatar: "/images/authors/founder.jpg", // Make sure this path exists
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/serendipity_dev",
      },
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

export type articleType = {
  slug: string;
  title: string;
  description: string;
  categories: categoryType[];
  author: authorType;
  publishedAt: string;
  image: {
    src?: StaticImageData;
    urlRelative: string;
    alt: string;
  };
  content: JSX.Element;
};

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles: {
  [key: string]: string;
} = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed",
  li: "list-item",
  // Altnernatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles: articleType[] = [
  // New blog post shown in the UI
  {
    slug: "building-better-connections",
    title: "Building Better Connections in the Digital Age",
    description:
      "How we're reimagining online dating to create more meaningful relationships in the digital age.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.dating),
    ],
    author: authors.find((author) => author.slug === authorSlugs.team),
    publishedAt: "2024-03-15",
    image: {
      src: connectionsImg,
      urlRelative: "/images/blog/connections.jpg",
      alt: "People connecting authentically",
    },
    content: (
      <>
        <Image
          src={connectionsImg}
          alt="People connecting authentically"
          width={700}
          height={400}
          priority={true}
          className="rounded-box"
        />
        <section>
          <h2 className={styles.h2}>The Problem with Modern Dating Apps</h2>
          <p className={styles.p}>
            The rise of dating apps has transformed how we meet potential
            partners, but it&apos;s also created new challenges. Endless
            swiping, superficial connections, and algorithm-driven matches have
            left many feeling disconnected and frustrated.
          </p>
          <p className={styles.p}>
            Dating app fatigue is real. Many users report feeling overwhelmed by
            the paradox of choice, spending hours swiping through profiles only
            to find themselves still searching for meaningful connections.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>Reimagining Connection</h2>
          <p className={styles.p}>
            At Serendipity, we believe that authentic connections flourish in
            balanced, transparent environments. That&apos;s why we&apos;re
            building a platform focused on meaningful interactions rather than
            endless swiping.
          </p>
          <p className={styles.p}>
            Our approach prioritizes quality over quantity, with features
            designed to encourage deeper conversations and connections based on
            shared values and interests. By creating a balanced community with
            equal representation, we ensure everyone has a fair opportunity to
            find meaningful relationships.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>The Power of In-Person Connection</h2>
          <p className={styles.p}>
            While digital platforms provide convenience, we recognize that the
            most meaningful connections often happen face-to-face. That&apos;s
            why we&apos;re integrating real-life events and meetups into our
            platform, creating opportunities for serendipitous encounters.
          </p>
          <p className={styles.p}>
            These curated gatherings provide a safe, welcoming environment for
            community members to connect authentically, moving beyond the
            limitations of digital interaction to forge genuine relationships.
          </p>
        </section>
      </>
    ),
  },
  // Second blog post shown in the UI
  {
    slug: "power-of-community-dating",
    title: "The Power of Community-First Dating",
    description:
      "Why building strong communities leads to better matches and lasting connections.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.dating),
    ],
    author: authors.find((author) => author.slug === authorSlugs.team),
    publishedAt: "2024-03-10",
    image: {
      src: communityImg,
      urlRelative: "/images/blog/community.jpg",
      alt: "Community gathering",
    },
    content: (
      <>
        <Image
          src={communityImg}
          alt="Community gathering"
          width={700}
          height={400}
          priority={true}
          className="rounded-box"
        />
        <section>
          <h2 className={styles.h2}>Community as the Foundation</h2>
          <p className={styles.p}>
            Traditional dating apps focus primarily on individual matching,
            often ignoring the powerful role that communities play in fostering
            meaningful relationships. At Serendipity, we're taking a different
            approach.
          </p>
          <p className={styles.p}>
            By building communities of like-minded individuals first, we create
            an environment where authentic connections can naturally emerge.
            When people share common values, interests, and goals, relationships
            develop more organically and tend to be more fulfilling and lasting.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>The Benefits of Community-First Dating</h2>
          <p className={styles.p}>
            Community-first dating offers numerous advantages over traditional
            swiping-based apps:
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>More contextual interactions</li>
            <li className={styles.li}>
              Natural ice-breakers through shared interests
            </li>
            <li className={styles.li}>
              Reduced pressure on individual connections
            </li>
            <li className={styles.li}>Built-in social support network</li>
            <li className={styles.li}>
              Better compatibility through shared values
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>Creating Balanced Communities</h2>
          <p className={styles.p}>
            One of the biggest challenges in dating apps is gender imbalance.
            Many platforms suffer from highly skewed ratios, creating
            frustrating experiences for everyone involved. Serendipity addresses
            this by carefully curating communities with balanced representation.
          </p>
          <p className={styles.p}>
            This approach ensures that everyone has equal opportunities to
            connect, resulting in a more positive and equitable dating
            experience. By prioritizing community health over growth at all
            costs, we're building something fundamentally different from
            existing dating platforms.
          </p>
        </section>
      </>
    ),
  },
  // Third blog post shown in the UI
  {
    slug: "online-to-in-person",
    title: "From Online to In-Person",
    description:
      "Tips for transitioning your online connections to meaningful real-life relationships.",
    categories: [
      categories.find((category) => category.slug === categorySlugs.dating),
    ],
    author: authors.find((author) => author.slug === authorSlugs.team),
    publishedAt: "2024-03-05",
    image: {
      src: meetingsImg,
      urlRelative: "/images/blog/meetings.jpg",
      alt: "People meeting in person",
    },
    content: (
      <>
        <Image
          src={meetingsImg}
          alt="People meeting in person"
          width={700}
          height={400}
          priority={true}
          className="rounded-box"
        />
        <section>
          <h2 className={styles.h2}>The Digital-to-Physical Gap</h2>
          <p className={styles.p}>
            Online connections can be meaningful, but there's often a
            significant gap between digital interaction and in-person chemistry.
            Many people struggle with this transition, unsure of how to move
            from messaging to meeting.
          </p>
          <p className={styles.p}>
            This gap is one of the main reasons why promising online connections
            sometimes fail to develop into meaningful relationships. At
            Serendipity, we believe bridging this gap is essential for authentic
            connection.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>Practical Tips for Meeting in Person</h2>
          <p className={styles.p}>
            Moving from online conversation to in-person meetings can be
            nerve-wracking, but following these guidelines can help make the
            transition smoother:
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              Suggest low-pressure, public meeting spots
            </li>
            <li className={styles.li}>
              Plan activities that allow for natural conversation
            </li>
            <li className={styles.li}>
              Set clear expectations about the nature of the meetup
            </li>
            <li className={styles.li}>
              Prioritize safety with daytime meetings initially
            </li>
            <li className={styles.li}>
              Be authentic rather than trying to impress
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>The Role of Community Events</h2>
          <p className={styles.p}>
            One of Serendipity's core innovations is our focus on community
            events as a natural bridge between online and in-person connection.
            These curated gatherings provide a comfortable, low-pressure
            environment to meet people you've connected with online.
          </p>
          <p className={styles.p}>
            Meeting in a group setting first can reduce anxiety and allow for
            more natural interaction. It also provides additional social context
            that's often missing in one-on-one dates arranged through
            traditional apps.
          </p>
        </section>
      </>
    ),
  },
];
