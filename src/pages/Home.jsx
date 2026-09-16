import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  home, stats, capabilities, baseVehicles, process,
  packages, gallery, galleryFilters, faqs, waLink,
} from "../data/site";
import Reveal, { MaskLines } from "../components/Reveal";
import { SectionHead, Arrow, Idx } from "../components/Bits";
import Magnetic from "../components/Magnetic";
import Counter from "../components/Counter";
import Marquee from "../components/Marquee";
import Parallax from "../components/Parallax";
import Accordion from "../components/Accordion";
import Lightbox from "../components/Lightbox";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const img = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  // slow drift + fade of the hero image as you scroll away
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const y = Math.min(scrollY, innerHeight);
      const p = y / innerHeight;
      if (img.current) {
        img.current.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(${1 + p * 0.09})`;
        img.current.style.opacity = String(1 - p * 0.55);
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  const ease = "cubic-bezier(.16,1,.32,1)";
  const rise = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(26px)",
    transition: `opacity .9s ${d}ms ${ease}, transform .9s ${d}ms ${ease}`,
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-[var(--nav-h)]">
      {/* image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={img}
          src="/img/exterior-red-traveller.jpg"
          alt="A Force Traveller emergency ambulance fabricated by Adhavan Coach"
          className="h-[112%] w-full object-cover will-change-transform"
          style={{
            filter: "saturate(.92) contrast(1.02)",
            objectPosition: "50% 45%",
            clipPath: loaded ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            transition: `clip-path 1.5s ${ease}`,
          }}
        />
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(to top, var(--color-bg) 1%, oklch(99.2% .001 260 / .72) 34%, oklch(99.2% .001 260 / .34) 100%)" }} />
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(to right, oklch(99.2% .001 260 / .96) 6%, oklch(99.2% .001 260 / .74) 38%, transparent 78%)" }} />
      </div>

      <div className="shell">
        {/* kicker */}
        <div className="mb-7 flex items-center gap-4 max-[380px]:[&_.kicker]:text-[.6rem]" style={rise(200)}>
          <span className="h-1.5 w-1.5 bg-primary beacon" />
          <span className="kicker whitespace-nowrap !text-fg/75">Ambulance Fabrication · Chennai</span>
          <span className="hidden h-px w-14 bg-[var(--line)] sm:block" />
          <span className="kicker num hidden !text-fg/62 sm:block">Est. 2012</span>
        </div>

        {/* H1 */}
        <h1 className="display max-w-[17ch] text-[clamp(2.6rem,8.4vw,7.4rem)]">
          {home.h1.map((l, i) => (
            <span className="line-mask" key={i}>
              <span
                style={{
                  transform: loaded ? "none" : "translate3d(0,110%,0) rotate(2deg)",
                  transition: `transform 1.15s ${420 + i * 110}ms ${ease}`,
                }}
              >
                {i === 0 ? (<>Adhavan <span className="text-primary">Coach</span>:</>) : l}
              </span>
            </span>
          ))}
        </h1>

        {/* sub + CTAs */}
        <div className="mt-10 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <p className="lede max-w-lg" style={rise(820)}>{home.sub}</p>

          <div className="flex flex-wrap gap-3" style={rise(940)}>
            <Magnetic strength={0.24}>
              <Link to="/packages" className="btn btn-solid">
                <span>Explore Packages <Arrow /></span>
              </Link>
            </Magnetic>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>Talk to Our Team</span>
            </a>
          </div>
        </div>

        {/* stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-px border-t hairline pt-px md:grid-cols-4" style={rise(1080)}>
          {stats.map((s) => (
            <div key={s.l} className="border-b hairline-faint py-6 pr-6 md:border-b-0">
              <div className="display text-[clamp(1.7rem,3.6vw,2.6rem)] text-fg">
                <Counter to={s.v} pre={s.pre || ""} suf={s.suf || ""} />
              </div>
              <div className="kicker mt-2 !text-[.6rem] !text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-6 right-[clamp(1.25rem,4.5vw,4.5rem)] hidden items-center gap-3 lg:flex"
           style={rise(1240)}>
        <span className="kicker !text-[.6rem] !text-muted">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-[var(--line)]">
          <span className="absolute inset-x-0 top-0 h-4 bg-primary"
                style={{ animation: "scrollHint 2.2s cubic-bezier(.76,0,.24,1) infinite" }} />
        </span>
      </div>
      <style>{`@keyframes scrollHint{0%{transform:translateY(-100%)}55%,100%{transform:translateY(250%)}}`}</style>
    </section>
  );
}

/* ============================================================
   INTRO — two paragraphs + capability marquee
   ============================================================ */
function Intro() {
  return (
    <section className="relative border-y hairline bg-ink">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal kind="left">
          <div className="sticky top-32">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="kicker">Who we are</span>
            </div>
            <h2 className="display text-[clamp(1.8rem,4vw,2.9rem)]">
              A decade of<br />building for the<br />
              <span className="text-primary">worst day</span> of<br />someone's life.
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-9">
          {home.intro.map((p, i) => (
            <Reveal key={i} delay={i * 130}>
              <p className="text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.9] text-muted">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={280} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {baseVehicles.map((v) => (
              <span key={v}
                    className="group border hairline px-5 py-6 text-[.8rem] tracking-wide text-muted transition-colors duration-500 hover:border-fg/30 hover:bg-surface hover:text-fg">
                <span className="mb-2 block h-px w-5 bg-primary transition-all duration-500 group-hover:w-10" />
                {v}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="border-t hairline py-6">
        <Marquee items={capabilities} />
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS — pinned rail with progress fill
   ============================================================ */
function Process() {
  const wrap = useRef(null);
  const fill = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const upd = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight * 0.5;
      const p = Math.max(0, Math.min(1, (innerHeight * 0.5 - r.top) / total));
      if (fill.current) fill.current.style.height = `${p * 100}%`;
      setActive(Math.min(process.steps.length - 1, Math.floor(p * process.steps.length + 0.15)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    upd();
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);

  return (
    <section className="shell py-24 md:py-36">
      <SectionHead
        kicker="The Process"
        index="02"
        lines={process.h1}
        lede={process.lede}
        className="mb-20 max-w-4xl"
      />

      <div ref={wrap} className="grid gap-16 lg:grid-cols-[1fr_.85fr]">
        {/* steps */}
        <div className="rail relative pl-8 md:pl-12">
          <div ref={fill} className="rail-fill" style={{ height: "0%" }} />
          {process.steps.map((s, i) => (
            <Reveal key={s.n} kind="up" delay={40} className="relative pb-14 last:pb-0">
              <span
                className="absolute -left-8 top-2 h-1.5 w-1.5 -translate-x-1/2 transition-all duration-700 md:-left-12"
                style={{
                  background: i <= active ? "var(--color-primary)" : "var(--color-steel)",
                  transform: `translateX(-50%) scale(${i === active ? 2.2 : 1})`,
                  transitionTimingFunction: "cubic-bezier(.16,1,.32,1)",
                }}
              />
              <div className="mb-3 flex items-baseline gap-4">
                <Idx n={s.n} />
                <span className="h-px flex-1 bg-[var(--line-faint)]" />
              </div>
              <h3
                className="display text-[clamp(1.35rem,3vw,2.05rem)] transition-colors duration-700"
                style={{ color: i <= active ? "var(--color-fg)" : "oklch(19% .006 260 / .38)" }}
              >
                {s.t}
              </h3>
              <p className="body-copy mt-4 max-w-xl">{s.d}</p>
            </Reveal>
          ))}
        </div>

        {/* sticky image that swaps with the active step */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="media aspect-[4/5] border hairline">
              {process.steps.map((s, i) => (
                <img
                  key={s.n}
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.06)",
                    transition: "opacity .9s cubic-bezier(.16,1,.32,1), transform 1.4s cubic-bezier(.16,1,.32,1)",
                  }}
                />
              ))}
              <div className="media-cap !opacity-100">
                <div className="flex items-end justify-between gap-4">
                  <span className="kicker !text-white/75">Stage {process.steps[active].n}</span>
                  <span className="text-sm font-medium tracking-tight">{process.steps[active].t}</span>
                </div>
                <div className="mt-3 h-px w-full bg-[var(--line)]">
                  <div className="h-px bg-primary transition-[width] duration-700"
                       style={{ width: `${((active + 1) / process.steps.length) * 100}%`,
                                transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PACKAGES PREVIEW
   ============================================================ */
function PackagePreview() {
  return (
    <section className="border-y hairline bg-ink">
      <div className="shell py-24 md:py-36">
        <SectionHead kicker="The Range" index="03"
          lines={["Four builds.", "One standard."]}
          lede="Each package is a structural baseline. The medical fit-out is specified on top, against your protocol."
          className="mb-16 max-w-3xl" />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {packages.tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 90} className="h-full">
              <Link to={`/packages#${t.id}`}
                    className="group relative flex h-full flex-col overflow-hidden border hairline bg-bg transition-colors duration-600 hover:bg-surface">
                <div className="media aspect-[4/3] border-b hairline-faint">
                  <img src={t.img.replace("/img/", "/img/sm/")} alt={t.name} loading="lazy" />
                  {t.featured && (
                    <span className="absolute left-4 top-4 z-[3] bg-primary px-2.5 py-1 text-[.58rem] font-semibold uppercase tracking-[.18em] text-white">
                      Most specified
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Idx n={t.n} />
                    <span className="kicker !text-[.58rem] !text-fg/58">{t.tag}</span>
                  </div>
                  <h3 className="display text-[1.35rem] transition-colors duration-500 group-hover:text-primary">
                    {t.name}
                  </h3>
                  <p className="body-copy mt-3 flex-1 !text-[.88rem]">{t.blurb}</p>
                  <span className="mt-6 flex items-center gap-2 text-[.65rem] font-semibold uppercase tracking-[.2em] text-fg/60 transition-colors duration-500 group-hover:text-primary">
                    View specification
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
                          style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
                      <Arrow />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY with filters + lightbox
   ============================================================ */
function Gallery() {
  const [f, setF] = useState("All");
  const [box, setBox] = useState(null);
  const list = f === "All" ? gallery : gallery.filter((g) => g.k === f);

  return (
    <section className="shell py-24 md:py-36">
      <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead kicker="Selected Builds" index="04"
          lines={["Work off", "the floor."]} className="max-w-2xl" />
        <Reveal kind="right" className="flex flex-wrap gap-2">
          {galleryFilters.map((k) => (
            <button key={k} onClick={() => setF(k)}
              className="border px-4 py-2.5 text-[.62rem] font-semibold uppercase tracking-[.2em] transition-all duration-500"
              style={{
                borderColor: f === k ? "var(--color-primary)" : "var(--line)",
                background: f === k ? "var(--color-primary)" : "transparent",
                color: f === k ? "#fff" : "var(--color-muted)",
                transitionTimingFunction: "cubic-bezier(.16,1,.32,1)",
              }}>
              {k}
            </button>
          ))}
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
        {list.map((g, i) => (
          <button
            key={g.s}
            onClick={() => setBox(gallery.indexOf(g))}
            className="media brackets aspect-[4/5] border hairline"
            style={{
              animation: `gIn .7s ${(i % 12) * 45}ms cubic-bezier(.16,1,.32,1) both`,
            }}
          >
            <img src={g.s.replace("/img/", "/img/sm/")} alt={g.c} loading="lazy" />
            <span className="media-cap text-left">
              <span className="kicker !text-[.55rem] !text-primary">{g.k}</span>
              <span className="mt-1.5 block text-[.82rem] leading-snug text-white/95">{g.c}</span>
            </span>
          </button>
        ))}
      </div>
      <style>{`@keyframes gIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}`}</style>

      <Reveal delay={120} className="mt-10 flex justify-end">
        <Link to="/gallery" className="btn btn-ghost">
          <span>View the Full Gallery <Arrow /></span>
        </Link>
      </Reveal>

      <Lightbox
        items={gallery}
        index={box}
        onClose={() => setBox(null)}
        onNav={(d) => setBox((v) => (v + d + gallery.length) % gallery.length)}
      />
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function Faq() {
  return (
    <section className="border-t hairline bg-ink">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal kind="left">
          <div className="sticky top-32">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="kicker">FAQ</span>
            </div>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)]">
              Frequently<br />asked<br /><span className="text-primary">questions.</span>
            </h2>
            <p className="body-copy mt-6 max-w-xs !text-[.9rem]">
              Still unsure? One call is usually faster than a form.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================ */
export default function Home() {
  return (
    <>
      <Seo
        title="Adhavan Coach — Ambulance Fabrication in Chennai | AIS-125 Builds"
        desc="Over a decade of ambulance fabrication and vehicle customization in Chennai. BLS, ALS, neonatal and multi-stretcher builds to AIS-125 standards, delivered on time."
        path="/"
      />
      <Hero />
      <Intro />
      <Process />
      <PackagePreview />
      <Gallery />
      <Faq />
      <CtaBand />
    </>
  );
}
