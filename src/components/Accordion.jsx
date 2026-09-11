import { useState } from "react";
import { Plus } from "./Bits";

export default function Accordion({ items, startOpen = 0 }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className="border-t hairline">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc border-b hairline ${isOpen ? "open" : ""}`}>
            <button
              className="group flex w-full items-start gap-6 py-7 text-left transition-colors duration-500 hover:text-primary md:py-8"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="kicker num mt-1.5 shrink-0 !text-fg/55 transition-colors duration-500 group-hover:!text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[clamp(1.05rem,2.1vw,1.45rem)] font-medium leading-snug tracking-[-.02em]">
                {it.q}
              </span>
              <span className="acc-sign mt-1.5 shrink-0 text-fg/62 group-hover:text-primary">
                <Plus />
              </span>
            </button>
            <div className="acc-body">
              <div>
                <p className="body-copy max-w-3xl pb-8 pl-0 pr-8 md:pl-[3.6rem]">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
