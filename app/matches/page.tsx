// app/matches/page.tsx
// This is the Matches page of Predictabl.
// It displays all available matches with filtering by sport,
// filtering by status, and a search bar.
// It is a client component because it uses React state to
// track which filters are active and update the list instantly
// without reloading the page.

"use client";

import { useState } from "react";
import { matches, Match, Sport } from "@/lib/mockData";
import MatchCard from "@/components/matches/MatchCard";
import { Search } from "lucide-react";

// The list of sport filter pills shown at the top.
// "ALL" is a special value meaning no sport filter is applied.
const sportFilters: (Sport | "ALL")[] = ["ALL", "NBA", "NFL", "Soccer", "UFC", "MLB"];

// The list of status tabs shown below the sport filters.
type StatusFilter = "ALL" | "open" | "closing" | "live" | "ended";
const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All Games", value: "ALL" },
  { label: "Open", value: "open" },
  { label: "Closing Soon", value: "closing" },
  { label: "Live", value: "live" },
  { label: "Ended", value: "ended" },
];

export default function MatchesPage() {
  // useState stores the currently selected filters.
  // When these values change, React automatically re-renders
  // the component with the new filtered list.
  // This is the core of how interactive filtering works in React.
  const [selectedSport, setSelectedSport] = useState<Sport | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // This is the filtering logic.
  // We start with all matches and apply each filter one by one.
  // The result is a new array containing only the matches that
  // pass all three filters simultaneously.
  const filteredMatches = matches.filter((match) => {
    // Sport filter -- skip if ALL is selected
    const sportMatch =
      selectedSport === "ALL" || match.sport === selectedSport;

    // Status filter -- skip if ALL is selected
    const statusMatch =
      selectedStatus === "ALL" || match.status === selectedStatus;

    // Search filter -- check if the search query appears in
    // the team names or league name (case insensitive)
    const searchMatch =
      searchQuery === "" ||
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase());

    // A match only appears if it passes ALL three filters
    return sportMatch && statusMatch && searchMatch;
  });

  return (
    <div>

      {/* Search bar */}
      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666666",
          }}
        />
        <input
          type="text"
          placeholder="Search matches..."
          value={searchQuery}
          // Every time the user types a character, update searchQuery.
          // React re-renders and the filtered list updates instantly.
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "8px",
            padding: "14px 16px 14px 44px",
            color: "#FFFFFF",
            fontSize: "14px",
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>

      {/* Sport filter pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {sportFilters.map((sport) => {
          const isActive = selectedSport === sport;
          return (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              style={{
                backgroundColor: isActive ? "#00FF87" : "transparent",
                color: isActive ? "#0A0A0A" : "#666666",
                border: isActive ? "1px solid #00FF87" : "1px solid #333333",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
              }}
            >
              {sport}
            </button>
          );
        })}
      </div>

      {/* Status filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0",
          marginBottom: "24px",
          borderBottom: "1px solid #222222",
        }}
      >
        {statusFilters.map((filter) => {
          const isActive = selectedStatus === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              style={{
                backgroundColor: "transparent",
                color: isActive ? "#00FF87" : "#666666",
                border: "none",
                borderBottom: isActive
                  ? "2px solid #00FF87"
                  : "2px solid transparent",
                padding: "12px 20px",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
                marginBottom: "-1px",
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p
        style={{
          color: "#666666",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "16px",
        }}
      >
        {filteredMatches.length} {filteredMatches.length === 1 ? "Match" : "Matches"} Found
      </p>

      {/* Match cards grid */}
      {filteredMatches.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        // Empty state when no matches pass the filters
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "8px" }}>
            No matches found
          </p>
          <p style={{ color: "#444444", fontSize: "12px" }}>
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}