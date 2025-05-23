import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Thank You | ${config.appName}`,
  description:
    "You're on the waitlist! Thank you for joining the Serendipity community.",
  canonicalUrlRelative: "/waitlist-success",
});
