import { useRef } from "react";

/* Element drifts toward the pointer, then springs back. */
export default function Magnetic({ children, strength = 0.28, className = "" }) {
  const ref = useRef(null);

  const move = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: "transform .5s cubic-bezier(.16,1,.32,1)" }}
    >
      {children}
    </span>
  );
}
