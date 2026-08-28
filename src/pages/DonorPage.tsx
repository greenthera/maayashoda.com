import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { Accordion } from "../components/ui/Accordion";
import { EnquiryForm } from "../components/forms/EnquiryForm";

export default function DonorPage() {
  const { t, paths } = useLanguage();
  const faqPreview = [t.faqs.groups[1].q[1], t.faqs.groups[2].q[0], t.faqs.groups[1].q[3], t.faqs.groups[2].q[1]];

  return (
    <>
      <PageHead title={t.donor.title} />

      <section className="bg-surface-1">
        <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-14">
          <div className="grid grid-cols-1 items-start gap-11 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-5">
                <Eyebrow>{t.donor.eyebrow}</Eyebrow>
                <h1 className="text-ink text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">{t.donor.h1}</h1>
                <p className="text-muted max-w-[520px] text-[17.5px] leading-[1.7]">{t.donor.lead}</p>
                <p className="bg-brand-tint card-shadow text-brand-soft flex max-w-[520px] items-start gap-3.5 rounded-2xl px-5 py-4.5 text-[15.5px] font-medium leading-snug">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#c02f68" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none" aria-hidden="true">
                    <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-3.2A5 5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
                  </svg>
                  <span>{t.donor.reassurance}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                <h2 className="text-ink text-xl font-semibold">{t.donor.whoTitle}</h2>
                <p className="text-muted text-[15.5px] leading-relaxed">{t.donor.whoBody}</p>
                <ul className="flex flex-col gap-3">
                  {t.donor.who.map((w) => (
                    <li key={w} className="flex items-start gap-3.5">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ea4885" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-ink text-base leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-faint text-[13.5px] leading-relaxed">{t.donor.whoNote}</p>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className="text-ink text-xl font-semibold">{t.donor.nextTitle}</h2>
                <ol className="flex flex-col">
                  {t.donor.next.map((s, i) => (
                    <li key={s.t} className="border-border flex items-start gap-4 border-b py-4.5">
                      <span className="border-border-strong text-brand flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border bg-paper text-[13px] font-semibold">
                        {i + 1}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-ink text-base font-semibold">{s.t}</span>
                        <span className="text-muted text-[14.5px] leading-relaxed">{s.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card-shadow border-border flex flex-col gap-3 rounded-[20px] border bg-paper p-6">
                <h2 className="text-ink text-[17px] font-semibold">{t.donor.privacyTitle}</h2>
                <p className="text-muted text-[14.5px] leading-[1.7]">{t.donor.privacyBody}</p>
                <Button to={paths.privacy} variant="text" arrow>
                  {t.footer.privacy}
                </Button>
              </div>
            </div>

            <div id="register" className="card-shadow border-border flex flex-col gap-6.5 rounded-3xl border bg-paper p-7.5">
              <div className="flex flex-col gap-2">
                <h2 className="text-ink text-[22px] font-bold tracking-[-0.02em]">{t.donor.formTitle}</h2>
                <p className="text-muted text-[15px] leading-relaxed">{t.donor.formLead}</p>
              </div>
              <EnquiryForm variant="donor" />
            </div>
          </div>
        </div>
      </section>

      <Section overlap={false} border="top">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>{t.faqs.eyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.donor.faqTitle}</h2>
            <Button to={paths.faqs} variant="text" arrow className="mt-1.5 self-start">
              {t.cta.viewAllFaqs}
            </Button>
          </div>
          <Accordion items={faqPreview} />
        </div>
      </Section>

      <Section tone="ink" overlap={false}>
        <div className="flex flex-col items-center gap-4.5 text-center">
          <h2 className="max-w-[600px] text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em] text-paper">{t.donor.finalTitle}</h2>
          <p className="max-w-[540px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.donor.finalBody}</p>
          <Button to={paths.contact} variant="outline-invert" className="mt-1.5">
            {t.cta.contact}
          </Button>
        </div>
      </Section>
    </>
  );
}
