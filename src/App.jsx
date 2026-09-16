import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Dock from "./components/Dock";

import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

/* ---- route change: shutter wipe, then jump to top ---- */
function useShutter() {
  const loc = useLocation();
  const [phase, setPhase] = useState("idle");
  const [shown, setShown] = useState(loc);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (loc.pathname === shown.pathname) { setShown(loc); return; }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(loc); window.scrollTo(0, 0); return; }

    setPhase("in");
    const t1 = setTimeout(() => {
      setShown(loc);
      window.scrollTo(0, 0);
      setPhase("out");
    }, 640);
    const t2 = setTimeout(() => setPhase("idle"), 1320);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [loc, shown.pathname]);

  return { phase, shown };
}

/* ---- deep links like /packages#classic-1 ---- */
function useHashScroll(loc) {
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => {
      document.querySelector(loc.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
    return () => clearTimeout(t);
  }, [loc]);
}

export default function App() {
  const { phase, shown } = useShutter();
  useHashScroll(shown);

  return (
    <>
      <div className="blueprint" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <Nav />

      <main className="relative z-[2]">
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Dock />

      {phase !== "idle" && (
        <div className={`shutter ${phase}`} aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
      )}
    </>
  );
}
