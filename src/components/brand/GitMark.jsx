/**
 * GitMark — the "git" community logo: the Korean syllable 깃 (= git) broken
 * into its three jamo as geometric blocks — ㄱ (giyeok), ㅣ (vertical), ㅅ
 * (rendered as an up-chevron). Colorable; defaults to currentColor so it
 * inherits whatever the surrounding text color is.
 */
export function GitMark({ size = 28, color = "currentColor", title = "git 커뮤니티", style = {} }) {
  const ratio = 128 / 44;
  return (
    <svg
      width={size * ratio}
      height={size}
      viewBox="0 0 128 44"
      fill="none"
      role="img"
      aria-label={title}
      style={{ flexShrink: 0, display: "block", ...style }}
    >
      {/* ㄱ — top bar + right descender */}
      <path d="M7 10 H39 V40" stroke={color} strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter" />
      {/* ㅣ — vertical bar */}
      <rect x="53" y="3.5" width="13" height="36.5" fill={color} />
      {/* ㅅ — up-chevron */}
      <path d="M79 40 L99 10 L119 40" stroke={color} strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}
