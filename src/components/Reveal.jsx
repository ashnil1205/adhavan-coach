import { useEffect, useRef } from "react";

/* Adds .is-in when the element scrolls into view. One shared
   IntersectionObserver instance keeps this cheap at ~200 nodes. */
let io;
const seen = new WeakSet();

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );
  return io;
}

export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen.has(el)) return;
    // Already above the fold on load? reveal immediately, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      requestAnimationFrame(() => el.classList.add("is-in"));
      return;
    }
    observer().observe(el);
    return () => observer().unobserve(el);
  }, []);
  return ref;
}

export default function Reveal({
  as: Tag = "div",
  kind = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      data-reveal={kind}
      className={className}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Heading whose lines slide up out of a clipping mask. */
export function MaskLines({ lines, className = "", delay = 0, step = 90 }) {
  const ref = useReveal();
  return (
    <span ref={ref} data-reveal="fade" className={className} style={{ "--d": "0ms" }}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <span style={{ "--d": `${delay + i * step}ms` }}>{l}</span>
        </span>
      ))}
    </span>
  );
}
