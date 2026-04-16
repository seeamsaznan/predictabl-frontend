// components/matches/MatchCard.tsx
// This is the reusable match card component used on the Matches page.
// It displays all the key information about a single match:
// league, teams, odds, pool size, entry fee, status, and a predict button.
// It receives a match object as a prop and renders it consistently.

import Link from "next/link";
import { Match } from "@/lib/mockData";

type MatchCardProps = {
  match: Match;
};

// Returns the correct color for each match status
function getStatusColor(status: Match["status"]): string {
  switch (status) {
    case "live": return "#00FF87";
    case "closing": return "#FF8C00";
    case "open": return "#AAAAAA";
    case "ended": return "#444444";
    default: return "#666666";
  }
}

// Returns the correct label for each match status
function getStatusLabel(status: Match["status"]): string {
  switch (status) {
    case "live": return "LIVE";
    case "closing": return "CLOSING SOON";
    case "open": return "OPEN";
    case "ended": return "ENDED";
    default: return "UNKNOWN";
  }
}

// Returns the correct left border color for each match status
function getBorderColor(status: Match["status"]): string {
  switch (status) {
    case "live": return "#00FF87";
    case "closing": return "#FF8C00";
    case "open": return "#333333";
    case "ended": return "#222222";
    default: return "#222222";
  }
}

// Formats odds number with + or - prefix
// for example 130 becomes "+130" and -150 stays "-150"
function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isEnded = match.status === "ended";

  return (
    <div
      style={{
        backgroundColor: "#111111",
        border: "1px solid #222222",
        borderRadius: "12px",
        borderLeft: `4px solid ${getBorderColor(match.status)}`,
        padding: "20px",
        opacity: isEnded ? 0.6 : 1,
      }}
    >
      {/* Top row -- league and status badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            color: "#666666",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {match.sport} · {match.league}
        </span>
        <span
          style={{
            color: getStatusColor(match.status),
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {getStatusLabel(match.status)}
        </span>
      </div>

      {/* Match title */}
      <h3
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          fontSize: "24px",
          fontWeight: "700",
          color: "#FFFFFF",
          textTransform: "uppercase",
          marginBottom: "12px",
          lineHeight: 1.1,
        }}
      >
        {match.homeTeam} vs {match.awayTeam}
      </h3>

      {/* Match info row -- channel and time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <span style={{ color: "#666666", fontSize: "12px" }}>
          {match.channel}
        </span>
        <span style={{ color: "#666666", fontSize: "12px" }}>
          {match.startTime}
        </span>
      </div>

      {/* Money lines row */}
      <div
        style={{
          backgroundColor: "#1A1A1A",
          borderRadius: "8px",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#AAAAAA", fontSize: "12px", textTransform: "uppercase" }}>
            {match.homeTeam}
          </span>
          <span
            style={{
              color: match.homeOdds < 0 ? "#FFFFFF" : "#00FF87",
              fontSize: "16px",
              fontWeight: "700",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            {formatOdds(match.homeOdds)}
          </span>
        </div>
        <span style={{ color: "#444444", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Money Lines
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              color: match.awayOdds > 0 ? "#00FF87" : "#FFFFFF",
              fontSize: "16px",
              fontWeight: "700",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            {formatOdds(match.awayOdds)}
          </span>
          <span style={{ color: "#AAAAAA", fontSize: "12px", textTransform: "uppercase" }}>
            {match.awayTeam}
          </span>
        </div>
      </div>

      {/* Bottom row -- pool size, entry fee, predict button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
            Pool Size
          </p>
          <p style={{ color: "#00FF87", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
            {match.poolSize.toLocaleString()} TKNS
          </p>
        </div>
        <div>
          <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
            Entry
          </p>
          <p style={{ color: "#AAAAAA", fontSize: "14px", fontWeight: "600" }}>
            {match.entryFee} TKNS
          </p>
        </div>

        {/* Only show predict button if match is not ended */}
        {!isEnded ? (
          <Link
            href={`/predict?match=${match.id}`}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #00FF87",
              color: "#00FF87",
              fontWeight: "700",
              fontSize: "13px",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "Barlow Condensed, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            PREDICT SCORE →
          </Link>
        ) : (
          <span
            style={{
              color: "#444444",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            ENDED
          </span>
        )}
      </div>
    </div>
  );
}