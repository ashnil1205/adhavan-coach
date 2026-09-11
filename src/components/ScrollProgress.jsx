import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf;
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? scrollY / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    upd();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-px bg-transparent" aria-hidden="true">
      <div
        ref={bar}
        className="h-px origin-left bg-primary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
