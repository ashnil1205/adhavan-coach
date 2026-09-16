import { Link } from "react-router-dom";
import { contact, waLink, telLink, mailLink, mapsLink, fmtPhone } from "../data/site";
import { RollLink, Arrow } from "./Bits";
import Marquee from "./Marquee";

const COLS = [
  {
    h: "Pages",
    links: [
      { t: "Home", to: "/" },
      { t: "About Us", to: "/about" },
      { t: "Approach", to: "/approach" },
      { t: "Packages", to: "/packages" },
      { t: "Why Us", to: "/why-us" },
      { t: "Contact", to: "/contact" },
    ],
  },
  {
    h: "Builds",
    links: [
      { t: "ACP Seat with PVC", to: "/packages#acp-seat-with-pvc" },
      { t: "Basic — BLS", to: "/packages#basic-bls" },
      { t: "Classic 1", to: "/packages#classic-1" },
      { t: "Classic 2", to: "/packages#classic-2" },
      { t: "Equipped ALS", to: "/packages#equipped" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t hairline bg-ink">
      <div className="border-b hairline py-5">
        <Marquee
          slow
          items={[
            "AIS-125 Parts 1 & 2",
            "Ambulance Fabrication",
            "Chennai · Tamil Nadu",
            "BLS · ALS · Neonatal",
            "Since 2012",
            "Vehicle Customization",
          ]}
        />
      </div>

      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Link to="/" className="mb-7 flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path d="M9.6 3h4.8v5.6H20v4.8h-5.6V19H9.6v-5.6H4V8.6h5.6z" className="fill-primary" />
            </svg>
            <span className="text-[.9rem] font-bold uppercase tracking-[.2em]">
              Adhavan <span className="text-primary">Coach</span>
            </span>
          </Link>
          <p className="body-copy max-w-xs !text-[.95rem]">
            Ambulance fabrication and vehicle customization in Chennai. Built to
            AIS-125 standards and delivered on time.
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost mt-8 !py-3.5 !px-5">
            <span>WhatsApp <Arrow /></span>
          </a>
        </div>

        {COLS.map((c) => (
          <div key={c.h}>
            <h3 className="kicker mb-6 !text-fg/60">{c.h}</h3>
            <ul className="flex flex-col gap-3.5">
              {c.links.map((l) => (
                <li key={l.t}>
                  <RollLink to={l.to} className="text-[.95rem] text-muted transition-colors duration-400 hover:text-fg">
                    {l.t}
                  </RollLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="kicker mb-6 !text-fg/60">Contact</h3>
          <address className="not-italic">
            <p className="body-copy !text-[.95rem] !leading-relaxed">
              {contact.addressLines.map((l) => (<span key={l}>{l}<br /></span>))}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={telLink(p)} className="ul-grow text-[.95rem] text-muted transition-colors duration-400 hover:text-fg">
                    +91 {fmtPhone(p)}
                  </a>
                </li>
              ))}
              <li>
                <a href={mailLink()} className="ul-grow break-all text-[.95rem] text-muted transition-colors duration-400 hover:text-fg">
                  {contact.email}
                </a>
              </li>
              <li className="pt-2">
                <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                   className="kicker ul-grow !text-primary">Get Directions</a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t hairline py-7 text-[.7rem] tracking-[.14em] uppercase text-fg/55 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Adhavan Coach. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 bg-primary beacon" /> Red Hills, Chennai — 600052
        </span>
      </div>
    </footer>
  );
}
