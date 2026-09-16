import { useEffect, useRef, useState } from "react";
import { approach, capabilities, process } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { SectionHead, Idx } from "../components/Bits";
import Parallax from "../components/Parallax";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

/* Horizontal-drag constraint cards */
function Constraints() {
  return (
    <section className="border-y hairline bg-ink">
      <div className="shell py-24 md:py-32">
        <Reveal kind="fade" className="mb-14 max-w-3xl">
          <p className="display text-[clamp(1.6rem,4.4vw,3.1rem)] leading-[1.15]">
            {approach.lede}
          </p>
        </Reveal>

        <div className="grid gap-px border hairline sm:grid-cols-2 xl:grid-cols-4">
          {approach.constraints.map((c, i) => (
            <Reveal key={c.n} delay={i * 90}
              className="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden border-b border-r hairline bg-bg p-7 transition-colors duration-600 hover:bg-surface">
              <span className="pointer-events-none absolute -right-8 -top-8 text-[7rem] font-bold leading-none tracking-tighter text-fg/[.03] transition-transform duration-1000 group-hover:scale-110 group-hover:text-primary/[.09]"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
                {c.n}
              </span>
              <Idx n={c.n} />
              <div className="relative">
                <h3 className="text-[1.15rem] font-semibold tracking-[-.015em]">{c.t}</h3>
                <p className="body-copy mt-3 !text-[.9rem]">{c.d}</p>
                <span className="mt-5 block h-px w-6 bg-primary transition-all duration-700 group-hover:w-full"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 max-w-3xl border-l-2 border-primary pl-7">
          <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.8] text-fg/90">
            {approach.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Anatomy — hover an index, the cabin photo and note swap */
const ANATOMY = [
  { n: "01", t: "Patient area",     d: "Stretcher position, aisle clearance and the space an attendant actually needs to work in transit.", img: "/img/interior-wide-bench.jpg" },
  { n: "02", t: "Oxygen system",    d: "Horizontally mounted ‘D’ type cylinder, secured and reachable without breaking patient contact.", img: "/img/interior-stretcher-blue.jpg" },
  { n: "03", t: "Equipment storage",d: "Fibre cupboards and cabinets sized around the equipment list you gave us, not a generic layout.", img: "/img/interior-cabinets-sink.jpg" },
  { n: "04", t: "Electrical systems",d: "Dedicated circuits for medical devices, 800VA inverter, warning lights, siren and PA.", img: "/img/interior-green-lit.jpg" },
  { n: "05", t: "Attendant area",   d: "Retractable doctor seat and a working position that does not fight the stretcher for room.", img: "/img/detail-quilted-seat.jpg" },
  { n: "06", t: "Interior materials",d: "Marine ply with vinyl flooring, fibre or Sun Mica panels — chosen for repeated cleaning cycles.", img: "/img/detail-quilted-ceiling.jpg" },
];

function Anatomy() {
  const [i, setI] = useState(0);
  return (
    <section className="shell py-24 md:py-36">
      <SectionHead kicker="Anatomy" index="02"
        lines={["Every system,", "in its place."]}
        lede="Hover through the cabin. Each decision below was made before a single panel was cut."
        className="mb-16 max-w-3xl" />

      <div className="grid gap-px border hairline lg:grid-cols-[1fr_1.1fr]">
        {/* list */}
        <div className="flex flex-col">
          {ANATOMY.map((a, k) => (
            <button key={a.n}
              onMouseEnter={() => setI(k)}
              onFocus={() => setI(k)}
              onClick={() => setI(k)}
              className="group relative border-b border-r hairline p-6 text-left transition-colors duration-600 last:border-b-0 md:p-7"
              style={{ background: i === k ? "var(--color-surface)" : "transparent" }}>
              <span className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary transition-transform duration-600"
                    style={{ transform: i === k ? "scaleY(1)" : "scaleY(0)",
                             transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
              <div className="flex items-baseline gap-5">
                <span className="kicker num shrink-0 transition-colors duration-500"
                      style={{ color: i === k ? "var(--color-primary)" : "oklch(19% .006 260 / .42)" }}>
                  {a.n}
                </span>
                <div className="flex-1">
                  <h3 className="text-[1.1rem] font-medium tracking-[-.012em] transition-transform duration-600 group-hover:translate-x-1"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
                    {a.t}
                  </h3>
                  <div className="grid transition-[grid-template-rows] duration-600"
                       style={{ gridTemplateRows: i === k ? "1fr" : "0fr",
                                transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
                    <div className="overflow-hidden">
                      <p className="body-copy pt-3 !text-[.88rem]">{a.d}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* image */}
        <div className="relative min-h-[22rem] border-r hairline lg:min-h-0">
          <div className="media sticky top-24 h-full min-h-[22rem] lg:h-[calc(100%-0px)]">
            {ANATOMY.map((a, k) => (
              <img key={a.n} src={a.img} alt={a.t} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: i === k ? 1 : 0,
                  transform: i === k ? "scale(1)" : "scale(1.05)",
                  transition: "opacity .8s cubic-bezier(.16,1,.32,1), transform 1.3s cubic-bezier(.16,1,.32,1)",
                }} />
            ))}
            <span className="media-cap !opacity-100">
              <span className="kicker !text-primary">{ANATOMY[i].n}</span>
              <span className="mt-1.5 block text-sm">{ANATOMY[i].t}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* full build sequence, condensed */
function Sequence() {
  return (
    <section className="border-t hairline bg-ink">
      <div className="shell py-24 md:py-32">
        <SectionHead kicker="Sequence" index="03"
          lines={process.h1}
          lede={process.lede} className="mb-16 max-w-3xl" />

        <ol className="grid gap-px border hairline md:grid-cols-2 xl:grid-cols-3">
          {process.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}
              className="group relative overflow-hidden border-b border-r hairline bg-bg">
              <div className="media aspect-[16/10] border-b hairline-faint">
                <img src={s.img.replace("/img/", "/img/sm/")} alt={s.t} loading="lazy" />
                <span className="absolute left-4 top-4 z-[3] bg-fg/80 px-2.5 py-1 text-[.58rem] font-semibold tracking-[.2em] text-bg backdrop-blur-sm">
                  STEP {s.n}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-[1.1rem] font-semibold tracking-[-.015em] transition-colors duration-500 group-hover:text-primary">
                  {s.t}
                </h3>
                <p className="body-copy mt-3 !text-[.88rem]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Approach() {
  return (
    <>
      <Seo
        title="Our Approach — Ambulance Cabin Design & Fabrication | Adhavan Coach"
        desc="An ambulance has to do more within a limited space. How Adhavan Coach plans patient cabins, equipment access, attendant space and durable interiors for international-quality ambulance fabrication in Chennai."
        path="/approach"
      />
      <PageHero
        kicker="Approach"
        index="02 / 07"
        lines={approach.h1}
        lede={approach.closing}
        img="/img/interior-rear-pink.jpg"
        focus="50% 55%"
        alt="Patient cabin interior showing bench seating, cabinets and stretcher clearance"
      />
      <Constraints />
      <Anatomy />
      <Sequence />
      <CtaBand
        lines={["Bring us the", "use case."]}
        sub="BLS or ALS, urban or rural, patient volume and equipment list — that's where every build starts."
        primary="Discuss a Build"
      />
    </>
  );
}
