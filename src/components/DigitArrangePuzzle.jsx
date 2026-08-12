import { useEffect, useMemo, useState } from "react";

// Interactive digit-arrangement puzzle: click digit chips to fill blanks
// left-to-right, click a filled blank to return that digit to the pool.
export default function DigitArrangePuzzle({ digits, divisor, blanks, check, onSolved, solved }) {
  const pool = useMemo(
    () => digits.map((value, i) => ({ id: `${value}-${i}`, value })),
    [digits]
  );
  const [placedIds, setPlacedIds] = useState(Array(blanks).fill(null));

  const usedIds = new Set(placedIds.filter(Boolean));
  const availableChips = pool.filter((chip) => !usedIds.has(chip.id));

  const placeDigit = (chip) => {
    const nextEmpty = placedIds.findIndex((id) => id === null);
    if (nextEmpty === -1) return;
    const next = [...placedIds];
    next[nextEmpty] = chip.id;
    setPlacedIds(next);
  };

  const clearBlank = (index) => {
    if (solved) return;
    const next = [...placedIds];
    next[index] = null;
    setPlacedIds(next);
  };

  const isComplete = placedIds.every(Boolean);
  const numberValue = isComplete
    ? Number(placedIds.map((id) => pool.find((c) => c.id === id).value).join(""))
    : null;
  const quotient = isComplete ? numberValue / divisor : null;
  const isValid = isComplete && check(numberValue);

  useEffect(() => {
    if (isValid && !solved) onSolved?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  return (
    <div className="ba-digit-puzzle">
      <div className="ba-digit-puzzle__row">
        {placedIds.map((id, i) => {
          const chip = id ? pool.find((c) => c.id === id) : null;
          return (
            <button
              key={i}
              className={"ba-digit-blank" + (chip ? " ba-digit-blank--filled" : "")}
              onClick={() => clearBlank(i)}
              disabled={!chip || solved}
            >
              {chip ? chip.value : ""}
            </button>
          );
        })}
        <span className="ba-digit-puzzle__op">÷ {divisor} = {isComplete ? quotient : "?"}</span>
      </div>

      <div className="ba-digit-puzzle__pool">
        {availableChips.map((chip) => (
          <button
            key={chip.id}
            className="ba-digit-chip"
            onClick={() => placeDigit(chip)}
            disabled={solved}
          >
            {chip.value}
          </button>
        ))}
        {availableChips.length === 0 && !isValid && (
          <button className="ba-btn ba-btn--sm ba-btn--ghost" onClick={() => setPlacedIds(Array(blanks).fill(null))}>
            Reset digits
          </button>
        )}
      </div>

      {isComplete && (
        <p className={"ba-digit-puzzle__feedback" + (isValid ? " ba-digit-puzzle__feedback--good" : " ba-digit-puzzle__feedback--bad")}>
          {isValid ? "✓ That works!" : "Not quite yet — try another arrangement."}
        </p>
      )}
    </div>
  );
}
