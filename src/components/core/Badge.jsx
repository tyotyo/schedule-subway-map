import React from "react";

/**
 * Badge — compact status / category pill. Use `tone` for semantic colors or
 * `line` for the categorical transit palette. `dot` prepends a small marker.
 */
export function Badge({
  tone = "neutral",
  line = null,
  dot = false,
  size = "md",
  style = {},
  children,
  ...rest
}) {
  const lineColors = {
    red: "var(--line-red)", blue: "var(--line-blue)", lime: "var(--line-lime)",
    yellow: "var(--line-yellow)", purple: "var(--line-purple)",
  };
  const lineSoft = {
    red: "var(--line-red-soft)", blue: "var(--line-blue-soft)", lime: "var(--line-lime-soft)",
    yellow: "var(--line-yellow-soft)", purple: "var(--line-purple-soft)",
  };

  let bg, fg, bd;
  if (line) {
    fg = lineColors[line]; bg = lineSoft[line]; bd = "transparent";
  } else {
    const tones = {
      neutral: ["var(--ground-4)", "var(--fg-2)", "var(--border-1)"],
      accent: ["var(--accent-soft)", "var(--accent-hover)", "transparent"],
      success: ["var(--success-soft)", "var(--success)", "transparent"],
      warning: ["var(--warning-soft)", "var(--warning)", "transparent"],
      danger: ["var(--danger-soft)", "var(--danger)", "transparent"],
    };
    [bg, fg, bd] = tones[tone] || tones.neutral;
  }

  const sz = size === "sm"
    ? { padding: "2px 8px", font: "var(--text-2xs)", gap: 5, dotSize: 6 }
    : { padding: "4px 10px", font: "var(--text-xs)", gap: 6, dotSize: 7 };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sz.gap,
        padding: sz.padding,
        background: bg,
        color: fg,
        border: `1px solid ${bd}`,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-mono)",
        fontSize: sz.font,
        fontWeight: "var(--w-medium)",
        letterSpacing: "var(--tracking-wide)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span style={{ width: sz.dotSize, height: sz.dotSize, borderRadius: "50%", background: fg, flexShrink: 0 }} />
      ) : null}
      {children}
    </span>
  );
}
