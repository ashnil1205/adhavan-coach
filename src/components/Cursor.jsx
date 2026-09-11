import { useEffect, useRef } from "react";

/* Difference-blend dot + trailing ring. Ring swells over anything
   interactive. Skipped entirely on touch / reduced-motion. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my, raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      const hot = e.target.closest?.(
        "a,button,[data-hot],input,select,textarea,summary"
      );
      ring.current?.classList.toggle("is-hot", !!hot);
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    const hide = () => { 
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const show = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    addEventListener("mousemove", move, { passive: true });
    addEventListener("mouseleave", hide);
    addEventListener("mouseenter", show);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", move);
      removeEventListener("mouseleave", hide);
      removeEventListener("mouseenter", show);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
