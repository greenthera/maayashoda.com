import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { Accordion } from "../components/ui/Accordion";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { ringStyle } from "../lib/decor";

export default function FaqsPage() {
  const { t, paths } = useLanguage();
  const groups = t.faqs.groups.map((g, i) => ({ ...g, id: `faq-${i + 1}` }));

  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return groups;
    return groups
      .map((g) => ({ ...g, q: g.q.filter((row) => row.q.toLowerCase().includes(normalizedQuery) || row.a.toLowerCase().includes(normalizedQuery)) }))
      .filter((g) => g.q.length > 0);
  }, [groups, normalizedQuery]);

  const resultCount = filteredGroups.reduce((sum, g) => sum + g.q.length, 0);
  const resultLabel = resultCount === 1 ? t.faqs.searchResultsOne : t.faqs.searchResultsMany.replace("{count}", String(resultCount));

  return (
    <>
      <PageHead title={t.faqs.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto max-w-[1280px] px-5 pb-18 pt-18">
          <div className="flex max-w-[760px] flex-col gap-5">
            <Eyebrow>{t.faqs.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.07] tracking-[-0.035em]">
              <AnimatedWords text={t.faqs.h1} />
            </h1>
            <p className="text-muted max-w-[680px] text-[18px] leading-relaxed">{t.faqs.lead}</p>

            <div className="relative max-w-[480px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-faint pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.faqs.searchPlaceholder}
                aria-label={t.faqs.searchPlaceholder}
                className="border-border-strong bg-paper text-ink focus:ring-brand/[.18] focus:border-brand min-h-[50px] w-full rounded-xl border py-2.5 pl-11 pr-11 text-[15.5px] focus:outline-none focus:ring-[3px]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t.faqs.searchClear}
                  className="text-faint hover:text-ink hover:bg-surface-2 absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Section containerClassName="py-16 md:py-24 lg:py-24">
        {isSearching ? (
          <div className="flex min-w-0 flex-col gap-13">
            <p className="text-faint text-[13.5px] font-semibold uppercase tracking-[0.09em]">{resultLabel}</p>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((g) => (
                <div key={g.id} className="flex flex-col gap-4.5">
                  <h2 className="text-ink text-[clamp(1.4rem,2.4vw,1.85rem)] font-bold leading-[1.18] tracking-[-0.025em]">{g.c}</h2>
                  <Accordion items={g.q} />
                </div>
              ))
            ) : (
              <div className="border-border flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center">
                <h2 className="text-ink text-lg font-semibold">{t.faqs.searchNoResultsTitle}</h2>
                <p className="text-muted max-w-[420px] text-[15px] leading-relaxed">{t.faqs.searchNoResultsBody}</p>
                <button type="button" onClick={() => setQuery("")} className="text-brand hover:text-brand-hover mt-1 cursor-pointer text-[14.5px] font-semibold">
                  {t.faqs.searchClear}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-12">
            <nav aria-label="FAQ categories" className="flex flex-col gap-3.5 lg:sticky lg:top-24">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.faqs.jump}</span>
              <ul className="flex flex-col gap-0.5">
                {groups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="text-ink hover:text-brand block py-2 text-[14.5px] font-medium leading-snug">
                      {g.c}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex min-w-0 flex-col gap-13">
              {groups.map((g) => (
                <div key={g.id} id={g.id} className="scroll-mt-24 flex flex-col gap-4.5">
                  <h2 className="text-ink text-[clamp(1.4rem,2.4vw,1.85rem)] font-bold leading-[1.18] tracking-[-0.025em]">{g.c}</h2>
                  <Accordion items={g.q} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-4.5 text-center">
          <h2 className="max-w-[560px] text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.14] tracking-[-0.03em] text-paper">{t.faqs.finalTitle}</h2>
          <p className="max-w-[500px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.faqs.finalBody}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-3">
            <Button to={paths.donor}>{t.cta.donor}</Button>
            <Button to={paths.contact} variant="outline-invert">
              {t.cta.contact}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
