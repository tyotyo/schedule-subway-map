import React from "react";

/**
 * Input — text / time field on dark ground. Supports an optional label,
 * leading icon, and mono mode (for time stamps & codes). Focus shows the
 * accent ring.
 */
export function Input({
  type = "text",
  label = null,
  leftIcon = null,
  mono = false,
  fullWidth = true,
  invalid = false,
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${Math.random().toString(36).slice(2, 8)}` : undefined);

  const field = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 40,
        padding: leftIcon ? "0 12px 0 10px" : "0 12px",
        background: "var(--ground-4)",
        border: `1px solid ${invalid ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-1)"}`,
        borderRadius: "var(--radius-sm)",
        boxShadow: focus ? "var(--ring)" : "var(--inset-hairline)",
        transition: "var(--transition-base)",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {leftIcon ? <span style={{ display: "inline-flex", color: "var(--fg-3)", flexShrink: 0 }}>{leftIcon}</span> : null}
      <input
        id={inputId}
        type={type}
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          flex: 1,
          minWidth: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--fg-1)",
          fontFamily: mono || type === "time" ? "var(--font-mono)" : "var(--font-sans)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--w-regular)",
          letterSpacing: mono || type === "time" ? "var(--tracking-wide)" : "normal",
          colorScheme: "dark",
          ...style,
        }}
      />
    </div>
  );

  if (!label) return field;
  return (
    <label htmlFor={inputId} style={{ display: "block" }}>
      <span style={{
        display: "block",
        marginBottom: 6,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-2xs)",
        fontWeight: "var(--w-medium)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: "var(--fg-3)",
      }}>{label}</span>
      {field}
    </label>
  );
}
