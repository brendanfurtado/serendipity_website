// app/blog/building-better-blog-connections/page.tsx
import { redirect } from "next/navigation";

// This redirects to the correct slug for the article
export default function BuildingBetterBlogConnections() {
  redirect("/blog/building-better-connections");
}
