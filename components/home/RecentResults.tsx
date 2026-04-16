// components/home/RecentResults.tsx
// This component displays the user's most recent prediction
// outcomes at the bottom of the home page.
// Each row shows the match name, sport, date, and the result
// with a colored WON or LOST badge and the token amount.

import { Prediction } from "@/lib/mockData";

// This component receives an array of predictions as a prop.
// The parent page will pass only the completed predictions.
type RecentResultsProps = {
  predictions: Prediction[];
};

// Helper to format the date string into something readable.
// For example "2024-08-23T20:00:00Z" becomes "Aug 23"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentResults({ predictions }: RecentResultsProps) {
  // Filter to only show completed predictions -- won or lost
  const completed = predictions.filter(
    (p) => p.status === "won" || p.status === "lost"
  );

  // If the user has no completed predictions yet show a friendly message
  if (completed.length === 0) {
    return (
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            color: "#666666",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Recent Results
        </p>
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#666666", fontSize: "14px" }}>
            No completed predictions yet. Enter a pool to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "24px" }}>

      {/* Section header */}
      <p
        style={{
          color: "#666666",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        Recent Results
      </p>

      {/* Results list */}
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {completed.map((prediction, index) => (
          <div
            key={prediction.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              // Add a border between rows but not after the last one
              borderBottom:
                index < completed.length - 1
                  ? "1px solid #222222"
                  : "none",
              borderLeft: `4px solid ${
                prediction.status === "won" ? "#00FF87" : "#FF3B3B"
              }`,
            }}
          >
            {/* Left side -- sport badge and match name */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div>
                <p
                  style={{
                    color: "#666666",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "2px",
                  }}
                >
                  {prediction.match.sport} · {formatDate(prediction.createdAt)}
                </p>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: "600",
                    fontFamily: "Barlow Condensed, sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                </p>
              </div>
            </div>

            {/* Right side -- result badge and token amount */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* WON or LOST badge */}
              <span
                style={{
                  backgroundColor:
                    prediction.status === "won"
                      ? "rgba(0, 255, 135, 0.1)"
                      : "rgba(255, 59, 59, 0.1)",
                  color:
                    prediction.status === "won" ? "#00FF87" : "#FF3B3B",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {prediction.status === "won" ? "WON" : "LOST"}
              </span>

              {/* Token amount */}
              <span
                style={{
                  color:
                    prediction.status === "won" ? "#00FF87" : "#FF3B3B",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Barlow Condensed, sans-serif",
                  minWidth: "80px",
                  textAlign: "right",
                }}
              >
                {prediction.status === "won" ? "+" : "-"}
                {prediction.status === "won"
                  ? prediction.actualPayout?.toLocaleString()
                  : prediction.wager.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}