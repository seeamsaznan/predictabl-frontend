// app/wallet/page.tsx
// This is the Wallet page of Predictabl.
// It shows the user's token balance, breakdown of available
// and locked tokens, a withdrawal panel with currency conversion,
// a monthly earnings goal tracker, and full transaction history.

"use client";

import { useState } from "react";
import { userStats, transactions } from "@/lib/mockData";

// The supported withdrawal currencies
type Currency = "USD" | "EUR" | "GBP";

// Conversion rates from tokens to each currency.
// 100 tokens = 1 USD as the base rate.
const conversionRates: Record<Currency, number> = {
  USD: 0.01,
  EUR: 0.0092,
  GBP: 0.0079,
};

// Currency symbols for display
const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

// Helper to get color and label for each transaction type
function getTransactionStyle(type: string): { color: string; prefix: string } {
  switch (type) {
    case "won":
    case "deposit":
      return { color: "#00FF87", prefix: "+" };
    case "lost":
    case "withdrawal":
    case "entry":
      return { color: "#FF3B3B", prefix: "-" };
    default:
      return { color: "#AAAAAA", prefix: "" };
  }
}

// Helper to format transaction type into readable label
function getTransactionLabel(type: string): string {
  switch (type) {
    case "won": return "Prediction Win";
    case "lost": return "Prediction Loss";
    case "deposit": return "Token Deposit";
    case "withdrawal": return "Withdrawal";
    case "entry": return "Pool Entry Fee";
    default: return type;
  }
}

export default function WalletPage() {
  // Currently selected currency for withdrawal
  const [currency, setCurrency] = useState<Currency>("USD");

  // The amount the user wants to withdraw in tokens
  const [withdrawAmount, setWithdrawAmount] = useState(1000);

  // Controls which view is shown -- main wallet or withdraw panel
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Calculate the real world value of the withdrawal amount
  const realWorldValue = (withdrawAmount * conversionRates[currency]).toFixed(2);

  // Calculate the monthly goal percentage
  const monthlyProgress = Math.round(
    (userStats.monthlyEarned / userStats.monthlyGoal) * 100
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "24px",
        alignItems: "start",
      }}
    >
      {/* LEFT COLUMN -- balance, breakdown, transaction history */}
      <div>

        {/* Total balance hero card */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #0d1a0d 0%, #111111 60%, #0a0a0a 100%)",
          }}
        >
          <p
            style={{
              color: "#666666",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "8px",
            }}
          >
            Total Balance
          </p>
          <p
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "56px",
              fontWeight: "800",
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            {userStats.tokenBalance.toLocaleString()}
            <span
              style={{
                fontSize: "24px",
                color: "#666666",
                marginLeft: "8px",
                fontWeight: "400",
              }}
            >
              TOKENS
            </span>
          </p>

          {/* Add tokens and withdraw buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <button
              style={{
                flex: 1,
                backgroundColor: "#00FF87",
                color: "#0A0A0A",
                fontWeight: "700",
                fontSize: "14px",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
              }}
            >
              + Add Tokens
            </button>
            <button
              onClick={() => setShowWithdraw(!showWithdraw)}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                color: "#00FF87",
                fontWeight: "700",
                fontSize: "14px",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #00FF87",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
              }}
            >
              Withdraw
            </button>
          </div>

          {/* Token breakdown -- available, locked, returned */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              backgroundColor: "#222222",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {[
              { label: "Available", value: userStats.tokenBalance - userStats.lockedTokens, color: "#FFFFFF" },
              { label: "Locked", value: userStats.lockedTokens, color: "#00FF87" },
              { label: "Returned", value: `+${userStats.returnedTokens}`, color: "#00FF87" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ backgroundColor: "#1A1A1A", padding: "16px" }}
              >
                <p
                  style={{
                    color: "#666666",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    color: item.color,
                    fontSize: "22px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly goal progress */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "12px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#666666",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "4px",
                }}
              >
                Monthly Goal
              </p>
              <p
                style={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                }}
              >
                ${userStats.monthlyEarned.toLocaleString()}
                <span style={{ color: "#666666", fontSize: "16px" }}>
                  {" "}/ ${userStats.monthlyGoal.toLocaleString()}
                </span>
              </p>
            </div>
            <span
              style={{
                color: "#00FF87",
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
              }}
            >
              {monthlyProgress}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: "8px",
              backgroundColor: "#222222",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${monthlyProgress}%`,
                backgroundColor: "#00FF87",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Transaction history */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #222222",
            }}
          >
            <p
              style={{
                color: "#666666",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: "600",
              }}
            >
              Transaction History
            </p>
          </div>

          {transactions.map((transaction, index) => {
            const style = getTransactionStyle(transaction.type);
            return (
              <div
                key={transaction.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  borderBottom:
                    index < transactions.length - 1
                      ? "1px solid #222222"
                      : "none",
                }}
              >
                {/* Transaction details */}
                <div>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {transaction.description}
                  </p>
                  <p style={{ color: "#666666", fontSize: "12px" }}>
                    {getTransactionLabel(transaction.type)} · {transaction.date}
                  </p>
                </div>

                {/* Amount */}
                <span
                  style={{
                    color: style.color,
                    fontSize: "18px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {style.prefix}{Math.abs(transaction.amount).toLocaleString()} TKNS
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN -- withdraw panel */}
      <div>
        <div
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
              justifyContent: "space-between",
              alignItems: "center",
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
              Withdraw Funds
            </p>
            <span style={{ color: "#666666", fontSize: "18px", cursor: "pointer" }}>
              ⓘ
            </span>
          </div>

          {/* Currency selector */}
          <p
            style={{
              color: "#666666",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            Select Currency
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {(["USD", "EUR", "GBP"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                style={{
                  flex: 1,
                  backgroundColor: currency === c ? "#00FF87" : "transparent",
                  color: currency === c ? "#0A0A0A" : "#666666",
                  border: currency === c ? "1px solid #00FF87" : "1px solid #333333",
                  borderRadius: "6px",
                  padding: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Amount input */}
          <p
            style={{
              color: "#666666",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            Amount to Withdraw
          </p>
          <div
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #333333",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) =>
                  setWithdrawAmount(Math.max(0, parseInt(e.target.value) || 0))
                }
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "Barlow Condensed, sans-serif",
                  width: "100px",
                  outline: "none",
                }}
              />
              <span style={{ color: "#666666", fontSize: "14px" }}>TOKENS</span>
            </div>
            <span style={{ color: "#AAAAAA", fontSize: "14px", fontWeight: "600" }}>
              = {currencySymbols[currency]}{realWorldValue} {currency}
            </span>
          </div>

          {/* Min/max info */}
          <p style={{ color: "#666666", fontSize: "11px", marginBottom: "20px" }}>
            Min: 100 TKNS · Max: {userStats.tokenBalance.toLocaleString()} TKNS
          </p>

          {/* Confirm withdrawal button */}
          <button
            style={{
              width: "100%",
              backgroundColor: "#00FF87",
              color: "#0A0A0A",
              fontWeight: "700",
              fontSize: "16px",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}