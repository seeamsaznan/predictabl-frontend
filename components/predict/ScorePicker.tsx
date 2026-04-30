// components/predict/ScorePicker.tsx
// This is the score picker component used on the predict page.
// It displays two score inputs -- one for each team -- with
// plus and minus buttons to adjust the predicted score.
// It receives the current scores and callback functions as props
// so the parent page controls the actual score values.
// This pattern is called "controlled component" -- the component
// displays values it receives and reports changes upward rather
// than managing the values itself.
//
// The step and max props let the parent customize behavior per sport:
//   - Soccer match: step=1, max=10 (small numbers, fine adjustments)
//   - Test cricket match: step=5, max=800 (big numbers, coarser steps)

type ScorePickerProps = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  onHomeScoreChange: (score: number) => void;
  onAwayScoreChange: (score: number) => void;
  // How much each + or - click changes the score. Defaults to 1 for backward
  // compatibility, but should be passed explicitly for sports where bigger
  // increments make sense (e.g. cricket Test).
  step?: number;
  // Upper bound on the score. Prevents absurd values. Defaults to a generous
  // value if not provided.
  max?: number;
  // Lower bound on the score. Defaults to 0 -- you cannot score negative.
  min?: number;
};

function ScoreRow({
  teamName,
  score,
  color,
  step,
  min,
  max,
  onIncrement,
  onDecrement,
}: {
  teamName: string;
  score: number;
  color: string;
  step: number;
  min: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  // Determine if the buttons should be disabled at the current value.
  const canDecrement = score - step >= min;
  const canIncrement = score + step <= max;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1A1A1A",
        borderRadius: "8px",
        padding: "16px 20px",
        marginBottom: "12px",
      }}
    >
      {/* Team name with colored dot indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "#AAAAAA",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: "600",
          }}
        >
          {teamName}
        </span>
      </div>

      {/* Score controls -- minus, score value, plus */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Minus button */}
        <button
          onClick={onDecrement}
          disabled={!canDecrement}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#222222",
            border: "1px solid #333333",
            color: !canDecrement ? "#444444" : "#AAAAAA",
            fontSize: "18px",
            cursor: !canDecrement ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "300",
            lineHeight: 1,
          }}
        >
          −
        </button>

        {/* The actual score value */}
        <span
          style={{
            color: color,
            fontSize: "32px",
            fontWeight: "700",
            fontFamily: "Barlow Condensed, sans-serif",
            minWidth: "48px",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          {score}
        </span>

        {/* Plus button */}
        <button
          onClick={onIncrement}
          disabled={!canIncrement}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#222222",
            border: "1px solid #333333",
            color: !canIncrement ? "#444444" : "#AAAAAA",
            fontSize: "18px",
            cursor: !canIncrement ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "300",
            lineHeight: 1,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function ScorePicker({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  onHomeScoreChange,
  onAwayScoreChange,
  step = 1,
  max = 999,
  min = 0,
}: ScorePickerProps) {
  return (
    <div>
      {/* Home team score row -- white dot */}
      <ScoreRow
        teamName={homeTeam}
        score={homeScore}
        color="#FFFFFF"
        step={step}
        min={min}
        max={max}
        onIncrement={() => onHomeScoreChange(Math.min(max, homeScore + step))}
        onDecrement={() => onHomeScoreChange(Math.max(min, homeScore - step))}
      />

      {/* Away team score row -- green dot */}
      <ScoreRow
        teamName={awayTeam}
        score={awayScore}
        color="#00FF87"
        step={step}
        min={min}
        max={max}
        onIncrement={() => onAwayScoreChange(Math.min(max, awayScore + step))}
        onDecrement={() => onAwayScoreChange(Math.max(min, awayScore - step))}
      />
    </div>
  );
}