// components/matches/MatchCard.tsx
// This is the reusable match card component used on the Matches page.
// It displays all the key information about a single match:
// league, teams, odds, pool size, entry fee, status, and a predict button.
// On mobile, the predict button stacks below the pool/entry info.

import Link from "next/link";
import { Match } from "@/lib/mockData";

type MatchCardProps = {
  match: Match;
};

function getStatusColor(status: Match["status"]): string {
  switch (status) {
    case "live": return "#00FF87";
    case "closing": return "#FF8C00";
    case "open": return "#AAAAAA";
    case "ended": return "#444444";
    default: return "#666666";
  }
}

function getStatusLabel(status: Match["status"]): string {
  switch (status) {
    case "live": return "LIVE";
    case "closing": return "CLOSING SOON";
    case "open": return "OPEN";
    case "ended": return "ENDED";
    default: return "UNKNOWN";
  }
}

function getBorderColor(status: Match["status"]): string {
  switch (status) {
    case "live": return "#00FF87";
    case "closing": return "#FF8C00";
    case "open": return "#333333";
    case "ended": return "#222222";
    default: return "#222222";
  }
}

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
      {/* Responsive styles for the bottom row */}
      <style>{`
        .match-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .match-card-info {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .match-card-cta {
          background-color: transparent;
          border: 1px solid #00FF87;
          color: #00FF87;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: "Barlow Condensed", sans-serif;
          white-space: nowrap;
          text-align: center;
          display: inline-block;
        }
        @media (max-width: 640px) {
          .match-card-bottom {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .match-card-info {
            justify-content: space-between;
          }
          .match-card-cta {
            width: 100%;
          }
        }
      `}</style>

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
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            color: "#444444",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Money Lines
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 0,
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: "#AAAAAA",
                fontSize: "12px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {match.homeTeam}
            </span>
            <span
              style={{
                color: match.homeOdds < 0 ? "#FFFFFF" : "#00FF87",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
                flexShrink: 0,
              }}
            >
              {formatOdds(match.homeOdds)}
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "24px",
              backgroundColor: "#333333",
              flexShrink: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 0,
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: match.awayOdds > 0 ? "#00FF87" : "#FFFFFF",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
                flexShrink: 0,
              }}
            >
              {formatOdds(match.awayOdds)}
            </span>
            <span
              style={{
                color: "#AAAAAA",
                fontSize: "12px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {match.awayTeam}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row -- pool size, entry fee, predict button */}
      <div className="match-card-bottom">
        <div className="match-card-info">
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
        </div>

        {!isEnded ? (
          <Link href={`/predict?match=${match.id}`} className="match-card-cta">
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