import React from "react";

/**
 * IconButton — square icon-only control. Used for list-row delete (✕),
 * toolbar toggles, and compact actions. Pass a Lucide/SVG node as children.
 */
export function IconButton({
  size = "md",
  variant = "ghost",
  label,
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const dims = { sm: 28, md: 34, lg: 40 };
  const d = dims[size] || dims.md;

  const variants = {
    ghost: { background: "transparent", color: "var(--fg-3)", border: "1px solid transparent" },
    surface: { background: "var(--ground-4)", color: "var(--fg-2)", border: "1px solid var(--border-1)" },
    danger: { background: "transparent", color: "var(--fg-3)", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: d,
        height: d,
        flexShrink: 0,
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "var(--transition-base)",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "danger") { e.currentTarget.style.background = "var(--danger-soft)"; e.currentTarget.style.color = "var(--danger)"; }
        else { e.currentTarget.style.background = "var(--ground-5)"; e.currentTarget.style.color = "var(--fg-1)"; }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = v.background;
        e.currentTarget.style.color = v.color;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
