import { useEffect, useRef, useState } from "react";

/* Counts up once, on first view. */
export default function Counter({ to, pre = "", suf = "", dur = 1500 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to); return;
    }
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(tick); ob.disconnect(); }
    }, { threshold: 0.5 });
    ob.observe(el);
    return () => { ob.disconnect(); cancelAnimationFrame(raf); };
  }, [to, dur]);

  return <span ref={ref} className="tabnum">{pre}{n}{suf}</span>;
}
