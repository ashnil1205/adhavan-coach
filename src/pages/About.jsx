import { Link } from "react-router-dom";
import { home, aboutH1, stats, capabilities, whyUs, waLink } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { SectionHead, Arrow, Idx } from "../components/Bits";
import Counter from "../components/Counter";
import Parallax from "../components/Parallax";
import Marquee from "../components/Marquee";
import CtaBand from "../components/CtaBand";
import Magnetic from "../components/Magnetic";
import Seo from "../components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="About Adhavan Coach — 14+ Years of Ambulance Fabrication, Chennai"
        desc="Adhavan Coach has built ambulances and customized vehicles in Chennai for over a decade — patient cabins, electrical systems, insulation and interior fittings for hospitals and medical transport operators."
        path="/about"
      />

      <PageHero
        kicker="About Us"
        index="01 / 06"
        lines={aboutH1}
        lede={home.sub}
        img="/img/gallery/outer-9.jpg"
        focus="50% 55%"
        alt="Force Traveller ambulance built by Adhavan Coach in Chennai"
      />

      {/* the two source paragraphs, given room */}
      <section className="shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal kind="left">
            <div className="sticky top-32">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-1.5 w-1.5 bg-primary" />
                <span className="kicker">Since 2012</span>
              </div>
              <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">
                A workshop,<br />not a<br /><span className="text-primary">catalogue.</span>
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-9">
            {home.intro.map((p, i) => (
              <Reveal key={i} delay={i * 130}>
                <p className="text-[clamp(1.02rem,1.4vw,1.2rem)] leading-[1.9] text-muted">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={300} className="grid grid-cols-2 gap-px border hairline sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="border-b border-r hairline-faint p-6">
                  <div className="display text-[clamp(1.5rem,3vw,2.2rem)]">
                    <Counter to={s.v} pre={s.pre || ""} suf={s.suf || ""} />
                  </div>
                  <div className="kicker mt-2 !text-[.56rem]">{s.l}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* image duo with parallax */}
      <section className="border-y hairline bg-ink">
        <div className="shell grid gap-px py-0 md:grid-cols-2">
          <Reveal kind="fade" className="media aspect-[4/3] border-x hairline">
            <Parallax speed={0.09} className="h-full">
              <img src="/img/shell-bare-insulated.jpg" alt="Bare ambulance shell with PU foam insulation before fit-out" loading="lazy" />
            </Parallax>
            <span className="media-cap">
              <span className="kicker !text-primary">Fabrication</span>
              <span className="mt-1.5 block text-sm">PU foam insulation before fit-out</span>
            </span>
          </Reveal>
          <Reveal kind="fade" delay={140} className="media aspect-[4/3] border-r hairline">
            <Parallax speed={-0.07} className="h-full">
              <img src="/img/interior-equipment-cabinet.jpg" alt="Finished patient cabin with equipment cabinet and stretcher" loading="lazy" />
            </Parallax>
            <span className="media-cap">
              <span className="kicker !text-primary">Fit-out</span>
              <span className="mt-1.5 block text-sm">Equipment cabinet and stretcher position</span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* what we work across */}
      <section className="shell py-24 md:py-32">
        <SectionHead kicker="Capabilities" index="02"
          lines={["We work", "across."]}
          lede="Six disciplines under one roof in Red Hills — which is why a change on the drawing is a change on the floor the same week."
          className="mb-14 max-w-3xl" />

        <div className="grid gap-px border hairline md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c} delay={i * 70}
              className="group relative overflow-hidden border-b border-r hairline p-8 transition-colors duration-600 hover:bg-surface">
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
              <Idx n={String(i + 1).padStart(2, "0")} />
              <h3 className="mt-5 text-[1.08rem] font-medium leading-snug tracking-[-.01em] transition-transform duration-600 group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
                {c}
              </h3>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-16 flex flex-wrap items-center gap-4">
          <p className="lede !text-fg">{home.ctaLine}</p>
          <Magnetic strength={0.22}>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <span>Get a Quote <Arrow /></span>
            </a>
          </Magnetic>
        </Reveal>
      </section>

      <div className="border-y hairline bg-ink py-6">
        <Marquee reverse items={whyUs.points.map((p) => p.t)} />
      </div>

      <CtaBand
        lines={["Fourteen years of", "getting it right."]}
        sub="Tell us the use case and the equipment list. We'll tell you what the build actually needs."
        primary="Start a Conversation"
      />
    </>
  );
}
