import { whyUs, stats, baseVehicles } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { SectionHead, Idx } from "../components/Bits";
import Counter from "../components/Counter";
import Parallax from "../components/Parallax";
import Marquee from "../components/Marquee";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

/* Big numbered rows that reveal a hairline and shift on hover */
function Points() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="border-t hairline">
        {whyUs.points.map((p, i) => (
          <Reveal key={p.n} delay={i * 70}
            className="group relative grid gap-6 border-b hairline py-10 transition-colors duration-700 md:grid-cols-[6rem_1fr_1.15fr] md:items-start md:gap-10 md:py-12">
            {/* hover wash */}
            <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-surface transition-transform duration-800 group-hover:scale-x-100"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
            <span className="relative">
              <span className="display block text-[clamp(2rem,4.5vw,3.2rem)] text-fg/22 transition-colors duration-700 group-hover:text-primary">
                {p.n}
              </span>
            </span>
            <h3 className="relative text-[clamp(1.15rem,2.4vw,1.6rem)] font-semibold leading-tight tracking-[-.02em] transition-transform duration-700 group-hover:translate-x-1.5"
                style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
              {p.t}
            </h3>
            <p className="body-copy relative max-w-2xl">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function WhyUs() {
  return (
    <>
      <Seo
        title="Why Choose Adhavan Coach — AIS-125 Ambulance Builders, Chennai"
        desc="Standard-first engineering to AIS-125 Parts 1 & 2, experience across Eeco, Force Traveller and SML BS6 vehicle classes, transparent specification-based quoting, RTO documentation support and warranty-backed after-sales service."
        path="/why-us"
      />
      <PageHero
        kicker="Why Us"
        index="04 / 06"
        lines={whyUs.h1}
        lede="Six reasons hospitals and operators in Tamil Nadu keep coming back to the same workshop."
        img="/img/exterior-neonatal-side.jpg"
        focus="50% 45%"
        alt="Adhavan Coach ambulance in service livery, side elevation"
      />

      <Points />

      {/* proof band */}
      <section className="border-y hairline bg-ink">
        <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal kind="left" className="media aspect-[5/4] border hairline">
            <Parallax speed={0.08} className="h-full">
              <img src="/img/exterior-mobile-icu.jpg" alt="Mobile ICU ambulance built by Adhavan Coach" loading="lazy" />
            </Parallax>
            <span className="media-cap">
              <span className="kicker !text-primary">Delivered</span>
              <span className="mt-1.5 block text-sm">Mobile ICU configuration</span>
            </span>
          </Reveal>

          <div>
            <SectionHead kicker="Vehicle Classes" index="02"
              lines={["Across the", "classes you", "actually run."]}
              className="mb-10" />
            <div className="grid grid-cols-2 gap-px border hairline sm:grid-cols-3">
              {baseVehicles.map((v, i) => (
                <Reveal key={v} delay={i * 60}
                  className="group border-b border-r hairline px-5 py-7 transition-colors duration-600 hover:bg-surface">
                  <span className="mb-3 block h-px w-5 bg-primary transition-all duration-600 group-hover:w-10"
                        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
                  <span className="text-[.86rem] tracking-wide text-muted transition-colors duration-500 group-hover:text-fg">{v}</span>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px border hairline">
              {stats.slice(0, 2).map((s) => (
                <div key={s.l} className="border-r hairline p-7">
                  <div className="display text-[clamp(1.7rem,3.4vw,2.5rem)]">
                    <Counter to={s.v} pre={s.pre || ""} suf={s.suf || ""} />
                  </div>
                  <div className="kicker mt-2 !text-[.56rem]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-b hairline py-6">
        <Marquee slow items={["AIS-125 Parts 1 & 2", "RTO Documentation", "1 Year Warranty", "Specification-Based Quoting", "In-House Fabrication", "Chennai · Red Hills"]} />
      </div>

      <CtaBand
        lines={["No “starting from”.", "Just your spec."]}
        sub="Send the structure, the equipment list and the fit-out level. You'll get a number you can actually plan around."
        primary="Talk to Our Team"
      />
    </>
  );
}
