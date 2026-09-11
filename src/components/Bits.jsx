import { Link } from "react-router-dom";
import Scramble from "./Scramble";
import { useReveal } from "./Reveal";

/* ---------- small shared pieces ---------- */

export const Arrow = ({ className = "" }) => (
  <svg className={`arw ${className}`} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M1 12 12 1M12 1H3.5M12 1v8.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const Plus = ({ className = "" }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

/* Section header: kicker + rule + big masked heading */
export function SectionHead({ kicker, lines, lede, index, className = "" }) {
  const ref = useReveal();
  return (
    <header ref={ref} data-reveal="fade" className={className}>
      <div className="mb-8 flex items-center gap-5">
        <span className="h-1.5 w-1.5 shrink-0 bg-primary beacon" />
        <Scramble text={kicker} className="kicker" />
        <span className="rule-draw h-px flex-1 bg-[var(--line)]" style={{ "--d": "220ms" }} />
        {index && <span className="kicker num !text-fg/58">{index}</span>}
      </div>
      <h2 className="display text-[clamp(2.1rem,6.2vw,4.6rem)]">
        {lines.map((l, i) => (
          <span className="line-mask" key={i}>
            <span style={{ "--d": `${120 + i * 90}ms` }}>{l}</span>
          </span>
        ))}
      </h2>
      {lede && (
        <p className="lede mt-8 max-w-2xl" style={{ "--d": "340ms" }}>
          {lede}
        </p>
      )}
    </header>
  );
}

/* Number chip used across cards */
export const Idx = ({ n, className = "" }) => (
  <span className={`kicker num !text-primary ${className}`}>{n}</span>
);

/* Text link with the roll-up swap */
export function RollLink({ to, href, children, className = "", ...rest }) {
  const inner = (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
  const cls = `inline-block ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <a href={href} className={cls} {...rest}>{inner}</a>;
}
