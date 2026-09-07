import { hostClubLogo, participatingClubLogos, healthcareImages, implementationLogo } from "../content/partnerAssets";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { ImageSlot } from "../components/ui/ImageSlot";
import { StepList } from "../components/ui/StepList";
import { ringStyle } from "../lib/decor";

export default function PartnersPage() {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={t.partners.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-18">
          <div className="flex max-w-[780px] flex-col gap-5.5">
            <Eyebrow>{t.partners.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.035em]">{t.partners.h1}</h1>
            <p className="text-muted max-w-[680px] text-[18.5px] leading-relaxed">{t.partners.lead}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.partners.ecoEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.partners.ecoTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:grid-cols-4">
          {t.partners.eco.map((e) => (
            <li key={e.t} className="card-shadow border-border flex flex-col gap-2.5 rounded-[20px] border p-6.5">
              <span className="text-ink text-[16.5px] font-semibold">{e.t}</span>
              <span className="text-muted text-[15px] leading-[1.65]">{e.d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="flex flex-col gap-8">
          <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.partners.rotaryTitle}</h2>

          <div className="flex flex-col gap-4">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.partners.hostLabel}</span>
            <div className="card-shadow border-border grid w-full max-w-2xl overflow-hidden rounded-2xl border bg-white min-[420px]:grid-cols-[180px_1fr]">
              <div className="flex h-36 items-center justify-center px-6 py-5">
                <ImageSlot src={hostClubLogo} label={t.partners.hostClub} fit="contain" compact className="h-full" />
              </div>
              <span className="text-ink border-border flex items-center justify-center border-t bg-surface-1 px-6 py-5 text-center text-lg font-semibold leading-snug min-[420px]:justify-start min-[420px]:border-l min-[420px]:border-t-0 min-[420px]:text-left">{t.partners.hostClub}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.partners.participatingLabel}</span>
            <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {t.partners.clubs.map((name, index) => (
                <li key={name} className="card-shadow border-border flex flex-col overflow-hidden rounded-2xl border bg-white text-center transition-shadow hover:shadow-md">
                  <div className="flex h-32 items-center justify-center px-5 py-5 sm:h-36 sm:px-6">
                    <ImageSlot src={participatingClubLogos[index]} label={name} fit="contain" compact className="h-full" />
                  </div>
                  <span className="text-ink border-border flex min-h-20 flex-1 items-center justify-center border-t bg-surface-1 px-4 py-4 text-[15px] font-semibold leading-snug">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.partners.reservedLabel}</span>
            <ul className="flex flex-wrap gap-2.5">
              {t.partners.reserved.map((r) => (
                <li key={r} className="text-faint rounded-full border border-dashed border-border-strong px-4.5 py-2.5 text-sm font-medium">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-10">
          <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.partners.healthTitle}</h2>
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {t.partners.health.map((h, index) => (
              <li key={h.n} className="card-shadow border-border flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md">
                <div className="flex h-36 items-center justify-center bg-white p-5">
                  <ImageSlot src={healthcareImages[index]} label={h.n} alt={index === 2 ? "Government Medical College Surat logo, parent institution of the Department of Pediatrics" : h.n} fit="contain" compact className="max-h-24 max-w-32" />
                </div>
                <div className="border-border flex flex-1 flex-col gap-2 border-t bg-surface-1 px-5 py-5 text-center">
                  <span className="text-brand-strong text-xs font-semibold uppercase tracking-[0.09em]">{h.r}</span>
                  <span className="text-ink text-base font-semibold leading-snug">{h.n}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-1 flex flex-col gap-4">
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.partners.implTitle}</h2>
            <div className="card-shadow border-border grid w-full max-w-2xl overflow-hidden rounded-2xl border bg-white min-[420px]:grid-cols-[180px_1fr]">
              <div className="flex h-36 items-center justify-center px-6 py-5">
                <ImageSlot src={implementationLogo} label={t.partners.impl.n} fit="contain" compact className="h-full" />
              </div>
              <span className="border-border flex flex-col justify-center gap-2 border-t bg-brand-tint px-6 py-5 text-center min-[420px]:border-l min-[420px]:border-t-0 min-[420px]:text-left">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.09em] text-[#c07a9c]">{t.partners.impl.r}</span>
                <span className="text-ink text-xl font-semibold tracking-[-0.02em]">{t.partners.impl.n}</span>
              </span>
            </div>
          </div>

          <p className="text-faint max-w-[680px] text-[13.5px] leading-relaxed">{t.partners.approvalNote}</p>
        </div>
      </Section>

      <Section tone="tint" border="both">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.partners.grantTitle}</h2>
            <p className="text-muted max-w-[520px] text-[16.5px] leading-[1.7]">{t.partners.grantBody}</p>
          </div>
          <div className="card-shadow border-border flex max-w-max flex-col gap-1 justify-self-start rounded-[20px] border bg-paper px-7 py-6.5">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.grant.badge}</span>
            <span className="text-ink text-[30px] font-bold tracking-[-0.025em]">GG2694832</span>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-11 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.partners.flowEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.partners.flowTitle}</h2>
        </div>
        <StepList steps={t.partners.flowSteps.map((label) => ({ label }))} />
      </Section>

      <Section tone="surface">
        <div className="flex max-w-[780px] flex-col items-start gap-5">
          <Eyebrow>{t.partners.joinEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.partners.joinTitle}</h2>
          <p className="text-muted text-[17px] leading-[1.7]">{t.partners.joinBody}</p>
          <Button to={paths.support} variant="outline" className="mt-1.5">
            {t.cta.exploreSupport}
          </Button>
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[620px] text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper">{t.partners.finalTitle}</h2>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.partners.finalBody}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-3">
            <Button to={paths.donor}>{t.cta.donor}</Button>
            <Button to={paths.support} variant="outline-invert">
              {t.cta.support}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
