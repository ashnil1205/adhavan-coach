import Reveal from "../components/Reveal";
import Scramble from "../components/Scramble";

/* Shared inner-page masthead.
   Most of the supplied photography is portrait (3:4 and 9:16), so the band
   is a gentle 16:9 rather than a 21:9 letterbox — a letterbox threw away
   ~75% of a portrait frame and landed the crop on whatever happened to be
   in the middle. `focus` aims the remaining crop at the subject. */
export default function PageHero({
  kicker, index, lines, lede, img, alt, focus = "50% 50%",
}) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+clamp(3.5rem,9vw,7rem))]">
      <div className="shell">
        <Reveal kind="fade" className="mb-8 flex items-center gap-5">
          <span className="h-1.5 w-1.5 bg-primary beacon" />
          <Scramble text={kicker} className="kicker" />
          <span className="rule-draw h-px flex-1 bg-[var(--line)]" style={{ "--d": "200ms" }} />
          <span className="kicker num !text-fg/60">{index}</span>
        </Reveal>

        <h1 className="display max-w-[16ch] text-[clamp(2.4rem,7.6vw,6rem)]">
          {lines.map((l, i) => (
            <span className="line-mask" key={i}>
              <span style={{
                animation: `heroLine 1.15s ${180 + i * 110}ms cubic-bezier(.16,1,.32,1) both`,
              }}>{l}</span>
            </span>
          ))}
        </h1>
        <style>{`@keyframes heroLine{from{transform:translate3d(0,110%,0) rotate(2deg)}to{transform:none}}`}</style>

        {lede && (
          <Reveal delay={420} className="mt-10 max-w-2xl">
            <p className="lede">{lede}</p>
          </Reveal>
        )}
      </div>

      {img && (
        <Reveal kind="fade" delay={200} className="mt-16 md:mt-20">
          <div className="media wipe is-in aspect-[4/3] max-h-[64vh] border-y hairline sm:aspect-[16/9]">
            <img src={img} alt={alt} style={{ objectPosition: focus }} />
          </div>
        </Reveal>
      )}
    </section>
  );
}
