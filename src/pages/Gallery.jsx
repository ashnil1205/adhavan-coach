import { useEffect, useMemo, useState } from "react";
import photos from "../data/gallery.json";
import { waLink } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { Arrow } from "../components/Bits";
import Magnetic from "../components/Magnetic";
import Lightbox from "../components/Lightbox";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";

/* Distribute photos across N columns by running height, so the columns
   end level and reading order still runs left-to-right. */
function columnise(items, n) {
  const cols = Array.from({ length: n }, () => ({ h: 0, items: [] }));
  items.forEach((p, i) => {
    const c = cols.reduce((a, b) => (a.h <= b.h ? a : b));
    c.items.push({ ...p, i });
    c.h += p.h / p.w;
  });
  return cols.map((c) => c.items);
}

function useColumns() {
  const [n, setN] = useState(() =>
    typeof window === "undefined" ? 3 : innerWidth < 640 ? 2 : innerWidth < 1024 ? 3 : 4
  );
  useEffect(() => {
    const on = () => setN(innerWidth < 640 ? 2 : innerWidth < 1024 ? 3 : 4);
    addEventListener("resize", on);
    return () => removeEventListener("resize", on);
  }, []);
  return n;
}

function Grid({ items, onOpen }) {
  const n = useColumns();
  const cols = useMemo(() => columnise(items, n), [items, n]);

  return (
    <div className="grid gap-3 md:gap-4 lg:gap-5" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          {col.map((p) => (
            <Reveal key={p.id} delay={(p.i % 8) * 50}>
              <button
                onClick={() => onOpen(p.i)}
                className="media brackets block w-full border hairline"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
                aria-label={p.c || `Photo ${p.i + 1}`}
              >
                <img src={p.sm} alt={p.c || ""} loading="lazy" decoding="async" />
                {p.c && (
                  <span className="media-cap text-left">
                    <span className="block text-[.82rem] leading-snug text-white/95">{p.c}</span>
                  </span>
                )}
                <span className="absolute right-3 top-3 z-[3] bg-fg/75 px-2 py-1 text-[.55rem] font-semibold tracking-[.2em] text-bg num">
                  {String(p.i + 1).padStart(2, "0")}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}

function Empty() {
  return (
    <Reveal className="border hairline bg-surface p-10 text-center md:p-16">
      <span className="kicker">Coming soon</span>
      <p className="lede mx-auto mt-4 max-w-md">
        Build photos are on their way. In the meantime, talk to us about your requirement.
      </p>
    </Reveal>
  );
}

export default function Gallery() {
  const [box, setBox] = useState(null);
  const items = photos.map((p) => ({ ...p, k: "Build" }));

  return (
    <>
      <Seo
        title="Gallery — Ambulance Builds by Adhavan Coach, Chennai"
        desc="Photographs of BLS, ALS, neonatal and multi-stretcher ambulances fabricated by Adhavan Coach in Chennai — patient cabins, electrical fit-outs and finished exteriors."
        path="/gallery"
      />
      <PageHero
        kicker="Gallery"
        index="06 / 07"
        lines={["Work off", "the floor."]}
        lede={items.length
          ? `${items.length} photographs from the workshop and from vehicles in service.`
          : "Photographs from the workshop and from vehicles in service."}
      />

      <section className="shell py-16 md:py-24">
        {items.length ? <Grid items={items} onOpen={setBox} /> : <Empty />}

        <Reveal delay={160} className="mt-16 flex flex-wrap items-center gap-5 border-t hairline pt-10">
          <p className="lede !text-fg">Want a build like one of these?</p>
          <Magnetic strength={0.22}>
            <a href={waLink("Hi Adhavan Coach, I saw a build in your gallery and I'd like a quote for something similar.")}
               target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <span>Get a Quote <Arrow /></span>
            </a>
          </Magnetic>
        </Reveal>
      </section>

      <Lightbox
        items={items}
        index={box}
        onClose={() => setBox(null)}
        onNav={(d) => setBox((v) => (v + d + items.length) % items.length)}
      />

      <CtaBand
        lines={["Your build,", "photographed next."]}
        sub="Tell us the base vehicle and the fit-out level. We'll take it from there."
        primary="Start Your Build"
      />
    </>
  );
}
