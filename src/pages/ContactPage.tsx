import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { EnquiryForm } from "../components/forms/EnquiryForm";
import { ringStyle } from "../lib/decor";

export default function ContactPage() {
  const { t, paths } = useLanguage();

  const routeMeta: { to: string }[] = [
    { to: paths.donor },
    { to: "#enquiry" },
    { to: paths.support },
    { to: paths.support },
  ];

  const quickLinks = [
    { to: paths.about, label: t.nav.about },
    { to: paths.van, label: t.nav.van },
    { to: paths.partners, label: t.nav.partners },
    { to: paths.faqs, label: t.nav.faqs },
  ];

  return (
    <>
      <PageHead title={t.contact.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-12 sm:px-5 sm:pb-18 sm:pt-18">
          <div className="flex max-w-[720px] flex-col gap-5">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.07] tracking-[-0.035em]">
              <AnimatedWords text={t.contact.h1} />
            </h1>
            <p className="text-muted max-w-[620px] text-base leading-relaxed sm:text-[18.5px]">{t.contact.lead}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mb-9 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.contact.routeEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.7rem,3vw,2.3rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.contact.routeTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {t.contact.routes.map((r, i) => {
            const accent = i === 0;
            return (
              <li
                key={r.t}
                className={`flex flex-col gap-2.5 rounded-[18px] p-5 sm:rounded-[20px] sm:p-6.5 ${accent ? "bg-brand-tint border border-brand-tint-border" : "border-border card-shadow border bg-paper"}`}
              >
                <span className="text-ink text-[17px] font-semibold">{r.t}</span>
                <span className={`text-[14.5px] leading-[1.65] ${accent ? "text-brand-soft" : "text-muted"}`}>{r.d}</span>
                {routeMeta[i].to.startsWith("#") ? (
                  <a href={routeMeta[i].to} className={`mt-1.5 text-[14.5px] font-semibold ${accent ? "text-brand-strong" : "text-brand"}`}>
                    {r.cta} →
                  </a>
                ) : (
                  <Button to={routeMeta[i].to} variant="text" arrow className={`mt-1.5 ${accent ? "text-brand-strong!" : ""}`}>
                    {r.cta}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="tint" border="top">
        <div className="grid grid-cols-1 items-start gap-11 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4.5">
              <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.contact.optionsTitle}</h2>
              <ul className="flex flex-col">
                {t.contact.options.map((o) => (
                  <li key={o.t} className="border-border flex flex-col items-start gap-1.5 border-b py-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-5">
                    <span className="text-ink text-[15px] font-semibold">{o.t}</span>
                    <span className="text-muted text-left text-[15px] min-[480px]:text-right">{o.d}</span>
                  </li>
                ))}
              </ul>
              <p className="text-faint text-[13px] leading-relaxed">{t.contact.optionsNote}</p>
            </div>

            <div className="card-shadow border-border flex flex-col gap-4 rounded-[18px] border bg-paper p-5 sm:rounded-[20px] sm:p-6.5">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.contact.primaryContactLabel}</span>
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}images/team/prashant-kariya.webp`}
                  alt={t.contact.primaryContactName}
                  width={72}
                  height={72}
                  className="border-border h-18 w-18 flex-none rounded-full border object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-ink text-[19px] font-bold tracking-[-0.02em]">{t.contact.primaryContactName}</span>
                  <a href={`mailto:${t.contact.primaryContactEmail}`} className="text-brand hover:text-brand-hover text-[14px] font-semibold break-all">
                    {t.contact.primaryContactEmail}
                  </a>
                </div>
              </div>
              <span className="text-faint text-[13.5px] leading-relaxed">{t.contact.primaryContactNote}</span>
            </div>

            <div className="card-shadow bg-surface-2 flex flex-col gap-4 rounded-[18px] p-5 sm:rounded-[20px] sm:p-6.5">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.contact.projectTitle}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-ink text-[17px] font-semibold">Maa Yashoda</span>
                <span className="text-muted text-[14.5px]">{t.grant.number}</span>
              </div>
              <ul className="border-border flex flex-wrap gap-x-4.5 gap-y-2 border-t pt-1.5">
                {quickLinks.map((l) => (
                  <li key={l.to}>
                    <Button to={l.to} variant="text" className="text-sm">
                      {l.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="enquiry" className="card-shadow border-border flex flex-col gap-5 rounded-[22px] border bg-paper p-5 sm:gap-6.5 sm:rounded-3xl sm:p-7.5">
            <div className="flex flex-col gap-1.5">
              <Eyebrow>{t.contact.formEyebrow}</Eyebrow>
              <h2 className="text-ink text-[22px] font-bold tracking-[-0.02em]">{t.contact.formTitle}</h2>
            </div>
            <EnquiryForm variant="contact" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="bg-surface-2 card-shadow flex flex-col gap-3.5 rounded-[20px] p-5 sm:rounded-[22px] sm:p-7.5">
            <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.partners.joinTitle}</h2>
            <p className="text-muted text-[15.5px] leading-[1.7]">{t.partners.joinBody}</p>
            <Button to={paths.support} variant="text" arrow className="mt-1 self-start">
              {t.cta.explorePartnership}
            </Button>
          </div>
          <div className="bg-surface-2 card-shadow flex flex-col gap-3.5 rounded-[20px] p-5 sm:rounded-[22px] sm:p-7.5">
            <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.contact.faqTitle}</h2>
            <p className="text-muted text-[15.5px] leading-[1.7]">{t.contact.faqBody}</p>
            <Button to={paths.faqs} variant="text" arrow className="mt-1 self-start">
              {t.cta.visitFaqs}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-4.5 text-center">
          <h2 className="max-w-[580px] text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.14] tracking-[-0.03em] text-paper">{t.contact.finalTitle}</h2>
          <p className="max-w-[500px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.contact.finalBody}</p>
          <Button to={paths.donor} className="mt-1.5">
            {t.cta.donor}
          </Button>
        </div>
      </Section>
    </>
  );
}
