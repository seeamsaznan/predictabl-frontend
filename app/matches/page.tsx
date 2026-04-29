// app/matches/page.tsx
// Matches page with a professional sport dropdown + dynamic league chips.
// Structure:
// 1. Search bar
// 2. Sport dropdown -- user picks top-level sport (All Games, Basketball, etc.)
// 3. League chips -- dynamically show leagues for the selected sport
// 4. Status tabs -- All / Open / Closing / Live / Ended
// 5. Match grid
//
// CRICKET HANDLING:
// Cricket has three formats internally (Cricket_T20, Cricket_ODI, Cricket_Test)
// because each format needs a different distribution threshold. But the user
// dropdown shows just "Cricket" as one option -- selecting it filters to all
// three formats. This pattern is called "virtual filter values": the dropdown
// has filter ids that map to one or more real sport values.

"use client";

import { useState, useRef, useEffect } from "react";
import { matches, Sport, leaguesBySport } from "@/lib/mockData";
import MatchCard from "@/components/matches/MatchCard";
import { Search, ChevronDown } from "lucide-react";

// A sport filter option in the dropdown.
// id -- the internal identifier we store in state and use for filtering
// label -- the user-facing text shown in the dropdown
// matchesSport -- given a match's sport, returns true if it should appear
//                 when this filter is active
type SportFilterOption = {
  id: string;
  label: string;
  matchesSport: (sport: Sport) => boolean;
};

// The dropdown options.
// "All Games" matches everything. "Cricket" matches all three cricket formats.
// Every other option matches its exact sport.
const sportOptions: SportFilterOption[] = [
  {
    id: "All Games",
    label: "All Games",
    matchesSport: () => true,
  },
  {
    id: "Basketball",
    label: "Basketball",
    matchesSport: (s) => s === "Basketball",
  },
  {
    id: "Football",
    label: "Football",
    matchesSport: (s) => s === "Football",
  },
  {
    id: "Soccer",
    label: "Soccer",
    matchesSport: (s) => s === "Soccer",
  },
  {
    id: "Cricket",
    label: "Cricket",
    matchesSport: (s) =>
      s === "Cricket_T20" || s === "Cricket_ODI" || s === "Cricket_Test",
  },
  {
    id: "Hockey",
    label: "Hockey",
    matchesSport: (s) => s === "Hockey",
  },
  {
    id: "MMA",
    label: "MMA",
    matchesSport: (s) => s === "MMA",
  },
  {
    id: "Baseball",
    label: "Baseball",
    matchesSport: (s) => s === "Baseball",
  },
];

// The status tabs shown below the league chips
type StatusFilter = "ALL" | "open" | "closing" | "live" | "ended";
const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All Games", value: "ALL" },
  { label: "Open", value: "open" },
  { label: "Closing Soon", value: "closing" },
  { label: "Live", value: "live" },
  { label: "Ended", value: "ended" },
];

// Helper: given the selected sport filter id, return the union of all leagues
// from the underlying real sports it covers. For "Cricket" this combines the
// league lists from Cricket_T20, Cricket_ODI, and Cricket_Test into one
// deduplicated list with "All" at the front.
function getLeaguesForFilter(filterId: string): string[] {
  if (filterId === "All Games") return [];

  // Special case: "Cricket" combines all three format league lists.
  if (filterId === "Cricket") {
    const combined = new Set<string>();
    combined.add("All");
    const formats: Sport[] = ["Cricket_T20", "Cricket_ODI", "Cricket_Test"];
    for (const format of formats) {
      for (const league of leaguesBySport[format]) {
        if (league !== "All") combined.add(league);
      }
    }
    return Array.from(combined);
  }

  // Standard case: filter id is a real Sport, look it up directly.
  return leaguesBySport[filterId as Sport] ?? [];
}

export default function MatchesPage() {
  // Which sport filter is selected in the dropdown (stored as filter id, not Sport)
  const [selectedSportId, setSelectedSportId] = useState<string>("All Games");

  // Which league chip is selected (always "All" when sport changes)
  const [selectedLeague, setSelectedLeague] = useState<string>("All");

  // Whether the sport dropdown is currently open
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Which status tab is selected
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");

  // Search query typed by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Ref to detect clicks outside the dropdown so we can close it
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when the user clicks anywhere outside it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the currently active filter option (used by the filter callback)
  const activeOption =
    sportOptions.find((o) => o.id === selectedSportId) ?? sportOptions[0];

  // Get the leagues to show as chips for the currently selected sport.
  const availableLeagues = getLeaguesForFilter(selectedSportId);

  // When user picks a different sport, reset the league to "All"
  function handleSportChange(filterId: string) {
    setSelectedSportId(filterId);
    setSelectedLeague("All");
    setDropdownOpen(false);
  }

  // Filter matches based on all active filters
  const filteredMatches = matches.filter((match) => {
    // Sport filter -- use the active option's matchesSport function
    const sportMatch = activeOption.matchesSport(match.sport);

    // League filter -- skip if "All"
    const leagueMatch =
      selectedLeague === "All" || match.league === selectedLeague;

    // Status filter -- skip if ALL
    const statusMatch =
      selectedStatus === "ALL" || match.status === selectedStatus;

    // Search filter
    const searchMatch =
      searchQuery === "" ||
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase());

    return sportMatch && leagueMatch && statusMatch && searchMatch;
  });

  return (
    <div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr !important;
          }
          .status-tabs {
            overflow-x: auto;
            white-space: nowrap;
          }
          .league-chips {
            overflow-x: auto;
            white-space: nowrap;
            flex-wrap: nowrap !important;
          }
        }
      `}</style>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
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

      {/* Sport dropdown */}
      <div
        ref={dropdownRef}
        style={{
          position: "relative",
          marginBottom: "16px",
          width: "100%",
          maxWidth: "280px",
        }}
      >
        {/* Dropdown trigger button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            width: "100%",
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "8px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Barlow Condensed, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#00FF87",
                borderRadius: "50%",
              }}
            />
            {activeOption.label}
          </span>
          <ChevronDown
            size={16}
            color="#666666"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* Dropdown panel */}
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "8px",
              padding: "6px",
              zIndex: 50,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {sportOptions.map((option) => {
              const isActive = selectedSportId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSportChange(option.id)}
                  style={{
                    width: "100%",
                    backgroundColor: isActive ? "rgba(0,255,135,0.1)" : "transparent",
                    color: isActive ? "#00FF87" : "#AAAAAA",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    fontFamily: "Barlow Condensed, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* League chips -- only shown if a specific sport is selected */}
      {availableLeagues.length > 0 && (
        <div
          className="league-chips"
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {availableLeagues.map((league) => {
            const isActive = selectedLeague === league;
            return (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                style={{
                  backgroundColor: isActive ? "#00FF87" : "transparent",
                  color: isActive ? "#0A0A0A" : "#AAAAAA",
                  border: isActive ? "1px solid #00FF87" : "1px solid #333333",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  fontFamily: "Barlow Condensed, sans-serif",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {league}
              </button>
            );
          })}
        </div>
      )}

      {/* Status filter tabs */}
      <div
        className="status-tabs"
        style={{
          display: "flex",
          gap: "0",
          marginBottom: "24px",
          borderBottom: "1px solid #222222",
          maxWidth: "100%",
          overflowX: "auto",
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
                borderBottom: isActive ? "2px solid #00FF87" : "2px solid transparent",
                padding: "12px 20px",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
                marginBottom: "-1px",
                whiteSpace: "nowrap",
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
          className="matches-grid"
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