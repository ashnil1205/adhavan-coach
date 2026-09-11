import { useEffect, useRef } from "react";

/* Translates a child on scroll. speed>0 = lags behind (moves down). */
export default function Parallax({ speed = 0.12, className = "", children }) {
  const wrap = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const mid = r.top + r.height / 2 - innerHeight / 2;
      if (inner.current)
        inner.current.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    upd();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-[124%] w-full will-change-transform" style={{ marginTop: "-12%" }}>
        {children}
      </div>
    </div>
  );
}
