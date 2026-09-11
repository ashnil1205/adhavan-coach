import { contact, waLink, telLink, fmtPhone } from "../data/site";
import { Arrow } from "./Bits";
import Reveal, { MaskLines } from "./Reveal";
import Magnetic from "./Magnetic";

export default function CtaBand({
  lines = ["Tell us what the ambulance", "needs to do."],
  sub = "From standard ambulance builds to specialised medical configurations, talk to our team about your next vehicle.",
  primary = "Start Your Build",
}) {
  return (
    <section className="relative overflow-hidden border-y hairline bg-surface">
      {/* sweeping red wash */}
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(80% 120% at 10% 110%, oklch(53% .215 26 / .10), transparent 64%)" }} />
      <div className="shell relative grid gap-12 py-24 md:py-32 lg:grid-cols-[1.25fr_1fr] lg:items-end">
        <div>
          <Reveal kind="fade" className="mb-8 flex items-center gap-5">
            <span className="h-1.5 w-1.5 bg-primary beacon" />
            <span className="kicker">Next step</span>
            <span className="h-px w-16 bg-[var(--line)]" />
          </Reveal>
          <h2 className="display text-[clamp(2.2rem,6.5vw,5rem)]">
            <MaskLines lines={lines} />
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal delay={120}><p className="body-copy max-w-md">{sub}</p></Reveal>
          <Reveal delay={200} className="flex flex-wrap gap-3">
            <Magnetic strength={0.22}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>{primary} <Arrow /></span>
              </a>
            </Magnetic>
            <a href={telLink(contact.phones[0])} className="btn btn-ghost">
              <span>Call {fmtPhone(contact.phones[0])}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
