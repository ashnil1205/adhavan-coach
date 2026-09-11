export default function Marquee({ items, reverse = false, slow = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`} aria-hidden="true">
      <div className={`marquee ${slow ? "marquee-slow" : ""} ${reverse ? "marquee-rev" : ""}`}>
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6">
            <span className="kicker !text-fg/70">{t}</span>
            <span className="h-1 w-1 shrink-0 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
