import { contact, faqs, waLink, telLink, mailLink, mapsLink, fmtPhone } from "../data/site";
import PageHero from "./PageHero";
import Reveal from "../components/Reveal";
import { SectionHead, Arrow } from "../components/Bits";
import Magnetic from "../components/Magnetic";
import Accordion from "../components/Accordion";
import Seo, { LocalBusinessJsonLd } from "../components/Seo";

/* ---- the three ways to reach the workshop ---- */
const CHANNELS = [
  {
    n: "01",
    k: "Fastest",
    t: "WhatsApp",
    v: "Send your requirement",
    d: "Base vehicle, BLS or ALS, equipment list — we'll come back with a specification-based quote.",
    href: waLink(),
    ext: true,
    accent: true,
  },
  {
    n: "02",
    k: "Direct",
    t: "Phone",
    v: contact.phones.map((p) => `+91 ${fmtPhone(p)}`).join("  ·  "),
    d: "Monday to Saturday. One call is usually faster than a form.",
    href: telLink(contact.phones[0]),
  },
  {
    n: "03",
    k: "Formal",
    t: "Email",
    v: contact.email,
    d: "Good for tender documents, drawings and long equipment lists.",
    href: mailLink(),
  },
];

function Channels() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead kicker="Get in Touch" index="01"
        lines={["Three ways", "to reach us."]}
        lede="No forms that disappear into an inbox. Pick whichever suits how you work."
        className="mb-14 max-w-3xl" />

      <div className="grid gap-px border hairline lg:grid-cols-3">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.n} delay={i * 100}>
            <a href={c.href}
               target={c.ext ? "_blank" : undefined}
               rel={c.ext ? "noopener noreferrer" : undefined}
               className="group relative flex h-full flex-col justify-between overflow-hidden border-b border-r hairline p-8 transition-colors duration-600 hover:bg-surface md:p-10">
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="kicker num !text-primary">{c.n}</span>
                  <span className="kicker !text-[.56rem] !text-fg/58">{c.k}</span>
                </div>
                <h3 className="display text-[clamp(1.6rem,3.4vw,2.3rem)] transition-colors duration-500 group-hover:text-primary">
                  {c.t}
                </h3>
                <p className="mt-4 break-words text-[.95rem] text-fg/85">{c.v}</p>
                <p className="body-copy mt-3 !text-[.86rem]">{c.d}</p>
              </div>
              <span className="mt-10 flex items-center gap-2 text-[.65rem] font-semibold uppercase tracking-[.2em] text-fg/55 transition-colors duration-500 group-hover:text-primary">
                Open
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}><Arrow /></span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---- address + hours + map ---- */
function Visit() {
  return (
    <section className="border-y hairline bg-ink">
      <div className="shell grid gap-0 lg:grid-cols-[1fr_1.15fr]">
        <div className="border-x hairline p-8 py-20 md:p-14">
          <Reveal kind="fade" className="mb-8 flex items-center gap-4">
            <span className="h-1.5 w-1.5 bg-primary beacon" />
            <span className="kicker">Visit the workshop</span>
          </Reveal>

          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">
              {contact.name}
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-9">
            <span className="kicker mb-4 block !text-fg/60">Address</span>
            <address className="not-italic text-[1.02rem] leading-[2] text-muted">
              {contact.addressLines.map((l) => (<span key={l}>{l}<br /></span>))}
            </address>
          </Reveal>

          <Reveal delay={180} className="mt-9">
            <span className="kicker mb-4 block !text-fg/60">Phone</span>
            <ul className="flex flex-col gap-2">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={telLink(p)} className="ul-grow text-[1.02rem] text-muted transition-colors duration-400 hover:text-fg">
                    +91 {fmtPhone(p)}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={230} className="mt-9">
            <span className="kicker mb-4 block !text-fg/60">Email</span>
            <a href={mailLink()} className="ul-grow break-all text-[1.02rem] text-muted transition-colors duration-400 hover:text-fg">
              {contact.email}
            </a>
          </Reveal>

          <Reveal delay={280} className="mt-9">
            <span className="kicker mb-4 block !text-fg/60">Business hours</span>
            <ul className="max-w-sm">
              {contact.hours.map((h) => (
                <li key={h.d} className="flex items-baseline justify-between gap-6 border-b hairline-faint py-3">
                  <span className="text-[.95rem] text-muted">{h.d}</span>
                  <span className="text-[.95rem] font-medium text-fg/90">{h.t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={330} className="mt-10 flex flex-wrap gap-3">
            <Magnetic strength={0.22}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>WhatsApp Us <Arrow /></span>
              </a>
            </Magnetic>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>Get Directions</span>
            </a>
          </Reveal>
        </div>

        {/* map */}
        <Reveal kind="fade" className="relative min-h-[26rem] border-r hairline">
          <iframe
            title="Adhavan Coach location on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, filter: "grayscale(.85) contrast(1.04)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className="pointer-events-none absolute left-5 top-5 z-[2] bg-fg/85 px-3 py-2 text-[.58rem] font-semibold uppercase tracking-[.2em] text-bg backdrop-blur-sm">
            Red Hills · Chennai 600052
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export default function Contact() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.name,
    description:
      "Ambulance fabrication and vehicle customization in Chennai, built to AIS-125 standards.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 123/1, F2, MGR Street, Ambedkar Nagar, Red Hills",
      addressLocality: "Chennai",
      postalCode: "600052",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    telephone: contact.phones.map((p) => `+91${p}`),
    email: contact.email,
    areaServed: "Tamil Nadu, India",
  };

  return (
    <>
      <Seo
        title="Contact Adhavan Coach — Ambulance Fabrication, Red Hills, Chennai"
        desc="Visit our Chennai workshop or send your requirement on WhatsApp. No. 123/1, F2, MGR Street, Ambedkar Nagar, Red Hills, Chennai 600052. Phone 88387 44495."
        path="/contact"
      />
      <LocalBusinessJsonLd data={ld} />

      <PageHero
        kicker="Contact"
        index="05 / 06"
        lines={["Have questions", "about your", "ambulance build?"]}
        lede="Visit our Chennai facility to discuss your requirements with our team."
        img="/img/exterior-red-traveller.jpg"
        focus="50% 46%"
        alt="Force Traveller emergency ambulance outside the Adhavan Coach workshop"
      />

      <Channels />
      <Visit />

      <section className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal kind="left">
          <div className="sticky top-32">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="kicker">FAQ</span>
            </div>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)]">
              Frequently<br />asked<br /><span className="text-primary">questions.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Accordion items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
