# Schedule Subway Map — 하루를 노선도로

깃 챌린지 AI 해커톤 출품작. 하루 일정을 지하철 노선도처럼 시각화한다.

- **역** = 일정 (시간 + 제목)
- **노선** = 카테고리 (운동·업무·공부·약속·휴식, 5색)
- **환승역(다이아)** = 같은 시각에 겹치는 일정 = 충돌

claude.ai/design 핸드오프(HTML/CSS/JS 프로토타입)를 **Vite + React** 실제 앱으로 구현한 결과물.

## 실행

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # dist/ 정적 빌드
```

## 화면

- `/` — 마케팅 랜딩 (히어로 + 라이브 맵 프리뷰 + 3 메타포 카드 + CTA)
- `#/app` — 스케줄러 (입력 패널 · 노선 피커 · 일정 목록 · 노선도 캔버스 · 레전드)

CTA / 룬델 로고 클릭으로 두 화면을 오간다 (의존성 없는 해시 라우터).

## 구조

```
src/
  styles/        디자인 토큰 (colors·typography·spacing·effects·fonts) + 글로벌 base
  components/
    core/        Button · IconButton · Input · Card · Badge
    transit/     Roundel · LineButton · LegendItem · StreakBadge · StationMarker
  app/           SubwayMap (SVG 렌더러) · InputPanel · ScheduleApp
  marketing/     Landing
  lib/Icon.jsx   lucide-react 래퍼 (핸드오프의 Lucide UMD 헬퍼 대체)
```

핸드오프의 DS 컴포넌트(core·transit)는 이미 `import/export` 기반이라 그대로 이식했고,
`window` 전역으로 작성됐던 UI 키트(SubwayMap·InputPanel·ScheduleApp·Landing)만 ES 모듈로 변환했다.
디자인 토큰은 CSS 변수 그대로 유지 — 시각 산출물은 1:1.

## 스택

React 18 · Vite 5 · lucide-react · Pretendard / JetBrains Mono (CDN)
