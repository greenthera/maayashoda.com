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
              <span className="text-ink text-[16.5px] font-semibold leading-snug">{row.q}</span>
              <span className="bg-surface-2 mt-px flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-ink" aria-hidden="true">
                  <path d="M5 12h14" />
                  {!isOpen && <path d="M12 5v14" />}
                </svg>
              </span>
            </button>
            {isOpen && <p className="text-muted px-1 pb-6 pr-11 text-[15.5px] leading-[1.7]">{row.a}</p>}
          </li>
        );
      })}
    </ul>
  );
}
