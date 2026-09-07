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
          </div>
        </div>
      </section>

      <Section containerClassName="py-16 md:py-24 lg:py-24">
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
