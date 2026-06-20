import React from "react";

/**
 * Card — surface container for panels, schedule lists, legends, stats.
 * Dark elevated ground with hairline border. `padded` toggles inner space;
 * `interactive` adds hover lift.
 */
export function Card({
  padded = true,
  interactive = false,
  elevation = 2,
  style = {},
  children,
  ...rest
}) {
  const shadows = { 0: "var(--shadow-0)", 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)" };
  return (
    <div
      style={{
        background: "var(--ground-3)",
        border: "1px solid var(--border-1)",
        borderRadius: "var(--radius-md)",
        boxShadow: `${shadows[elevation] || shadows[2]}, var(--inset-hairline)`,
        padding: padded ? "var(--space-5)" : 0,
        transition: "var(--transition-base)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-3), var(--inset-hairline)";
      }}
      onMouseLeave={(e) => {
        if (!interactive) return;
        e.currentTarget.style.borderColor = "var(--border-1)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = `${shadows[elevation] || shadows[2]}, var(--inset-hairline)`;
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
