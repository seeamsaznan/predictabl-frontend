// components/home/FeaturedMatch.tsx
// This is the big hero banner at the top of the home page.
// It shows the most prominent live or closing match with a
// prize pool amount and an Enter Pool call to action button.
// It is the first thing users see when they open the app.

import Link from "next/link";
import { Match } from "@/lib/mockData";

// This component receives a match object as a prop.
// A prop is data passed into a component from its parent.
// Think of it like a function argument -- the component uses
// the data to decide what to render.
type FeaturedMatchProps = {
  match: Match;
};

// Helper function to format large numbers with commas
// for example 24800 becomes "24,800"
function formatNumber(num: number): string {
  return num.toLocaleString();
}

export default function FeaturedMatch({ match }: FeaturedMatchProps) {
  return (
    // The outer container has a dark background with a subtle
    // green gradient overlay to give it that arena spotlight feel
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "24px",
        background: "linear-gradient(135deg, #0d1a0d 0%, #111111 50%, #0a0a0a 100%)",
        border: "1px solid #222222",
      }}
    >
      {/* Green spotlight effect in the top left corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ padding: "32px", position: "relative", zIndex: 1 }}>

        {/* Top row -- sport badge and participant count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Live badge -- green pill showing this match is live */}
            <span
              style={{
                backgroundColor: "#00FF87",
                color: "#0A0A0A",
                fontSize: "11px",
                fontWeight: "700",
                padding: "4px 10px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
              }}
            >
              {match.sport} {match.status === "live" ? "Live" : ""}
            </span>
            <span style={{ color: "#666666", fontSize: "13px" }}>
              {match.league}
            </span>
          </div>
          <span style={{ color: "#AAAAAA", fontSize: "13px" }}>
            {formatNumber(match.participants)} Participants
          </span>
        </div>

        {/* Match title -- the big bold team names */}
        <h2
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontSize: "48px",
            fontWeight: "800",
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1,
            marginBottom: "8px",
          }}
        >
          {match.homeTeam} vs {match.awayTeam}
        </h2>

        {/* Prize pool amount in green */}
        <p
          style={{
            color: "#00FF87",
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "Barlow Condensed, sans-serif",
            marginBottom: "24px",
          }}
        >
          {formatNumber(match.poolSize)} TOKENS PRIZE POOL
        </p>

        {/* Bottom row -- enter pool button and match info */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          {/* The main CTA button */}
          <Link
            href={`/predict?match=${match.id}`}
            style={{
              backgroundColor: "#00FF87",
              color: "#0A0A0A",
              fontWeight: "700",
              fontSize: "14px",
              padding: "14px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "Barlow Condensed, sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ENTER POOL →
          </Link>

          {/* Match details -- time and channel */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#666666", fontSize: "13px" }}>
              {match.startTime}
            </span>
            <span style={{ color: "#666666", fontSize: "13px" }}>
              {match.channel}
            </span>
            <span style={{ color: "#666666", fontSize: "13px" }}>
              Entry: {match.entryFee} TKNS
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}