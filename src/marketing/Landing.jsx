// Landing — marketing page: sticky blurred nav, two-column hero (copy + framed
// live map preview), the 3 metaphor feature cards (역 / 노선 / 환승), a CTA
// band, and footer.
import { Roundel } from "../components/transit/Roundel.jsx";
import { Button } from "../components/core/Button.jsx";
import { Badge } from "../components/core/Badge.jsx";
import { Card } from "../components/core/Card.jsx";
import { StreakBadge } from "../components/transit/StreakBadge.jsx";
import { LegendItem } from "../components/transit/LegendItem.jsx";
import { Icon } from "../lib/Icon.jsx";
import { SubwayMap } from "../app/SubwayMap.jsx";

const DEMO = [
  { id: 1, time: "08:30", title: "모닝 러닝", line: "red" },
  { id: 2, time: "10:00", title: "스프린트 회의", line: "blue" },
  { id: 3, time: "12:30", title: "점심 약속", line: "yellow" },
  { id: 4, time: "12:30", title: "긴급 패치", line: "blue" },
  { id: 5, time: "15:00", title: "AI 모델 학습", line: "lime" },
  { id: 6, time: "19:00", title: "저녁 산책", line: "purple" },
];

function MarkerGlyph({ kind, color }) {
  if (kind === "diamond") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24">
        <rect x="5" y="5" width="14" height="14" rx="3.5" transform="rotate(45 12 12)" fill="#11161D" stroke="#E9EFF6" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="7" fill="#0D1117" stroke={color} strokeWidth="4" />
    </svg>
  );
}

function Feature({ kind, color, eyebrow, title, body }) {
  return (
    <Card interactive style={{ flex: 1, minWidth: 220 }}>
      <MarkerGlyph kind={kind} color={color} />
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 14 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: 19, fontWeight: 700, margin: "6px 0 8px" }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" }}>{body}</div>
    </Card>
  );
}

const nav = {
  display: "flex",
  alignItems: "center",
  height: 64,
  padding: "0 32px",
  borderBottom: "1px solid var(--border-1)",
  position: "sticky",
  top: 0,
  background: "rgba(13,17,23,0.82)",
  backdropFilter: "var(--blur-panel)",
  WebkitBackdropFilter: "var(--blur-panel)",
  zIndex: 20,
};
const navLink = { fontSize: 14, color: "var(--fg-2)", textDecoration: "none", fontWeight: 500 };

export function Landing({ onLaunch }) {
  return (
    <div style={{ background: "var(--ground-1)", color: "var(--fg-1)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      {/* Nav */}
      <header style={nav}>
        <Roundel size={30} withWordmark sub="" />
        <div style={{ flex: 1 }} />
        <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <a style={navLink} href="#features">기능</a>
          <a style={navLink} href="#how">사용법</a>
          <a style={navLink} href="#challenge">깃 챌린지</a>
          <Button variant="primary" size="sm" rightIcon={<Icon name="arrow-right" size={14} />} onClick={onLaunch}>
            지금 그리기
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px 40px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <Badge tone="accent" dot>
            깃 챌린지 · AI 해커톤 제출작
          </Badge>
          <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "20px 0 18px" }}>
            하루를
            <br />
            노선도로.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: 440, margin: "0 0 28px" }}>
            일정은 <b style={{ color: "var(--fg-1)" }}>역</b>, 시간은 <b style={{ color: "var(--fg-1)" }}>노선의 흐름</b>, 겹치는 약속은{" "}
            <b style={{ color: "var(--fg-1)" }}>환승역</b>으로. 지하철 노선도처럼 하루를 한눈에 읽어보세요.
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
            <Button variant="primary" size="lg" leftIcon={<Icon name="map" size={18} />} onClick={onLaunch}>
              노선도 그리기
            </Button>
            <Button variant="secondary" size="lg" leftIcon={<Icon name="play" size={16} />} onClick={onLaunch}>
              데모 보기
            </Button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <StreakBadge value="8" label="역" tone="accent" />
            <StreakBadge value="5" label="노선" tone="success" />
            <StreakBadge value="1" label="환승" tone="danger" />
          </div>
        </div>

        {/* Map preview */}
        <Card padded={false} elevation={3} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border-1)" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--danger)" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--warning)" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--success)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", marginLeft: 8, letterSpacing: "0.06em" }}>today.map</span>
          </div>
          <div style={{ backgroundColor: "var(--ground-2)", backgroundImage: "var(--canvas-grid)" }}>
            <SubwayMap events={DEMO} />
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "12px 16px", borderTop: "1px solid var(--border-1)" }}>
            <LegendItem line="blue" name="업무" />
            <LegendItem line="red" name="운동" />
            <LegendItem interchange />
          </div>
        </Card>
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-hover)", marginBottom: 10 }}>
          3가지 메타포
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 28px" }}>익숙한 노선도 문법으로 일정을 읽다</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Feature kind="circle" color="#3D8BFF" eyebrow="Station" title="역 = 일정" body="시간과 제목을 입력하면 하나의 역이 추가됩니다. 시간순으로 자동 정렬돼 흐름이 만들어져요." />
          <Feature kind="line" color="#9EE34F" eyebrow="Line" title="노선 = 카테고리" body="운동·업무·공부·약속·휴식. 색으로 구분된 5개 노선이 하루의 결을 보여줍니다." />
          <Feature kind="diamond" color="#E9EFF6" eyebrow="Interchange" title="환승역 = 충돌" body="같은 시각에 둘 이상의 일정이 겹치면 환승역 다이아로 표시 — 충돌을 한눈에." />
        </div>
      </section>

      {/* CTA band */}
      <section id="challenge" style={{ maxWidth: 1200, margin: "0 auto 64px", padding: "0 32px" }}>
        <Card style={{ background: "linear-gradient(120deg, var(--ground-3), var(--ground-4))", textAlign: "center", padding: "44px 24px" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px" }}>오늘 하루, 어떤 노선도가 될까요?</h2>
          <p style={{ fontSize: 15, color: "var(--fg-2)", margin: "0 0 22px" }}>설치 없이 브라우저에서 바로. 깃 챌린지 AI 해커톤 출품작.</p>
          <Button variant="primary" size="lg" leftIcon={<Icon name="map" size={18} />} onClick={onLaunch}>
            노선도 그리기
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-1)", padding: "26px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Roundel size={24} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>Schedule Subway Map · 깃 챌린지</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-4)" }}>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
