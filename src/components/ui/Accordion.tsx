import { useState } from "react";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="border-border flex flex-col border-t">
      {items.map((row, i) => {
        const isOpen = open === i;
        return (
          <li key={row.q} className="border-border border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-5 px-1 py-5 text-left"
            >
              <span className={`text-[16.5px] font-semibold leading-snug transition-colors ${isOpen ? "text-brand-strong" : "text-ink"}`}>{row.q}</span>
              <span
                className={`mt-px flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full transition-colors duration-200 ${
                  isOpen ? "bg-brand-tint text-brand-strong" : "bg-surface-2 text-ink"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" className={`origin-center transition-all duration-300 ease-out ${isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`} />
                </svg>
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className={`text-muted px-1 pb-6 pr-11 text-[15.5px] leading-[1.7] transition-opacity duration-200 ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}>
                  {row.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
