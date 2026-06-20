// InputPanel — left input column: time/title fields, line picker, add +
// utility buttons, and the time-sorted schedule list with per-row delete.
import { Button } from "../components/core/Button.jsx";
import { IconButton } from "../components/core/IconButton.jsx";
import { Input } from "../components/core/Input.jsx";
import { Card } from "../components/core/Card.jsx";
import { Badge } from "../components/core/Badge.jsx";
import { LineButton } from "../components/transit/LineButton.jsx";
import { Icon } from "../lib/Icon.jsx";
import { LINES, LINE_HEX } from "./SubwayMap.jsx";

const overline = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--fg-3)",
};
const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: "var(--radius-sm)",
  transition: "background 120ms",
};

export function InputPanel({ time, setTime, title, setTitle, line, setLine, onAdd, onSample, onClear, onDelete, events }) {
  const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div style={overline}>역 추가</div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <div style={{ width: 110, flexShrink: 0 }}>
            <Input type="time" label="시간" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              label="제목"
              placeholder="역 이름…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAdd();
              }}
            />
          </div>
        </div>

        <div style={{ ...overline, marginTop: 18, marginBottom: 12 }}>노선 선택</div>
        <div style={{ display: "flex", gap: 14, justifyContent: "space-between" }}>
          {LINES.map((l) => (
            <LineButton key={l.key} line={l.key} label={l.name} selected={line === l.key} onClick={() => setLine(l.key)} />
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <Button variant="primary" fullWidth leftIcon={<Icon name="plus" size={16} />} onClick={onAdd}>
            역 추가
          </Button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <Button variant="secondary" size="sm" fullWidth leftIcon={<Icon name="shuffle" size={14} />} onClick={onSample}>
            예시 채우기
          </Button>
          <Button variant="ghost" size="sm" fullWidth leftIcon={<Icon name="trash-2" size={14} />} onClick={onClear}>
            전체 지우기
          </Button>
        </div>
      </Card>

      <Card padded={false}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid var(--border-1)",
          }}
        >
          <div style={overline}>일정 목록</div>
          <Badge size="sm">{sorted.length} 역</Badge>
        </div>
        {sorted.length === 0 ? (
          <div style={{ padding: "22px 16px", textAlign: "center", color: "var(--fg-3)", fontSize: 13 }}>추가된 일정이 없습니다.</div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 6, display: "flex", flexDirection: "column", gap: 2 }}>
            {sorted.map((e) => (
              <li
                key={e.id}
                style={rowStyle}
                onMouseEnter={(ev) => (ev.currentTarget.style.background = "var(--ground-4)")}
                onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
              >
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: LINE_HEX[e.line], flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-2)", width: 44, flexShrink: 0 }}>{e.time}</span>
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: 14,
                    color: "var(--fg-1)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.title}
                </span>
                <IconButton label="삭제" size="sm" variant="danger" onClick={() => onDelete(e.id)}>
                  <Icon name="x" size={14} />
                </IconButton>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
