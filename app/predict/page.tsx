// app/predict/page.tsx
// Match Detail and Predict page.
// Desktop: 2-column grid with match info on the left, Lock Prediction
// sticky on the right.
// Mobile: single column where Lock Prediction is moved UP to appear
// right after the match header and stats bar, before Global Sentiment.
// Mobile version has a compact match header so more of the Lock
// Prediction section fits on screen without scrolling.

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMatchById } from "@/lib/mockData";
import ScorePicker from "@/components/predict/ScorePicker";
import Link from "next/link";
import { Suspense } from "react";

function PredictContent() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("match") || "match-001";
  const match = getMatchById(matchId);

  const [homeScore, setHomeScore] = useState(108);
  const [awayScore, setAwayScore] = useState(104);
  const [showModal, setShowModal] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  function calculateConfidence(): number {
    const scoreDiff = Math.abs(homeScore - awayScore);
    if (scoreDiff === 0) return 50;
    if (scoreDiff <= 3) return 85;
    if (scoreDiff <= 7) return 75;
    if (scoreDiff <= 15) return 65;
    return 55;
  }

  function calculatePayout(): number {
    if (!match) return 0;
    const confidence = calculateConfidence();
    const multiplier = confidence / 100 * 3;
    return Math.round(match.entryFee * multiplier * 10);
  }

  function handleLockPrediction() {
    setIsLocking(true);
    setTimeout(() => {
      setIsLocking(false);
      setShowModal(true);
    }, 1000);
  }

  if (!match) {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ color: "#666666", fontSize: "16px" }}>
          Match not found.
        </p>
        <Link
          href="/matches"
          style={{ color: "#00FF87", fontSize: "14px", textDecoration: "none" }}
        >
          Browse all matches
        </Link>
      </div>
    );
  }

  const confidence = calculateConfidence();
  const estimatedPayout = calculatePayout();

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .predict-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .predict-left-column {
            display: flex !important;
            flex-direction: column !important;
          }
          .match-info-card {
            order: 1;
            padding: 20px !important;
          }
          .match-lock-wrapper-mobile {
            order: 2;
          }
          .match-sentiment-card {
            order: 3;
          }
          .predict-right-column {
            display: none !important;
          }
          .predict-sticky {
            position: static !important;
          }
          .match-header-title {
            font-size: 18px !important;
          }
          .match-team-icon {
            width: 48px !important;
            height: 48px !important;
          }
          .match-vs-text {
            font-size: 24px !important;
          }
          .match-teams-row {
            margin-bottom: 16px !important;
          }
          .match-header-top {
            margin-bottom: 16px !important;
          }
        }

        @media (min-width: 769px) {
          .match-lock-wrapper-mobile {
            display: none !important;
          }
        }
      `}</style>

      <div
        className="predict-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN */}
        <div className="predict-left-column">

          {/* Match header card */}
          <div
            className="match-info-card"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #0d1a0d 0%, #111111 60%, #0a0a0a 100%)",
            }}
          >
            <div
              className="match-header-top"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  color: "#666666",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {match.league}
              </span>
              <span
                style={{
                  backgroundColor: match.status === "live" ? "#00FF87" : "#FF8C00",
                  color: "#0A0A0A",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                {match.status === "live" ? "LIVE" : "CLOSING SOON"}
              </span>
            </div>

            <div
              className="match-teams-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  className="match-team-icon"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    border: "1px solid #333333",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🏀</span>
                </div>
                <p
                  className="match-header-title"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {match.homeTeam}
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "0 24px" }}>
                <p
                  className="match-vs-text"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "32px",
                    fontWeight: "800",
                    color: "#00FF87",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  VS
                </p>
                <p style={{ color: "#666666", fontSize: "12px" }}>
                  {match.startTime}
                </p>
                <p style={{ color: "#666666", fontSize: "12px" }}>
                  {match.channel}
                </p>
              </div>

              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  className="match-team-icon"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#00FF87",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🏀</span>
                </div>
                <p
                  className="match-header-title"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {match.awayTeam}
                </p>
              </div>
            </div>

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
              {[
                { label: "Total Pot", value: `${(match.poolSize / 1000).toFixed(1)}K` },
                { label: "Players", value: match.participants.toLocaleString() },
                { label: "Odds", value: `${match.homeOdds}/${match.awayOdds > 0 ? "+" : ""}${match.awayOdds}` },
                { label: "TV", value: match.channel },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "#1A1A1A",
                    padding: "12px 16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    {stat.label}
                  </p>
                  <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE ONLY -- Lock Prediction */}
<div
  className="match-lock-wrapper-mobile"
  style={{
    backgroundColor: "#111111",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "16px",
  }}
>
  {/* The neon green bordered container wrapping the prediction form */}
  <div
    style={{
      border: "2px solid #00FF87",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      boxShadow: "0 0 20px rgba(0, 255, 135, 0.15)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <p
        style={{
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Lock Prediction
      </p>
      <span
        style={{
          backgroundColor: "rgba(0,255,135,0.1)",
          color: "#00FF87",
          fontSize: "11px",
          fontWeight: "700",
          padding: "4px 10px",
          borderRadius: "4px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Elite Tier
      </span>
    </div>

    <ScorePicker
      homeTeam={match.homeTeam}
      awayTeam={match.awayTeam}
      homeScore={homeScore}
      awayScore={awayScore}
      onHomeScoreChange={setHomeScore}
      onAwayScoreChange={setAwayScore}
    />

    <div
      style={{
        backgroundColor: "#1A1A1A",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Est. Payout
        </span>
        <span style={{ color: "#00FF87", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
          {estimatedPayout.toLocaleString()} TOKENS
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Confidence Score
        </span>
        <span
          style={{
            color: confidence >= 75 ? "#00FF87" : confidence >= 60 ? "#FF8C00" : "#FF3B3B",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Barlow Condensed, sans-serif",
          }}
        >
          {confidence} / 100
        </span>
      </div>
    </div>

    <p style={{ color: "#666666", fontSize: "12px", textAlign: "center" }}>
      Entry fee: {match.entryFee} TKNS will be deducted
    </p>
  </div>

  {/* Lock Score button OUTSIDE the bordered container */}
  <button
    onClick={handleLockPrediction}
    disabled={isLocking}
    style={{
      width: "100%",
      backgroundColor: isLocking ? "#00CC6A" : "#00FF87",
      color: "#0A0A0A",
      fontWeight: "700",
      fontSize: "16px",
      padding: "16px",
      borderRadius: "8px",
      border: "none",
      cursor: isLocking ? "not-allowed" : "pointer",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      fontFamily: "Barlow Condensed, sans-serif",
      transition: "all 0.2s",
    }}
  >
    {isLocking ? "LOCKING..." : "LOCK SCORE"}
  </button>
</div>
          {/* Global sentiment card */}
          <div
            className="match-sentiment-card"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Global Sentiment
              </p>
              <span
                style={{
                  color: "#00FF87",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                · Live Tracking
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: "700", color: "#FFFFFF", lineHeight: 1 }}>
                  {match.homeSentiment}%
                </p>
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase" }}>
                  {match.homeTeam}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: "700", color: "#00FF87", lineHeight: 1 }}>
                  {match.awaySentiment}%
                </p>
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase" }}>
                  {match.awayTeam}
                </p>
              </div>
            </div>

            <div style={{ height: "6px", backgroundColor: "#222222", borderRadius: "3px", overflow: "hidden", marginBottom: "20px" }}>
              <div style={{ height: "100%", width: `${match.homeSentiment}%`, backgroundColor: "#FFFFFF", borderRadius: "3px" }} />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Pot Capacity
                </p>
                <p style={{ color: "#AAAAAA", fontSize: "12px", fontWeight: "600" }}>
                  {match.potCapacity}% of Cap
                </p>
              </div>
              <div style={{ height: "6px", backgroundColor: "#222222", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${match.potCapacity}%`, backgroundColor: "#00FF87", borderRadius: "3px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN -- desktop only */}
        <div className="predict-right-column">
          <div
            className="predict-sticky"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "24px",
              position: "sticky",
              top: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Lock Prediction
              </p>
              <span
                style={{
                  backgroundColor: "rgba(0,255,135,0.1)",
                  color: "#00FF87",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Elite Tier
              </span>
            </div>

            <ScorePicker
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeScore={homeScore}
              awayScore={awayScore}
              onHomeScoreChange={setHomeScore}
              onAwayScoreChange={setAwayScore}
            />

            <div
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Est. Payout
                </span>
                <span style={{ color: "#00FF87", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                  {estimatedPayout.toLocaleString()} TOKENS
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Confidence Score
                </span>
                <span
                  style={{
                    color: confidence >= 75 ? "#00FF87" : confidence >= 60 ? "#FF8C00" : "#FF3B3B",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {confidence} / 100
                </span>
              </div>
            </div>

            <p style={{ color: "#666666", fontSize: "12px", textAlign: "center", marginBottom: "16px" }}>
              Entry fee: {match.entryFee} TKNS will be deducted
            </p>

            <button
              onClick={handleLockPrediction}
              disabled={isLocking}
              style={{
                width: "100%",
                backgroundColor: isLocking ? "#00CC6A" : "#00FF87",
                color: "#0A0A0A",
                fontWeight: "700",
                fontSize: "16px",
                padding: "16px",
                borderRadius: "8px",
                border: "none",
                cursor: isLocking ? "not-allowed" : "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
              }}
            >
              {isLocking ? "LOCKING..." : "LOCK SCORE"}
            </button>
          </div>
        </div>
      </div>

      {/* Prediction Locked Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              border: "2px solid #00FF87",
              borderRadius: "16px",
              padding: "48px",
              maxWidth: "440px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#00FF87",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <span style={{ fontSize: "28px", color: "#0A0A0A" }}>✓</span>
            </div>

            <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: "800", color: "#FFFFFF", textTransform: "uppercase", marginBottom: "12px" }}>
              Prediction Locked
            </h2>

            <p style={{ color: "#00FF87", fontSize: "20px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif", marginBottom: "24px" }}>
              {match.homeTeam} {homeScore} — {match.awayTeam} {awayScore}
            </p>

            <div style={{ backgroundColor: "#1A1A1A", borderRadius: "8px", padding: "12px 20px", marginBottom: "24px", display: "inline-block" }}>
              <span style={{ color: "#AAAAAA", fontSize: "13px" }}>
                {match.entryFee} TOKENS DEDUCTED
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/matches"
                style={{
                  display: "block",
                  backgroundColor: "#00FF87",
                  color: "#0A0A0A",
                  fontWeight: "700",
                  fontSize: "14px",
                  padding: "14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                Browse More Matches →
              </Link>
              <Link
                href="/predictions"
                style={{
                  display: "block",
                  backgroundColor: "transparent",
                  border: "1px solid #00FF87",
                  color: "#00FF87",
                  fontWeight: "700",
                  fontSize: "14px",
                  padding: "14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                View My Predictions →
              </Link>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #222222" }}>
              <span style={{ color: "#444444", fontSize: "11px" }}>
                TXID: CL-8842-X9
              </span>
              <span style={{ color: "#444444", fontSize: "11px" }}>
                {new Date().toLocaleDateString()} · {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PredictPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ color: "#666666" }}>Loading match...</p>
      </div>
    }>
      <PredictContent />
    </Suspense>
  );
}