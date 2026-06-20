// SubwayMap — renders sorted events as a transit map.
// X = time-order index, Y = per-line lane, bezier connections colored by the
// arriving line, circle stations / diamond interchanges (time conflicts).

export const LINE_HEX = {
  red: "#FF5A5F",
  blue: "#3D8BFF",
  lime: "#9EE34F",
  yellow: "#FFC94D",
  purple: "#B47CFF",
};

export const LINES = [
  { key: "red", name: "운동" },
  { key: "blue", name: "업무" },
  { key: "lime", name: "공부" },
  { key: "yellow", name: "약속" },
  { key: "purple", name: "휴식" },
];

const COL_W = 132;
const PAD_X = 76;
const LANE_GAP = 60;
const HEIGHT = 380;
const truncate = (s, n) => (s.length > n ? s.slice(0, n) + "…" : s);

export function SubwayMap({ events = [], showHourGrid = false }) {
  const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

  const laneOrder = [];
  sorted.forEach((e) => {
    if (!laneOrder.includes(e.line)) laneOrder.push(e.line);
  });
  const midY = HEIGHT / 2;
  const laneY = (line) => {
    const i = laneOrder.indexOf(line);
    const n = laneOrder.length;
    return midY + (i - (n - 1) / 2) * LANE_GAP;
  };

  const timeMap = {};
  sorted.forEach((e) => {
    (timeMap[e.time] = timeMap[e.time] || new Set()).add(e.line);
  });
  const isInterchange = (e) => timeMap[e.time] && timeMap[e.time].size > 1;

  const x = (i) => PAD_X + i * COL_W;
  const width = Math.max(sorted.length * COL_W + PAD_X, 680);

  if (sorted.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: HEIGHT, width: "100%" }}>
        <div style={{ textAlign: "center", maxWidth: 320, padding: "0 24px" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--fg-2)", marginBottom: 6 }}>아직 역이 없습니다</div>
          <div style={{ fontSize: 13, color: "var(--fg-3)" }}>
            왼쪽에서 시간·제목을 입력하거나 <b style={{ color: "var(--fg-2)" }}>예시 채우기</b>를 눌러보세요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} style={{ display: "block" }}>
        {showHourGrid &&
          sorted.map((e, i) => (
            <line key={"g" + i} x1={x(i)} y1={28} x2={x(i)} y2={HEIGHT - 28} stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          ))}
        {sorted.slice(1).map((e, i) => {
          const x0 = x(i);
          const x1 = x(i + 1);
          const y0 = laneY(sorted[i].line);
          const y1 = laneY(e.line);
          const cx = (x0 + x1) / 2;
          return (
            <path
              key={"p" + i}
              d={`M ${x0} ${y0} C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`}
              stroke={LINE_HEX[e.line]}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
          );
        })}
        {sorted.map((e, i) => {
          const cx = x(i);
          const cy = laneY(e.line);
          const above = i % 2 === 0;
          const labelY = above ? cy - 24 : cy + 24;
          const inter = isInterchange(e);
          return (
            <g key={"s" + i}>
              {inter ? (
                <rect
                  x={cx - 9}
                  y={cy - 9}
                  width="18"
                  height="18"
                  rx="4"
                  transform={`rotate(45 ${cx} ${cy})`}
                  fill="#11161D"
                  stroke="#E9EFF6"
                  strokeWidth="3"
                />
              ) : (
                <circle cx={cx} cy={cy} r="7" fill="#0D1117" stroke={LINE_HEX[e.line]} strokeWidth="4" />
              )}
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, fill: "var(--fg-1)" }}
              >
                {truncate(e.title, 7)}
              </text>
              <text
                x={cx}
                y={above ? labelY - 16 : labelY + 16}
                textAnchor="middle"
                style={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: inter ? "#E9EFF6" : "var(--fg-3)", letterSpacing: "0.03em" }}
              >
                {e.time}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
