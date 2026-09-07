import { hostClubLogo, participatingClubLogos, healthcareImages, implementationLogo } from "../content/partnerAssets";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { StepList } from "../components/ui/StepList";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { Reveal } from "../components/ui/Reveal";
import { ringStyle } from "../lib/decor";

export default function PartnersPage() {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={t.partners.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-14 sm:pt-16 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="flex max-w-[680px] flex-col gap-5.5">
            <Eyebrow>{t.partners.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.035em]">
              <AnimatedWords text={t.partners.h1} />
            </h1>
            <p className="text-muted text-[18.5px] leading-relaxed">{t.partners.lead}</p>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}images/partners/rotary-international.svg`}
            alt="Rotary International"
            width={280}
            height={280}
            className="mx-auto h-auto w-[clamp(150px,42vw,280px)] shrink-0 lg:mx-0 lg:justify-self-end"
          />
        </div>
      </section>

      <Section>
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.partners.ecoEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.partners.ecoTitle}</h2>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4" step={70}>
          {t.partners.eco.map((e) => (
            <li key={e.t} className="card-shadow border-border flex flex-col gap-2.5 rounded-[20px] border p-6.5">
              <span className="text-ink text-[16.5px] font-semibold">{e.t}</span>
              <span className="text-muted text-[15px] leading-[1.65]">{e.d}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section tone="surface">
        <div className="flex flex-col gap-10">
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.partners.rotaryTitle}</h2>

          <div className="card-shadow border-border relative grid w-full max-w-3xl overflow-hidden rounded-[24px] border bg-white sm:grid-cols-[240px_1fr]">
            <span aria-hidden="true" className="bg-brand absolute inset-y-0 left-0 w-1 sm:w-1.5" />
            <div className="border-border flex items-center justify-center border-b bg-surface-1 px-9 py-10 sm:border-b-0 sm:border-r">
              <img src={hostClubLogo} alt={t.partners.hostClub} className="max-h-20 w-auto max-w-[180px] object-contain" />
            </div>
            <div className="flex flex-col justify-center gap-2 px-8 py-8">
              <span className="text-brand-strong text-[11.5px] font-semibold uppercase tracking-[0.1em]">{t.partners.hostLabel}</span>
              <span className="text-ink text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-[26px]">{t.partners.hostClub}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.partners.participatingLabel}</span>
            <Reveal as="ul" className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {t.partners.clubs.map((name, index) => (
                <li
                  key={name}
                  className="card-shadow border-border flex flex-col overflow-hidden rounded-2xl border bg-white text-center transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="flex h-20 items-center justify-center px-6">
                    <img src={participatingClubLogos[index]} alt={name} className="max-h-14 w-auto max-w-42.5 object-contain" />
                  </div>
                  <span className="text-ink border-border flex min-h-15 flex-1 items-center justify-center border-t bg-surface-1 px-4 py-4 text-center text-[14.5px] font-semibold leading-snug">{name}</span>
                </li>
              ))}
            </Reveal>
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
          <Reveal as="ul" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {t.partners.health.map((h, index) => (
              <li key={h.n} className="card-shadow border-border flex flex-col overflow-hidden rounded-2xl border bg-white transition-transform duration-300 ease-out hover:-translate-y-1">
                <div className="flex h-36 items-center justify-center bg-white p-5">
                  <img
                    src={healthcareImages[index]}
                    alt={index === 2 ? "Government Medical College Surat logo, parent institution of the Department of Pediatrics" : h.n}
                    className="max-h-24 w-auto max-w-[150px] object-contain"
                  />
                </div>
                <div className="border-border flex flex-1 flex-col gap-2 border-t bg-surface-1 px-5 py-5 text-center">
                  <span className="text-brand-strong text-xs font-semibold uppercase tracking-[0.09em]">{h.r}</span>
                  <span className="text-ink text-base font-semibold leading-snug">{h.n}</span>
                </div>
              </li>
            ))}
          </Reveal>
          <p className="text-faint max-w-[680px] text-[13.5px] leading-relaxed">{t.partners.approvalNote}</p>
        </div>
      </Section>

      <Section tone="tint" border="both" decor="ring">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="border-brand-tint-border card-shadow flex items-center justify-center rounded-[26px] border bg-white px-10 py-14">
            <img src={implementationLogo} alt={t.partners.impl.n} className="max-h-24 w-auto max-w-[220px] object-contain" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>{t.partners.implTitle}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em]">{t.partners.impl.n}</h2>
            <span className="bg-paper text-brand-strong rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em]">{t.partners.impl.r}</span>
            <p className="text-muted max-w-[520px] text-[16.5px] leading-[1.7]">{t.partners.eco[2].d}</p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="border-border card-shadow grid grid-cols-1 items-center gap-9 overflow-hidden rounded-[28px] border bg-paper p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-12">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>{t.grant.badge}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.partners.grantTitle}</h2>
            <p className="text-muted max-w-[520px] text-[16.5px] leading-[1.7]">{t.partners.grantBody}</p>
          </div>
          <div className="border-brand-tint-border relative flex flex-col gap-2 overflow-hidden rounded-[22px] border bg-brand-tint px-8 py-9">
            <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40">
              <g fill="none" stroke="#ea4885" strokeOpacity="0.16">
                <circle cx="60" cy="60" r="26" />
                <circle cx="60" cy="60" r="40" />
                <circle cx="60" cy="60" r="54" />
              </g>
            </svg>
            <span className="text-brand-strong text-[11.5px] font-semibold uppercase tracking-[0.1em]">{t.home.grantNumberLabel}</span>
            <span className="text-ink text-[34px] font-bold leading-none tracking-[-0.025em] sm:text-[40px]">GG2694832</span>
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
