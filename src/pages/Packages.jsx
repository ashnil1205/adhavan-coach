import { useState } from "react";
import { packages, waLink } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { SectionHead, Arrow, Idx } from "../components/Bits";
import Magnetic from "../components/Magnetic";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

/* ---------- why we don't publish a number ---------- */
function Pricing() {
  return (
    <section className="border-y hairline bg-ink">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal kind="fade" className="mb-7 flex items-center gap-4">
            <span className="h-1.5 w-1.5 bg-primary" />
            <span className="kicker">On pricing</span>
          </Reveal>
          <Reveal>
            <h2 className="display text-[clamp(1.7rem,3.8vw,2.7rem)]">
              Three things<br />decide the<br /><span className="text-primary">number.</span>
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col">
            {packages.factors.map((f, i) => (
              <Reveal key={f.n} delay={i * 100}
                className="group flex items-start gap-6 border-t hairline py-6 last:border-b">
                <Idx n={f.n} className="mt-1" />
                <div>
                  <h3 className="text-[1.05rem] font-medium tracking-[-.01em] transition-transform duration-600 group-hover:translate-x-1"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>{f.t}</h3>
                  <p className="body-copy mt-2 !text-[.88rem]">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8">
          {packages.lede.map((p, i) => (
            <Reveal key={i} delay={i * 140}>
              <p className="text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.9] text-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={280}>
            <Magnetic strength={0.22}>
              <a href={waLink("Hi Adhavan Coach, I'd like a specification-based quote. My requirement is:")}
                 target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Get a Specification-Based Quote <Arrow /></span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- one tier, alternating layout ---------- */
function Tier({ t, i }) {
  const flip = i % 2 === 1;
  return (
    <article id={t.id} className="scroll-mt-24 border-b hairline">
      <div className={`shell grid gap-0 py-0 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* image */}
        <Reveal kind="fade" className="media aspect-[4/3] border-x hairline lg:aspect-auto lg:min-h-[32rem]">
          <img src={t.img} alt={`${t.name} patient cabin`} loading="lazy" />
          {t.featured && (
            <span className="absolute left-5 top-5 z-[3] bg-primary px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-[.2em] text-white">
              Most specified
            </span>
          )}
          <span className="media-cap !opacity-100">
            <span className="kicker !text-white/75">{t.tag}</span>
          </span>
        </Reveal>

        {/* content */}
        <div className={`flex flex-col justify-center border-r hairline p-8 md:p-12 lg:p-14 ${flip ? "lg:border-l" : ""}`}>
          <Reveal kind="fade" className="mb-6 flex items-center gap-5">
            <Idx n={t.n} />
            <span className="rule-draw h-px flex-1 bg-[var(--line)]" />
            <span className="kicker !text-[.58rem] !text-fg/58">{t.tag}</span>
          </Reveal>

          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.4vw,3.1rem)]">{t.name}</h2>
            <p className="body-copy mt-5 max-w-lg">{t.blurb}</p>
          </Reveal>

          <Reveal delay={140} className="mt-9">
            <span className="kicker mb-5 block !text-fg/60">Standard provision</span>
            <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {t.specs.map((s, k) => (
                <li key={s}
                    className="group flex items-start gap-3 border-b hairline-faint py-3 text-[.88rem] text-muted transition-colors duration-500 hover:text-fg"
                    style={{ transitionDelay: `${k * 12}ms` }}>
                  <span className="mt-[.55rem] h-1 w-1 shrink-0 bg-primary transition-transform duration-500 group-hover:scale-[2.2]" />
                  <span className="transition-transform duration-500 group-hover:translate-x-1"
                        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220} className="mt-9">
            <a href={waLink(`Hi Adhavan Coach, I'm interested in the ${t.name} build. Could you send a quote?`)}
               target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>Enquire about {t.name} <Arrow /></span>
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ---------- ALS equipment ---------- */
function Equipped() {
  const [hover, setHover] = useState(-1);
  return (
    <section id="equipped" className="scroll-mt-24 shell py-24 md:py-36">
      <SectionHead kicker="Medical Fit-Out" index="05"
        lines={[packages.equipped.title]}
        lede={packages.equipped.blurb}
        className="mb-14 max-w-3xl" />

      <div className="grid gap-px border hairline sm:grid-cols-2 lg:grid-cols-3">
        {packages.equipped.items.map((it, i) => (
          <Reveal key={it} delay={i * 55}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
            className="group relative overflow-hidden border-b border-r hairline p-7 transition-colors duration-600 hover:bg-surface">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary/[.06] transition-transform duration-700 group-hover:scale-y-100"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
            <div className="relative flex items-center gap-4">
              <span className="kicker num !text-[.6rem] transition-colors duration-500"
                    style={{ color: hover === i ? "var(--color-primary)" : "oklch(19% .006 260 / .42)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[.98rem] tracking-tight text-fg/90">{it}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160} className="mt-12 flex flex-wrap items-center gap-5 border-l-2 border-primary pl-7">
        <p className="lede !text-fg">{packages.note}</p>
      </Reveal>
    </section>
  );
}

export default function Packages() {
  return (
    <>
      <Seo
        title="Ambulance Packages & Pricing — BLS, ALS & Custom | Adhavan Coach"
        desc="Four structural ambulance builds — Plyboard Mica BLS, Basic BLS, Classic 1 and Classic 2 — plus full ALS medical fit-out. Specification-based quotes from Adhavan Coach, Chennai."
        path="/packages"
      />
      <PageHero
        kicker="Packages"
        index="03 / 06"
        lines={packages.h1}
        lede="Four structural baselines. The medical fit-out is specified on top."
        img="/img/exterior-mobile-icu.jpg"
        focus="50% 50%"
        alt="Mobile ICU ambulance built to an Adhavan Coach specification"
      />
      <Pricing />

      <div className="shell pt-24 md:pt-32">
        <SectionHead kicker="The Builds" index="04"
          lines={["Four structural", "baselines."]} className="mb-16 max-w-3xl" />
      </div>

      {packages.tiers.map((t, i) => <Tier key={t.id} t={t} i={i} />)}

      <Equipped />

      <CtaBand
        lines={["One call beats", "a price list."]}
        sub="Give us the base vehicle, the fit-out level and anything custom. We'll quote against your actual specification."
        primary="Get a Detailed Quote"
      />
    </>
  );
}
