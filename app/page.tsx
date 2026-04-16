// app/page.tsx
// This is the Home page of Predictabl.
// It assembles all the home page components together:
// 1. FeaturedMatch -- the hero banner at the top
// 2. PerformanceDashboard -- the user's overall stats
// 3. ActivePools -- matches currently open for predictions
// 4. RecentResults -- the user's recent prediction outcomes
//
// This page imports data from mockData and passes it down
// to each component as props. When we connect the real backend
// in Phase 11, we will replace the mock data imports with
// real API calls -- the components themselves won't change.

import FeaturedMatch from "@/components/home/FeaturedMatch";
import PerformanceDashboard from "@/components/home/PerformanceDashboard";
import ActivePools from "@/components/home/ActivePools";
import RecentResults from "@/components/home/RecentResults";
import { matches, predictions } from "@/lib/mockData";

export default function HomePage() {
  // Find the featured match -- we pick the live match first,
  // then fall back to closing, then open.
  // The exclamation mark tells TypeScript we are sure this
  // will not be undefined because we always have a live match
  // in our mock data.
  const featuredMatch =
    matches.find((m) => m.status === "live") ||
    matches.find((m) => m.status === "closing") ||
    matches[0];

  // Active pools are matches that are not ended yet.
  // We show a maximum of 4 on the home page.
  const activePools = matches
    .filter((m) => m.status !== "ended")
    .slice(0, 4);

  return (
    <div>
      {/* The featured match hero banner */}
      <FeaturedMatch match={featuredMatch} />

      {/* The user's performance stats grid */}
      <PerformanceDashboard />

      {/* Two column layout for active pools and recent results.
          This uses CSS grid to put pools on the left (wider)
          and recent results on the right (narrower). */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <ActivePools matches={activePools} />
        <RecentResults predictions={predictions} />
      </div>
    </div>
  );
}