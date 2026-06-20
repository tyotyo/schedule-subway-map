import React from "react";

/**
 * LegendItem — one row of the map legend. Shows a short line segment with a
 * station marker and the category name. Set `interchange` to render the
 * diamond key that explains conflict markers.
 */
export function LegendItem({
  line = "blue",
  name,
  interchange = false,
  count = null,
  style = {},
  ...rest
}) {
  const colors = {
    red: "var(--line-red)", blue: "var(--line-blue)", lime: "var(--line-lime)",
    yellow: "var(--line-yellow)", purple: "var(--line-purple)",
  };
  const c = colors[line] || colors.blue;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 4px",
        ...style,
      }}
      {...rest}
    >
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", width: 34, flexShrink: 0 }}>
        {!interchange ? (
          <span style={{ width: 34, height: 6, borderRadius: 3, background: c }} />
        ) : (
          <span style={{ width: 34, height: 6, borderRadius: 3, background: "linear-gradient(90deg, var(--line-blue), var(--line-red))" }} />
        )}
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} aria-hidden="true">
          {interchange ? (
            <rect x="5" y="5" width="14" height="14" rx="3.5" transform="rotate(45 12 12)" fill="var(--interchange-fill)" stroke="var(--interchange-stroke)" strokeWidth="3" />
          ) : (
            <circle cx="12" cy="12" r="7" fill="var(--ground-1)" stroke={c} strokeWidth="4" />
          )}
        </svg>
      </span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--w-medium)", color: "var(--fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {interchange ? (name || "환승역 · 일정 충돌") : name}
      </span>
      {count != null ? (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-wide)", color: "var(--fg-3)" }}>{count}</span>
      ) : null}
    </div>
  );
}
