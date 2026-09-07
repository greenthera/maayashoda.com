import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { ringStyle } from "../lib/decor";
import type { Content } from "../content";

type LegalDoc = Content["privacy"] | Content["terms"] | Content["accessibility"];

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const { t, paths } = useLanguage();
  const sections = doc.sections.map((s, i) => ({ ...s, n: i + 1, id: `sec-${i + 1}` }));

  return (
    <>
      <PageHead title={doc.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-16">
          <div className="flex max-w-[680px] flex-col gap-3.5">
            <h1 className="text-ink text-[clamp(1.9rem,3.8vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              <AnimatedWords text={doc.h1} />
            </h1>
            <p className="text-faint text-sm font-medium">{doc.updated}</p>
            {doc.note ? (
              <p className="card-shadow border-border mt-1.5 rounded-2xl border bg-paper px-4.5 py-4 text-[14.5px] leading-[1.65] text-muted">{doc.note}</p>
            ) : null}
          </div>
        </div>
      </section>

      <Section containerClassName="py-14 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-12">
          <nav aria-label="Contents" className="flex flex-col gap-3 lg:sticky lg:top-24">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{doc.toc}</span>
            <ol className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink hover:text-brand block py-1.5 text-sm leading-snug">
                    {s.n}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 max-w-[680px] flex-col gap-10">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24 flex flex-col gap-3">
                <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                  {s.n}. {s.h}
                </h2>
                {s.p.map((para, i) => (
                  <p key={i} className="text-muted text-base leading-[1.75]">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint" border="top">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted text-[15.5px]">{t.contact.faqBody}</p>
          <Button to={paths.contact} variant="outline">
            {t.cta.contact}
          </Button>
        </div>
      </Section>
    </>
  );
}

export function PrivacyPage() {
  const { t } = useLanguage();
  return <LegalPage doc={t.privacy} />;
}

export function TermsPage() {
  const { t } = useLanguage();
  return <LegalPage doc={t.terms} />;
}

export function AccessibilityPage() {
  const { t } = useLanguage();
  return <LegalPage doc={t.accessibility} />;
}
