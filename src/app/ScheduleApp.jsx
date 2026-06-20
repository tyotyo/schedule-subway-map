// ScheduleApp — top-level Schedule Subway Map interface: state (events,
// add/delete/sample/clear), top bar, map header with stat badges, legend,
// presentation-mode + hour-grid toggles.
import { useState } from "react";
import { Roundel } from "../components/transit/Roundel.jsx";
import { Button } from "../components/core/Button.jsx";
import { IconButton } from "../components/core/IconButton.jsx";
import { Badge } from "../components/core/Badge.jsx";
import { Card } from "../components/core/Card.jsx";
import { LegendItem } from "../components/transit/LegendItem.jsx";
import { StreakBadge } from "../components/transit/StreakBadge.jsx";
import { Icon } from "../lib/Icon.jsx";
import { GitMark } from "../components/brand/GitMark.jsx";
import { InputPanel } from "./InputPanel.jsx";
import { SubwayMap, LINES } from "./SubwayMap.jsx";

let _id = 100;
const uid = () => ++_id;

const SAMPLE = [
  { time: "08:00", title: "기상 스트레칭", line: "red" },
  { time: "09:30", title: "팀 스탠드업", line: "blue" },
  { time: "11:00", title: "알고리즘 공부", line: "lime" },
  { time: "13:00", title: "점심 약속", line: "yellow" },
  { time: "13:00", title: "코드 리뷰", line: "blue" },
  { time: "15:30", title: "딥워크 세션", line: "blue" },
  { time: "18:00", title: "헬스장", line: "red" },
  { time: "21:00", title: "독서", line: "purple" },
].map((e) => ({ ...e, id: uid() }));

const topbar = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: "var(--header-height)",
  padding: "0 20px",
  borderBottom: "1px solid var(--border-1)",
  background: "var(--ground-1)",
  position: "sticky",
  top: 0,
  zIndex: 10,
};
const mapHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 12,
  padding: "16px 20px",
};
const legendBar = { display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", padding: "14px 20px" };
const gitChip = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  marginLeft: 10,
  padding: "4px 10px",
  background: "var(--git-pink-soft)",
  color: "var(--git-pink)",
  border: "1px solid var(--git-pink)",
  borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.04em",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

export function ScheduleApp({ onHome }) {
  const [events, setEvents] = useState(SAMPLE);
  const [time, setTime] = useState("14:00");
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("blue");
  const [present, setPresent] = useState(false);
  const [hourGrid, setHourGrid] = useState(false);

  const addStation = () => {
    if (!title.trim() || !time) return;
    setEvents((ev) => [...ev, { id: uid(), time, title: title.trim(), line }]);
    setTitle("");
  };
  const deleteStation = (id) => setEvents((ev) => ev.filter((e) => e.id !== id));
  const sampleFill = () => setEvents(SAMPLE.map((e) => ({ ...e, id: uid() })));
  const clearAll = () => setEvents([]);

  // legend / stat data
  const usedLines = LINES.filter((l) => events.some((e) => e.line === l.key));
  const timeMap = {};
  events.forEach((e) => {
    (timeMap[e.time] = timeMap[e.time] || new Set()).add(e.line);
  });
  const interchanges = Object.values(timeMap).filter((s) => s.size > 1).length;
  const countFor = (k) => events.filter((e) => e.line === k).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ground-1)", color: "var(--fg-1)", fontFamily: "var(--font-sans)" }}>
      {/* ── Top bar ── */}
      <header style={topbar}>
        <span
          onClick={onHome}
          style={{ display: "inline-flex", cursor: onHome ? "pointer" : "default" }}
          title="홈으로"
        >
          <Roundel size={30} withWordmark sub="" wordmark="Subway Map" />
        </span>
        <span style={gitChip} title="git 직장인 개발자 모임 커뮤니티에서 쓰는 도구">
          <GitMark size={11} color="var(--git-pink)" />
          <span style={{ fontWeight: 600 }}>git</span>
          <span style={{ opacity: 0.8 }}>커뮤니티</span>
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconButton label="정시 그리드" variant={hourGrid ? "surface" : "ghost"} onClick={() => setHourGrid((v) => !v)}>
            <Icon name="grid-3x3" size={16} />
          </IconButton>
          <IconButton label={present ? "패널 보이기" : "발표 모드"} variant="ghost" onClick={() => setPresent((v) => !v)}>
            <Icon name={present ? "panel-left-open" : "maximize"} size={16} />
          </IconButton>
          <Button variant="secondary" size="sm" leftIcon={<Icon name="download" size={14} />}>
            내보내기
          </Button>
        </div>
      </header>

      {/* ── Body ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: present ? "1fr" : "var(--panel-width) 1fr",
          gap: 20,
          padding: 20,
          alignItems: "start",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {!present && (
          <div style={{ position: "sticky", top: 20 }}>
            <InputPanel
              time={time}
              setTime={setTime}
              title={title}
              setTitle={setTitle}
              line={line}
              setLine={setLine}
              onAdd={addStation}
              onSample={sampleFill}
              onClear={clearAll}
              onDelete={deleteStation}
              events={events}
            />
          </div>
        )}

        {/* Map output */}
        <Card padded={false} style={{ overflow: "hidden" }}>
          <div style={mapHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>오늘의 노선도</div>
              <Badge tone="accent" dot>
                2026 · 06 · 20
              </Badge>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <StreakBadge value={events.length} label="역" tone="accent" />
              <StreakBadge value={usedLines.length} label="노선" tone="success" />
              {interchanges > 0 && <StreakBadge value={interchanges} label="환승" tone="danger" />}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--ground-2)",
              backgroundImage: "var(--canvas-grid)",
              borderTop: "1px solid var(--border-1)",
              borderBottom: "1px solid var(--border-1)",
            }}
          >
            <SubwayMap events={events} showHourGrid={hourGrid} />
          </div>

          {/* legend */}
          <div style={legendBar}>
            {usedLines.map((l) => (
              <LegendItem key={l.key} line={l.key} name={l.name} count={countFor(l.key) + " 역"} />
            ))}
            {interchanges > 0 && <LegendItem interchange />}
            {usedLines.length === 0 && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>노선이 여기에 표시됩니다</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
