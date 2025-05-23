import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

// Helper to determine if we're in development mode
const isDev = process.env.NODE_ENV === "development";

const config = {
  // REQUIRED
  appName: "Serendipity Dating",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Dating with balance and authenticity. The first dating app designed for true balance across communities, creating an equitable platform for authentic connections.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "serendipitydating.io", // Update with your actual domain
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // For future monetization - keeping minimal for now since focus is email collection
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_serendipity_dev"
            : "price_serendipity_prod",
        name: "Early Access",
        description: "Be among the first to experience authentic dating",
        price: 0, // Free for early access
        priceAnchor: 29,
        features: [
          { name: "Balanced community matching" },
          { name: "Real-life event invitations" },
          { name: "Anti-ghosting features" },
          { name: "Transparent algorithms" },
          { name: "Community-driven development" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "serendipity-assets",
    bucketUrl: `https://serendipity-assets.s3.amazonaws.com/`,
    cdn: "https://cdn-serendipity.cloudfront.net/",
  },
  resend: {
    // Using resend.dev as the email domain in development
    // In production, you would use your own verified domain
    fromNoReply: isDev
      ? `Serendipity <onboarding@resend.dev>`
      : `Serendipity <noreply@serendipitydating.com>`,
    fromAdmin: isDev
      ? `Team Serendipity <onboarding@resend.dev>`
      : `Team Serendipity <hello@serendipitydating.com>`,
    // Email shown to customer if need support.
    supportEmail: isDev
      ? "onboarding@resend.dev"
      : "support@serendipitydating.io",
  },
  colors: {
    // Using light theme as base with rose/violet gradient accents
    theme: "light",
    // Primary brand color - rose gradient
    main: "#e11d48", // rose-600
  },
  auth: {
    // REQUIRED — the path to log in users (for future app functionality)
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successful login
    callbackUrl: "/waitlist-success",
  },
  // Serendipity-specific configuration
  serendipity: {
    // Social media and external links
    twitter: "https://twitter.com/serendipity_dev",
    instagram: "https://instagram.com/serendipity.dating",
    // Event cities for the events section
    eventCities: [
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
    ],
    // Marketing incentives and lead magnets
    leadMagnets: {
      primary:
        "Get exclusive early access and help shape the future of authentic dating",
      secondary:
        "Join 500+ forward-thinking singles building a better dating experience",
      urgency: "Limited founding member spots available",
    },
  },
} as ConfigProps & {
  serendipity: {
    twitter: string;
    instagram: string;
    eventCities: Array<{
      name: string;
      date: string;
      title: string;
      description?: string;
      image: string;
      interested?: number;
      featured?: boolean;
    }>;
    leadMagnets: {
      primary: string;
      secondary: string;
      urgency: string;
    };
  };
};

export default config;
