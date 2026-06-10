import ClosedNotice from "@/components/ClosedNotice";

// Serendipity has wound down. The landing page now shows a static closed notice.
// The previous landing page still lives in components/landing/LandingPage if ever needed.
export default function Home() {
  return <ClosedNotice />;
}
