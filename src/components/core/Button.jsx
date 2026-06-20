import React from "react";

/**
 * Button — primary action control for Schedule Subway Map.
 * Variants map to the transit palette: solid accent (main line),
 * neutral surface, ghost, and danger (conflict/delete).
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  type = "button",
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: "0 12px", font: "var(--text-sm)", gap: 6, radius: "var(--radius-sm)" },
    md: { height: 40, padding: "0 16px", font: "var(--text-base)", gap: 8, radius: "var(--radius-sm)" },
    lg: { height: 48, padding: "0 22px", font: "var(--text-lg)", gap: 10, radius: "var(--radius-md)" },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--fg-on-accent)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-1)",
    },
    secondary: {
      background: "var(--ground-4)",
      color: "var(--fg-1)",
      border: "1px solid var(--border-1)",
      boxShadow: "var(--inset-hairline)",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-2)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    danger: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      border: "1px solid rgba(255,90,95,0.4)",
      boxShadow: "none",
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: "var(--w-semibold)",
        lineHeight: 1,
        letterSpacing: "var(--tracking-tight)",
        borderRadius: s.radius,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        whiteSpace: "nowrap",
        transition: "var(--transition-base)",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "var(--accent-hover)";
        else if (variant === "secondary") e.currentTarget.style.background = "var(--ground-5)";
        else if (variant === "ghost") { e.currentTarget.style.background = "var(--ground-4)"; e.currentTarget.style.color = "var(--fg-1)"; }
        else if (variant === "danger") e.currentTarget.style.background = "rgba(255,90,95,0.22)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = v.background;
        if (variant === "ghost") e.currentTarget.style.color = "var(--fg-2)";
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px) scale(0.99)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
      {...rest}
    >
      {leftIcon ? <span style={{ display: "inline-flex", flexShrink: 0 }}>{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span style={{ display: "inline-flex", flexShrink: 0 }}>{rightIcon}</span> : null}
    </button>
  );
}
