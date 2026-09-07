import { useLanguage } from "../i18n/LanguageProvider";
import type { PageKey } from "../lib/paths";
import { PageHead } from "../components/layout/PageHead";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { ringStyle } from "../lib/decor";
import type { Content } from "../content";

type ThanksDoc = Content["thanks"]["donor"];

function ThankYouPage({ doc }: { doc: ThanksDoc }) {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={doc.title} />
      <section className="bg-surface-1 animate-fade-up flex min-h-[70vh] items-center" style={ringStyle()}>
        <div className="mx-auto w-full max-w-[1280px] px-5 py-20">
          <div className="mx-auto flex max-w-[680px] flex-col gap-7">
            <span aria-hidden="true" className="bg-brand-tint grid h-[62px] w-[62px] place-items-center rounded-full">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ea4885" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="flex flex-col gap-4">
              <h1 className="text-ink text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                <AnimatedWords text={doc.h1} />
              </h1>
              <p className="text-muted text-[18px] leading-relaxed">{doc.lead}</p>
            </div>

            {doc.steps.length > 0 ? (
              <ol className="card-shadow border-border flex flex-col rounded-[20px] border bg-paper px-6 py-2">
                {doc.steps.map((text, i) => (
                  <li key={text} className="border-surface-2 flex items-start gap-4 border-b py-4.5 last:border-b-0">
                    <span className="bg-surface-2 text-brand flex h-7 w-7 flex-none items-center justify-center rounded-full text-[13px] font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-ink pt-0.5 text-[15.5px] leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            ) : null}

            {doc.note ? (
              <p className="card-shadow bg-surface-2 text-ink rounded-2xl px-4.5 py-4 text-[15px] font-medium leading-relaxed">{doc.note}</p>
            ) : null}

            <div className="border-border flex flex-col gap-3.5 border-t pt-3">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{doc.linksTitle}</span>
              <ul className="flex flex-wrap gap-2.5">
                {doc.links.map((l) => (
                  <li key={l.t}>
                    <Button to={paths[l.p as PageKey] ?? paths.home} variant="outline" className="min-h-[46px] text-[14.5px]">
                      {l.t}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <Button to={paths.home} variant="text" arrow className="self-start">
              {t.cta.home}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function ThankYouDonorPage() {
  const { t } = useLanguage();
  return <ThankYouPage doc={t.thanks.donor} />;
}

export function ThankYouContactPage() {
  const { t } = useLanguage();
  return <ThankYouPage doc={t.thanks.contact} />;
}

export function ThankYouSupportPage() {
  const { t } = useLanguage();
  return <ThankYouPage doc={t.thanks.support} />;
}
