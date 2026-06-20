import React from "react";

/**
 * LineButton — circular line/category selector. Signature input control:
 * a filled colored dot that gains a ring + glow when selected. Pass the
 * line key; optionally render a label beneath.
 */
export function LineButton({
  line = "blue",
  selected = false,
  size = 34,
  label = null,
  onClick,
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

  const dot = (
    <button
      type="button"
      aria-label={label || line}
      aria-pressed={selected}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        background: c,
        border: `2px solid ${selected ? "var(--fg-1)" : "transparent"}`,
        boxShadow: selected ? glows[line] : "var(--shadow-1)",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        transition: "var(--transition-base)",
        transform: selected ? "scale(1.06)" : "scale(1)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.transform = "scale(1.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = selected ? "scale(1.06)" : "scale(1)"; }}
      {...rest}
    />
  );

  if (!label) return dot;
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {dot}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-2xs)",
        letterSpacing: "var(--tracking-wide)",
        color: selected ? "var(--fg-1)" : "var(--fg-3)",
        transition: "var(--transition-base)",
      }}>{label}</span>
    </span>
  );
}
