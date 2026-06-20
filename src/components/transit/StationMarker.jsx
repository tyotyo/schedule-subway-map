import React from "react";

/**
 * StationMarker — a single stop on the map. Normal stations are circles
 * stroked in their line color; interchanges (a time conflict between two
 * lines) are the signature 45° rounded-diamond with a white stroke.
 */
export function StationMarker({
  line = "blue",
  interchange = false,
  active = false,
  size = 18,
  style = {},
  ...rest
}) {
  const colors = {
    red: "var(--line-red)", blue: "var(--line-blue)", lime: "var(--line-lime)",
    yellow: "var(--line-yellow)", purple: "var(--line-purple)",
  };
  const glows = {
    red: "var(--glow-red)", blue: "var(--glow-blue)", lime: "var(--glow-lime)",
    yellow: "var(--glow-yellow)", purple: "var(--glow-purple)",
  };
  const c = colors[line] || colors.blue;
  const box = size + 6;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: box,
        height: box,
        borderRadius: interchange ? "var(--radius-xs)" : "var(--radius-pill)",
        boxShadow: active ? (interchange ? "var(--ring)" : glows[line]) : "none",
        transition: "var(--transition-base)",
        ...style,
      }}
      {...rest}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        {interchange ? (
          <rect
            x="5" y="5" width="14" height="14" rx="3.5"
            transform="rotate(45 12 12)"
            fill="var(--interchange-fill)"
            stroke="var(--interchange-stroke)"
            strokeWidth="3"
          />
        ) : (
          <circle
            cx="12" cy="12" r="7"
            fill="var(--ground-1)"
            stroke={c}
            strokeWidth="4"
          />
        )}
      </svg>
    </span>
  );
}
