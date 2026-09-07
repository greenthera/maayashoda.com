import { useLanguage } from "../i18n/LanguageProvider";
import type { PageKey } from "../lib/paths";
import { PageHead } from "../components/layout/PageHead";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { ringStyle } from "../lib/decor";

export default function NotFoundPage() {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={t.notFound.title} />
      <section className="bg-paper animate-fade-up flex min-h-[68vh] items-center" style={ringStyle()}>
        <div className="mx-auto w-full max-w-[1280px] px-5 py-20">
          <div className="flex max-w-[620px] flex-col gap-6.5">
            <svg viewBox="0 0 260 90" className="block h-auto w-[220px]" role="presentation" aria-hidden="true">
              <path d="M6 74C48 74 46 20 92 20s44 54 86 54 44-54 76-54" fill="none" stroke="#cfc8d9" strokeWidth="1.6" strokeDasharray="5 8" strokeLinecap="round" />
              <circle cx="6" cy="74" r="5" fill="#948aac" />
              <circle cx="254" cy="20" r="6" fill="#ea4885" />
            </svg>
            <div className="flex flex-col gap-3.5">
              <h1 className="text-ink text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                <AnimatedWords text={t.notFound.h1} />
              </h1>
              <p className="text-muted text-[17.5px] leading-relaxed">{t.notFound.lead}</p>
            </div>
            <Button to={paths.home} className="self-start">
              {t.cta.home}
            </Button>
            <div className="border-border flex flex-col gap-3.5 border-t pt-3.5">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.notFound.linksTitle}</span>
              <ul className="flex flex-wrap gap-2.5">
                {t.notFound.links.map((l) => (
                  <li key={l.t}>
                    <Button to={paths[l.p as PageKey] ?? paths.home} variant="outline" className="min-h-[46px] text-[14.5px]">
                      {l.t}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
