// app/predictions/page.tsx
// This is the My Predictions page of Predictabl.
// It shows all predictions the user has made, split into
// active (ongoing) and completed (won or lost) tabs.
// It also shows win and loss outcome cards for completed predictions
// with full breakdown of payout, rank, and token retention.

"use client";

import { useState } from "react";
import { predictions, userStats } from "@/lib/mockData";
import Link from "next/link";

// Tab type for switching between active and completed predictions
type Tab = "active" | "completed";

// Helper to format date strings into readable format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function PredictionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("active");

  // Split predictions into active and completed groups
  const activePredictions = predictions.filter(
    (p) => p.status === "live" || p.status === "pending"
  );
  const completedPredictions = predictions.filter(
    (p) => p.status === "won" || p.status === "lost"
  );

  // The predictions to show based on which tab is selected
  const displayedPredictions =
    activeTab === "active" ? activePredictions : completedPredictions;

  return (
    <div>

      {/* Stats bar at the top */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          backgroundColor: "#222222",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Total", value: userStats.totalWon.toLocaleString(), color: "#FFFFFF" },
          { label: "Won", value: userStats.won.toString(), color: "#00FF87" },
          { label: "Lost", value: userStats.lost.toString(), color: "#FF3B3B" },
          { label: "Return", value: `+${userStats.winRate}%`, color: "#00FF87" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#111111",
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                color: "#666666",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                color: stat.color,
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Active / Completed tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        {[
          { label: `Active (${activePredictions.length})`, value: "active" as Tab },
          { label: `Completed (${completedPredictions.length})`, value: "completed" as Tab },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              backgroundColor:
                activeTab === tab.value ? "#1A1A1A" : "transparent",
              color: activeTab === tab.value ? "#00FF87" : "#666666",
              border: "none",
              borderBottom:
                activeTab === tab.value
                  ? "2px solid #00FF87"
                  : "2px solid transparent",
              padding: "14px",
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "Barlow Condensed, sans-serif",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Predictions list */}
      {displayedPredictions.length === 0 ? (
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "16px" }}>
            No {activeTab} predictions yet.
          </p>
          <Link
            href="/matches"
            style={{
              color: "#00FF87",
              fontSize: "13px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: "700",
            }}
          >
            Browse Matches →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {displayedPredictions.map((prediction) => {
            const isWon = prediction.status === "won";
            const isLost = prediction.status === "lost";
            const isLive = prediction.status === "live";
            const isPending = prediction.status === "pending";

            // Completed predictions get a special outcome card style
            if (isWon || isLost) {
              return (
                <div
                  key={prediction.id}
                  style={{
                    backgroundColor: "#111111",
                    border: `1px solid ${isWon ? "#00FF87" : "#FF3B3B"}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {/* Outcome banner */}
                  <div
                    style={{
                      backgroundColor: isWon ? "#00FF87" : "#FF3B3B",
                      padding: "10px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#0A0A0A",
                        fontWeight: "700",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontFamily: "Barlow Condensed, sans-serif",
                      }}
                    >
                      {isWon ? "Win Outcome" : "Loss Outcome"}
                    </span>
                    <span style={{ color: "#0A0A0A", fontSize: "12px", fontWeight: "600" }}>
                      {prediction.match.sport} · {formatDate(prediction.createdAt)}
                    </span>
                  </div>

                  <div style={{ padding: "20px" }}>
                    {/* Match name */}
                    <h3
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                      }}
                    >
                      {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                    </h3>

                    {/* Prediction vs actual */}
                    <div
                      style={{
                        backgroundColor: "#1A1A1A",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Metric</span>
                        <span style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Prediction</span>
                        <span style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "right" }}>Result</span>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "8px",
                        }}
                      >
                        <span style={{ color: "#AAAAAA", fontSize: "14px", fontWeight: "600" }}>Score</span>
                        <span style={{ color: isWon ? "#00FF87" : "#FF3B3B", fontSize: "14px", fontWeight: "700", textAlign: "center" }}>
                          {prediction.homeScore} - {prediction.awayScore}
                        </span>
                        <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: "700", textAlign: "right" }}>
                          {isWon ? `${prediction.homeScore} - ${prediction.awayScore}` : "Off by 4"}
                        </span>
                      </div>
                    </div>

                    {/* Payout / loss breakdown */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isWon ? "1fr 1fr" : "1fr 1fr 1fr",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      {isWon ? (
                        <>
                          <div
                            style={{
                              backgroundColor: "rgba(0,255,135,0.1)",
                              borderRadius: "8px",
                              padding: "16px",
                            }}
                          >
                            <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Payout</p>
                            <p style={{ color: "#00FF87", fontSize: "24px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                              +{prediction.actualPayout?.toLocaleString()}
                            </p>
                            <p style={{ color: "#666666", fontSize: "11px" }}>Tokens Secured</p>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#1A1A1A",
                              borderRadius: "8px",
                              padding: "16px",
                            }}
                          >
                            <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Global Rank</p>
                            <p style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                              #{prediction.rank?.toLocaleString()}
                            </p>
                            <p style={{ color: "#666666", fontSize: "11px" }}>
                              Top {((prediction.rank! / prediction.totalParticipants!) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ backgroundColor: "#1A1A1A", borderRadius: "8px", padding: "16px" }}>
                            <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Stake</p>
                            <p style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                              {prediction.wager}
                            </p>
                          </div>
                          <div style={{ backgroundColor: "#1A1A1A", borderRadius: "8px", padding: "16px" }}>
                            <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Retained</p>
                            <p style={{ color: "#AAAAAA", fontSize: "22px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                              {Math.round(prediction.wager * 0.2)}
                            </p>
                            <p style={{ color: "#666666", fontSize: "11px" }}>(20%)</p>
                          </div>
                          <div style={{ backgroundColor: "rgba(255,59,59,0.1)", borderRadius: "8px", padding: "16px" }}>
                            <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Net Loss</p>
                            <p style={{ color: "#FF3B3B", fontSize: "22px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                              -{Math.round(prediction.wager * 0.8)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Active predictions get a simpler card style
            return (
              <div
                key={prediction.id}
                style={{
                  backgroundColor: "#111111",
                  border: "1px solid #222222",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${isLive ? "#00FF87" : "#333333"}`,
                  padding: "20px",
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <p style={{ color: "#666666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                      {prediction.match.sport} · {prediction.match.league}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textTransform: "uppercase",
                      }}
                    >
                      {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                    </h3>
                  </div>
                  <span
                    style={{
                      backgroundColor: isLive ? "#00FF87" : "#333333",
                      color: isLive ? "#0A0A0A" : "#AAAAAA",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {isLive ? "LIVE" : "UPCOMING"}
                  </span>
                </div>

                {/* Stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                  }}
                >
                  <div>
                    <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Prediction</p>
                    <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                      {prediction.homeScore} - {prediction.awayScore}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Wager</p>
                    <p style={{ color: "#AAAAAA", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                      {prediction.wager} TK
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Potential</p>
                    <p style={{ color: "#00FF87", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                      {prediction.potentialPayout} TK
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Rank</p>
                    <p style={{ color: "#AAAAAA", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                      {prediction.rank ? `#${prediction.rank}` : "--"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}