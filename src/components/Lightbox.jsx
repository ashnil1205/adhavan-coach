import { useEffect, useCallback } from "react";

export default function Lightbox({ items, index, onClose, onNav }) {
  const open = index !== null && index >= 0;

  const key = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    },
    [open, onClose, onNav]
  );

  useEffect(() => {
    addEventListener("keydown", key);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [key, open]);

  if (!open) return null;
  const it = items[index];

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col bg-bg/97 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      style={{ animation: "fadeIn .3s ease" }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}
               @keyframes popIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}`}</style>

      <div className="flex items-center justify-between border-b hairline px-5 py-4 md:px-10">
        <span className="kicker num">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button onClick={onClose} className="kicker ul-grow !text-fg hover:!text-primary">
          Close ✕
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-10">
        <img
          key={it.s}
          src={it.s}
          alt={it.c}
          className="max-h-full max-w-full object-contain"
          style={{ animation: "popIn .45s cubic-bezier(.16,1,.32,1)" }}
        />
        <button
          onClick={() => onNav(-1)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 border hairline bg-bg/80 px-4 py-6 text-fg/70 backdrop-blur-sm transition-colors duration-400 hover:border-primary hover:text-primary md:left-6"
        >‹</button>
        <button
          onClick={() => onNav(1)}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 border hairline bg-bg/80 px-4 py-6 text-fg/70 backdrop-blur-sm transition-colors duration-400 hover:border-primary hover:text-primary md:right-6"
        >›</button>
      </div>

      <div className="flex items-center gap-4 border-t hairline px-5 py-4 md:px-10">
        <span className="kicker !text-primary">{it.k}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="text-sm text-muted">{it.c}</span>
      </div>
    </div>
  );
}
