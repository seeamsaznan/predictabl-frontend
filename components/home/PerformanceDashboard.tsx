// components/home/PerformanceDashboard.tsx
// This component displays the user's overall performance stats
// on the home page. It shows 4 key metrics in a grid of cards:
// predictions made, win rate, total tokens won, and best payout.
// These numbers give the user an instant snapshot of how they
// are doing across all their predictions.

import { userStats } from "@/lib/mockData";

// Each stat card has a label, a value, and an optional color
// for the value text. We define them as an array so we can
// map over them instead of writing 4 separate card elements.
const stats = [
  {
    label: "Predictions Made",
    value: userStats.totalPredictions.toString(),
    color: "#FFFFFF",
  },
  {
    label: "Win Rate",
    value: `${userStats.winRate}%`,
    color: "#00FF87",
  },
  {
    label: "Total Won",
    value: userStats.totalWon.toLocaleString(),
    color: "#00FF87",
  },
  {
    label: "Best Payout",
    value: `${userStats.bestPayout}x`,
    color: "#FFFFFF",
  },
];

export default function PerformanceDashboard() {
  return (
    <div
      style={{
        backgroundColor: "#111111",
        border: "1px solid #222222",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        borderLeft: "4px solid #00FF87",
      }}
    >
      {/* Section label */}
      <p
        style={{
          color: "#666666",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        Performance Dashboard
      </p>

      {/* 4 column grid of stat cards.
          Each card shows one key metric. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          backgroundColor: "#222222",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#111111",
              padding: "20px 24px",
            }}
          >
            {/* Stat label */}
            <p
              style={{
                color: "#666666",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              {stat.label}
            </p>

            {/* Stat value -- big and bold */}
            <p
              style={{
                color: stat.color,
                fontSize: "32px",
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
    </div>
  );
}