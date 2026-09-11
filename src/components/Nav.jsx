import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, waLink, telLink, fmtPhone } from "../data/site";
import { Arrow, RollLink } from "./Bits";
import Magnetic from "./Magnetic";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/approach", label: "Approach" },
  { to: "/packages", label: "Packages" },
  { to: "/why-us", label: "Why Us" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);
  const loc = useLocation();

  useEffect(() => setMenu(false), [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  useEffect(() => {
    let raf = 0;
    const upd = () => {
      raf = 0;
      const y = scrollY;
      setSolid(y > 24);
      setHidden(y > 220 && y > last.current);
      last.current = y;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[80] transition-[transform,background-color,border-color,backdrop-filter] duration-700"
        style={{
          transform: hidden && !menu ? "translateY(-101%)" : "translateY(0)",
          transitionTimingFunction: "cubic-bezier(.16,1,.32,1)",
          backgroundColor: solid || menu ? "oklch(99.2% .001 260 / .86)" : "transparent",
          backdropFilter: solid || menu ? "blur(14px)" : "none",
          borderBottom: `1px solid ${solid || menu ? "var(--line)" : "transparent"}`,
        }}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between">
          {/* wordmark */}
          <Link to="/" className="group flex items-center gap-3" aria-label="Adhavan Coach — home">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
                <path d="M9.6 3h4.8v5.6H20v4.8h-5.6V19H9.6v-5.6H4V8.6h5.6z"
                      className="fill-primary transition-transform duration-700 group-hover:rotate-90"
                      style={{ transformOrigin: "12px 11px", transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
              </svg>
            </span>
            <span className="whitespace-nowrap text-[.78rem] font-bold uppercase tracking-[.16em] sm:text-[.9rem] sm:tracking-[.2em]">
              Adhavan <span className="text-primary">Coach</span>
            </span>
          </Link>

          {/* desktop links */}
          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) =>
                  `kicker !text-[.66rem] transition-colors duration-500 ${
                    isActive ? "!text-fg" : "hover:!text-fg"
                  }`
                }>
                {({ isActive }) => (
                  <span className="relative">
                    <span className="roll">
                      <span>{l.label}</span>
                      <span aria-hidden="true">{l.label}</span>
                    </span>
                    <span className="absolute -bottom-2 left-0 h-px w-full origin-left bg-primary transition-transform duration-500"
                          style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)",
                                   transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <Magnetic strength={0.2}>
                <a href={waLink()} target="_blank" rel="noopener noreferrer"
                   className="btn btn-primary !py-3.5 !px-6">
                  <span>Get a Quote <Arrow /></span>
                </a>
              </Magnetic>
            </span>

            {/* burger */}
            <button onClick={() => setMenu((v) => !v)}
              aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}
              className="relative z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[6px] border hairline lg:hidden">
              <span className="block h-px w-5 bg-fg transition-transform duration-500"
                    style={{ transform: menu ? "translateY(3.5px) rotate(45deg)" : "none",
                             transitionTimingFunction: "cubic-bezier(.76,0,.24,1)" }} />
              <span className="block h-px w-5 bg-fg transition-transform duration-500"
                    style={{ transform: menu ? "translateY(-3.5px) rotate(-45deg)" : "none",
                             transitionTimingFunction: "cubic-bezier(.76,0,.24,1)" }} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className="fixed inset-0 z-[75] bg-bg lg:hidden"
        style={{
          clipPath: menu ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path .8s cubic-bezier(.76,0,.24,1)",
          pointerEvents: menu ? "auto" : "none",
        }}
      >
        <div className="shell flex h-full flex-col justify-center pt-[var(--nav-h)]">
          <nav className="flex flex-col">
            {LINKS.map((l, i) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className="group flex items-baseline gap-5 border-b hairline-faint py-5">
                <span className="kicker num !text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className="display text-[clamp(2rem,10vw,3.2rem)] transition-[transform,color] duration-600 group-hover:translate-x-2 group-hover:text-primary"
                  style={{
                    opacity: menu ? 1 : 0,
                    transform: menu ? "none" : "translateY(24px)",
                    transition: `opacity .6s ${180 + i * 70}ms cubic-bezier(.16,1,.32,1), transform .6s ${180 + i * 70}ms cubic-bezier(.16,1,.32,1), color .4s`,
                  }}>
                  {l.label}
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary justify-center">
              <span>WhatsApp Us <Arrow /></span>
            </a>
            <RollLink href={telLink(contact.phones[0])} className="kicker !text-fg/70">
              Call {fmtPhone(contact.phones[0])}
            </RollLink>
          </div>
        </div>
      </div>
    </>
  );
}
