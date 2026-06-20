import { useEffect, useState } from "react";
import { Landing } from "./marketing/Landing.jsx";
import { ScheduleApp } from "./app/ScheduleApp.jsx";

// Tiny hash router — no dependency. "#/app" → scheduler, anything else → landing.
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export function App() {
  const hash = useHashRoute();
  const go = (to) => {
    window.location.hash = to;
    window.scrollTo(0, 0);
  };

  if (hash.startsWith("#/app")) {
    return <ScheduleApp onHome={() => go("/")} />;
  }
  return <Landing onLaunch={() => go("/app")} />;
}
