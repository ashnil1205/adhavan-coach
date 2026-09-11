import { useEffect, useState } from "react";
import { contact, waLink, telLink } from "../data/site";

/* Sticky quick-contact dock. Appears once you're past the hero,
   because that's roughly when someone decides to reach out. */
export default function Dock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const upd = () => { raf = 0; setShow(scrollY > innerHeight * 0.75); };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener("scroll", on, { passive: true });
    upd();
    return () => removeEventListener("scroll", on);
  }, []);

  const base = {
    transition: "transform .7s cubic-bezier(.16,1,.32,1), opacity .5s ease",
    transform: show ? "translateY(0)" : "translateY(140%)",
    opacity: show ? 1 : 0,
    pointerEvents: show ? "auto" : "none",
  };

  return (
    <div className="fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-2.5" style={base}>
      <a href={telLink(contact.phones[0])} aria-label={`Call ${contact.phones[0]}`}
         className="group flex h-12 w-12 items-center justify-center border hairline bg-bg/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,.35)] backdrop-blur-md transition-all duration-500 hover:border-fg hover:bg-fg"
         style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
             className="text-fg transition-colors duration-500 group-hover:text-bg" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z"
                fill="currentColor" />
        </svg>
      </a>

      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp"
         className="group relative flex h-14 items-center gap-3 overflow-hidden bg-primary px-4 text-white transition-[padding] duration-500"
         style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }}>
        <span className="absolute inset-0 translate-y-full bg-fg transition-transform duration-500 group-hover:translate-y-0"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.32,1)" }} />
        <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
             className="relative z-10 transition-colors duration-500 group-hover:text-bg">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.6 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7s1.5-.6 1.7-1.2c.2-.6.2-1.2.15-1.3s-.2-.2-.45-.3l-1.6-.8c-.2-.1-.4-.15-.55.1l-.8 1c-.15.2-.3.2-.55.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.35-1.7c-.15-.25 0-.4.1-.5l.4-.5c.1-.15.15-.25.2-.4a.4.4 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.55-.4z" />
        </svg>
        <span className="relative z-10 hidden text-[.65rem] font-semibold uppercase tracking-[.18em] transition-colors duration-500 group-hover:text-bg sm:inline">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
