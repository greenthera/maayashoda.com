import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { StepList } from "../components/ui/StepList";
import { ringStyle } from "../lib/decor";

export default function SupportPage() {
  const { t, paths } = useLanguage();
  const phone = t.contact.options[0];

  return (
    <>
      <PageHead title={t.support.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-18">
          <div className="flex max-w-[780px] flex-col gap-5.5">
            <Eyebrow>{t.support.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.07] tracking-[-0.035em]">{t.support.h1}</h1>
            <p className="text-muted max-w-[680px] text-[18.5px] leading-relaxed">{t.support.lead}</p>
            <Button href="#ways" variant="outline" className="mt-1.5 self-start">
              {t.cta.exploreWays}
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>{t.support.whyEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[400px] text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.support.whyTitle}</h2>
          </div>
          <p className="text-muted max-w-[620px] text-[17px] leading-[1.7]">{t.support.whyBody}</p>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.support.areasEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.support.areasTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {t.support.areas.map((a) => (
            <li key={a.t} className="card-shadow flex flex-col gap-2 rounded-[18px] bg-paper p-6">
              <span className="text-ink text-[16.5px] font-semibold">{a.t}</span>
              <span className="text-muted text-[14.5px] leading-[1.65]">{a.d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="ways">
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.support.waysEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.support.waysTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.support.ways.map((w, i) => (
            <li key={w.t} className="card-shadow border-border flex flex-col gap-3 rounded-[20px] border p-7">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{`0${i + 1}`}</span>
              <span className="text-ink text-[17.5px] font-semibold">{w.t}</span>
              <span className="text-muted text-[15px] leading-[1.65]">{w.d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" border="both">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="card-shadow border-border flex flex-col gap-3 rounded-[20px] border bg-paper p-7.5">
            <Eyebrow>{t.support.finEyebrow}</Eyebrow>
            <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.support.finTitle}</h2>
            <p className="text-muted text-[15.5px] leading-[1.7]">{t.support.finBody}</p>
          </div>
          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col gap-2.5">
              <Eyebrow>{t.support.csrEyebrow}</Eyebrow>
              <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.support.csrTitle}</h2>
              <p className="text-muted text-[15.5px] leading-[1.7]">{t.support.csrBody}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <Eyebrow>{t.support.transEyebrow}</Eyebrow>
              <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.support.transTitle}</h2>
              <p className="text-muted text-[15.5px] leading-[1.7]">{t.support.transBody}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="enquiry">
        <div className="card-shadow border-border mx-auto grid max-w-[900px] grid-cols-1 items-start gap-9 rounded-3xl border bg-paper p-8 sm:p-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow>{t.support.formEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.support.formTitle}</h2>
            <p className="text-muted text-base leading-[1.7]">{t.support.formLead}</p>
          </div>
          <div className="flex flex-col gap-4.5">
            <a
              href="tel:+910000000000"
              className="bg-brand text-paper hover:bg-brand-hover flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl px-6.5 text-base font-semibold hover:-translate-y-px"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
              </svg>
              <span>{t.cta.talkToTeam}</span>
            </a>
            <div className="card-shadow border-border flex flex-col gap-1 rounded-2xl border bg-surface-1 px-5 py-4.5">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{phone.t}</span>
              <span className="text-ink text-lg font-semibold">{phone.d}</span>
            </div>
            <span className="text-faint text-[13px] leading-relaxed">{t.contact.optionsNote}</span>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="flex flex-col gap-8">
          <Eyebrow>{t.support.nextEyebrow}</Eyebrow>
          <StepList columns={4} steps={t.support.nextSteps.map((label) => ({ label }))} />
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[620px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper">{t.support.finalTitle}</h2>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.support.finalBody}</p>
          <Button to={paths.donor} className="mt-1.5">
            {t.cta.donor}
          </Button>
        </div>
      </Section>
    </>
  );
}
