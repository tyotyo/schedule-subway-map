import React from "react";

/**
 * Roundel — the Schedule Subway Map brand mark: transit ring + bar with the
 * signature interchange diamond at center. Optionally locks up with the
 * wordmark. Color follows the accent (main line) by default.
 */
export function Roundel({
  size = 40,
  color = "var(--accent)",
  withWordmark = false,
  wordmark = "Subway Map",
  sub = "SCHEDULE · 노선도",
  style = {},
  ...rest
}) {
  const mark = (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Schedule Subway Map" role="img" style={{ flexShrink: 0 }}>
      <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="11" />
      <rect x="2" y="43" width="96" height="14" rx="3" fill={color} />
      <rect x="40.5" y="40.5" width="19" height="19" rx="4" transform="rotate(45 50 50)" fill="var(--ground-1)" stroke="var(--fg-1)" strokeWidth="3" />
    </svg>
  );

  if (!withWordmark) return <span style={{ display: "inline-flex", ...style }} {...rest}>{mark}</span>;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32, ...style }} {...rest}>
      {mark}
      <span style={{ display: "flex", flexDirection: "column", gap: 2, lineHeight: 1 }}>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--w-extrabold)",
          fontSize: size * 0.62,
          letterSpacing: "var(--tracking-tight)",
          color: "var(--fg-1)",
        }}>{wordmark}</span>
        {sub ? (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: Math.max(9, size * 0.27),
            fontWeight: "var(--w-medium)",
            letterSpacing: "var(--tracking-label)",
            color: "var(--fg-3)",
          }}>{sub}</span>
        ) : null}
      </span>
    </span>
  );
}
