import React from "react";

/**
 * StreakBadge — gamified stat chip. A mono number + label in a soft-tinted
 * pill; tone defaults to success (streak / on-track) but accepts any
 * semantic tone. Optional leading icon node.
 */
export function StreakBadge({
  value,
  label,
  tone = "success",
  icon = null,
  size = "md",
  style = {},
  ...rest
}) {
  const tones = {
    success: ["var(--success)", "var(--success-soft)"],
    accent: ["var(--accent-hover)", "var(--accent-soft)"],
    warning: ["var(--warning)", "var(--warning-soft)"],
    danger: ["var(--danger)", "var(--danger-soft)"],
  };
  const [fg, bg] = tones[tone] || tones.success;
  const big = size === "lg";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: big ? 10 : 8,
        padding: big ? "10px 16px" : "7px 12px",
        background: bg,
        border: `1px solid ${fg}`,
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex", color: fg, flexShrink: 0 }}>{icon}</span> : null}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--w-bold)",
        fontSize: big ? "var(--text-h4)" : "var(--text-base)",
        letterSpacing: "var(--tracking-tight)",
        color: fg,
        lineHeight: 1,
      }}>{value}</span>
      {label ? (
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-2xs)",
          fontWeight: "var(--w-medium)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: fg,
          opacity: 0.85,
        }}>{label}</span>
      ) : null}
    </span>
  );
}
