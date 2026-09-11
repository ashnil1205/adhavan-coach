import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—";

/* Section kickers decode themselves when they enter view. */
export default function Scramble({ text, className = "", as: Tag = "span" }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf, frame = 0, done = false;
    const chars = text.split("");

    const run = () => {
      frame += 1;
      const settled = Math.floor(frame / 2.2);
      setOut(
        chars
          .map((c, i) =>
            c === " " || i < settled
              ? c
              : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      );
      if (settled >= chars.length) { setOut(text); return; }
      raf = requestAnimationFrame(run);
    };

    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done) {
          done = true;
          setOut("");
          raf = requestAnimationFrame(run);
          ob.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    ob.observe(el);
    return () => { ob.disconnect(); cancelAnimationFrame(raf); };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out || " "}</span>
    </Tag>
  );
}
