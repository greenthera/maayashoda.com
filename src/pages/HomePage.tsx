import { useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { StepList } from "../components/ui/StepList";
import { Marquee } from "../components/ui/Marquee";
import { ImageSlot } from "../components/ui/ImageSlot";
import { Accordion } from "../components/ui/Accordion";

const GALLERY = [
  { id: "gallery-1", label: "Awareness session", big: true },
  { id: "gallery-2", label: "Community outreach", big: false },
  { id: "gallery-3", label: "Partner engagement", big: false },
  { id: "gallery-4", label: "Milk bank van", big: false },
  { id: "gallery-5", label: "Team at work", big: false },
];

export default function HomePage() {
  const { t, paths } = useLanguage();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const partnerNames = [t.partners.hostClub, ...t.partners.clubs, t.partners.health[0].n, t.partners.health[1].n, t.partners.impl.n];

  const involvedMeta = [
    { to: paths.donor, cta: t.cta.donor, accent: true },
    { to: paths.support, cta: t.cta.support, accent: false },
    { to: paths.support, cta: t.cta.explorePartnership, accent: false },
  ];

  const faqPreview = [t.faqs.groups[1].q[1], t.faqs.groups[2].q[0], t.faqs.groups[1].q[3], t.faqs.groups[2].q[1], t.faqs.groups[5].q[0]];

  return (
    <>
      <PageHead title={t.home.title} />

      <section className="bg-paper border-border animate-fade-up relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-10%] -top-[18%] grid h-[940px] place-items-center"
        >
          <svg viewBox="0 0 1200 900" className="h-full w-full" role="presentation">
            <g fill="none" stroke="#ea4885" strokeOpacity="0.06">
              <circle cx="600" cy="470" r="200" />
              <circle cx="600" cy="470" r="300" />
              <circle cx="600" cy="470" r="400" />
              <circle cx="600" cy="470" r="500" />
            </g>
            <g className="animate-pulse-ring" style={{ transformOrigin: "600px 470px" }}>
              <circle cx="600" cy="470" r="300" fill="none" stroke="#ea4885" strokeWidth="1.2" strokeOpacity="0.45" />
            </g>
          </svg>
        </div>
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-5 pb-10 pt-20 text-center">
          <span className="bg-brand-tint text-brand-strong inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em]">
            {t.grant.badge}
          </span>
          <h1 className="text-ink max-w-[900px] text-[clamp(2.5rem,6vw,4.6rem)] font-bold leading-[1.03] tracking-[-0.04em]">{t.home.h1}</h1>
          <p className="text-muted max-w-[620px] text-[19px] leading-relaxed">{t.home.heroLead}</p>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <Button to={paths.donor}>{t.cta.donor}</Button>
            <Button to={paths.about} variant="outline">
              {t.cta.learnProject}
            </Button>
          </div>
          <div className="mt-1.5 flex flex-col items-center gap-2.5">
            <span className="text-faint max-w-[560px] text-[13.5px] leading-relaxed">{t.home.heroCollab}</span>
            <Button to={paths.partners} variant="text" arrow>
              {t.cta.meetPartners}
            </Button>
            <span className="text-[#b0a7c2] inline-flex items-center gap-2 text-xs tracking-wide">
              <span aria-hidden="true" className="bg-border-strong h-[5px] w-[5px] rounded-full" />
              <span>{t.grant.number}</span>
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-6">
          <Marquee>
            {partnerNames.map((name, i) => (
              <div key={i} className="flex flex-none items-center gap-2 opacity-70">
                <span aria-hidden="true" className="bg-surface-2 h-6 w-6 rounded-md" />
                <span className="text-muted whitespace-nowrap text-[12.5px] font-semibold">{name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4.5">
            <Eyebrow>{t.home.whyEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[460px] text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em]">{t.home.whyTitle}</h2>
            <blockquote className="bg-surface-2 card-shadow mt-3 max-w-[420px] rounded-[20px] px-6 py-5.5 text-[18px] font-medium leading-snug text-ink">
              “{t.home.whyQuote}”
            </blockquote>
          </div>
          <div className="flex max-w-[620px] flex-col gap-5">
            {t.home.whyBody.map((para, i) => (
              <p key={i} className="text-muted text-[17px] leading-[1.7]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-11 flex flex-col gap-3">
          <Eyebrow>{t.home.journeyEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.journeyTitle}</h2>
        </div>
        <StepList steps={t.home.journeySteps.map((label) => ({ label }))} />
        <p className="text-muted card-shadow border-border mt-10 max-w-[760px] rounded-2xl border bg-paper px-5 py-4.5 text-[14.5px] leading-relaxed">
          {t.home.journeyNote}
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-11 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-border bg-surface-1 min-h-[360px] overflow-hidden rounded-3xl border">
            <ImageSlot label="Milk Bank Van photograph" className="min-h-[360px]" />
          </div>
          <div className="flex max-w-[560px] flex-col gap-5.5">
            <Eyebrow>{t.home.vanEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.vanTitle}</h2>
            <p className="text-muted text-[17px] leading-[1.7]">{t.home.vanBody}</p>
            <ul className="mt-1 flex flex-col gap-4.5">
              {t.home.vanPoints.map((p) => (
                <li key={p.t} className="flex items-start gap-3.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea4885" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-ink text-base font-semibold">{p.t}</span>
                    <span className="text-muted text-[15px] leading-snug">{p.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button to={paths.van} variant="outline" className="self-start">
              {t.cta.exploreVan}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="tint" border="both">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.home.grantEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.grantTitle}</h2>
            <div className="card-shadow border-border mt-2 flex max-w-max flex-col gap-1 rounded-[18px] border bg-paper px-5.5 py-5">
              <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.home.grantNumberLabel}</span>
              <span className="text-ink text-[26px] font-bold tracking-[-0.02em]">GG2694832</span>
            </div>
          </div>
          <div className="flex max-w-[580px] flex-col gap-4.5">
            <p className="text-muted text-[17px] leading-[1.7]">{t.home.grantBody}</p>
            <p className="text-muted text-base leading-[1.7]">{t.home.grantFocus}</p>
            <Button to={paths.about} variant="text" arrow>
              {t.cta.learnProject}
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-11 flex max-w-[640px] flex-col gap-3">
          <Eyebrow>{t.home.partnersEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.partnersTitle}</h2>
          <p className="text-muted text-[17px] leading-[1.7]">{t.home.partnersLead}</p>
        </div>
        <Marquee durationSeconds={45}>
          {partnerNames.map((name, i) => (
            <div key={i} className="card-shadow border-border flex h-[132px] w-[232px] flex-none flex-col items-center justify-center gap-3 rounded-[18px] border bg-paper px-4.5 py-5">
              <span aria-hidden="true" className="bg-surface-2 grid h-11 w-11 place-items-center rounded-xl">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#948aac" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 3.5v17M3.5 12h17" />
                </svg>
              </span>
              <span className="text-ink text-center text-[13.5px] font-semibold leading-snug">{name}</span>
            </div>
          ))}
        </Marquee>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <p className="text-faint max-w-[560px] text-[13px]">{t.partners.approvalNote}</p>
          <Button to={paths.partners} variant="text" arrow>
            {t.cta.meetPartners}
          </Button>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex max-w-[640px] flex-col gap-3">
          <Eyebrow>{t.home.galleryEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.galleryTitle}</h2>
          <p className="text-muted text-[17px] leading-[1.7]">{t.home.galleryLead}</p>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[182px]">
          {GALLERY.map((g) => (
            <li key={g.id} className={`border-border card-shadow relative min-h-[200px] overflow-hidden rounded-[22px] border bg-surface-2 ${g.big ? "sm:col-span-2 sm:row-span-2 min-h-[380px]" : ""}`}>
              <ImageSlot label={g.label} className="h-full" />
              <button
                type="button"
                onClick={() => setLightbox(g.id)}
                aria-label="Open photograph"
                className="border-border card-shadow absolute bottom-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-xl border bg-paper/90 hover:border-brand"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#201859" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        {lightbox ? (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
            className="bg-ink/82 fixed inset-0 z-[90] grid place-items-center p-8 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5.5 top-5.5 grid h-11 w-11 place-items-center rounded-xl border border-white/30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fdfdfd" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="h-[min(720px,78vh)] w-[min(1100px,88vw)]">
              <ImageSlot label={GALLERY.find((g) => g.id === lightbox)?.label ?? ""} fit="contain" className="h-full rounded-[20px]" />
            </div>
          </div>
        ) : null}
      </Section>

      <Section tone="ink">
        <div className="mb-11 flex flex-col gap-3">
          <Eyebrow>{t.home.statsEyebrow}</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em] text-paper">{t.home.statsTitle}</h2>
        </div>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.stats.map((s) => (
            <div key={s.l} className="flex flex-col gap-2 border-t border-white/20 pt-5">
              <dt className="order-2 text-[15px] leading-snug text-[#cfc8d9]">{s.l}</dt>
              <dd className="order-1 m-0 text-[clamp(2.4rem,4.4vw,3.4rem)] font-bold leading-none tracking-[-0.03em] text-paper">{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col gap-2">
          <p className="text-faint text-[13.5px] font-semibold">{t.home.statsUpdated}</p>
          <p className="text-faint max-w-[720px] text-[13px] leading-relaxed">{t.home.statsNote}</p>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>{t.home.involvedEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.involvedTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {t.home.involved.map((c, i) => {
            const meta = involvedMeta[i];
            return (
              <li
                key={c.t}
                className={`flex flex-col gap-3 rounded-[20px] border p-8 ${
                  meta.accent ? "bg-brand-tint border-brand-tint-border" : "bg-paper border-border"
                }`}
              >
                <span className="text-ink text-xl font-semibold tracking-[-0.01em]">{c.t}</span>
                <span className={`text-[15.5px] leading-[1.65] ${meta.accent ? "text-brand-soft" : "text-muted"}`}>{c.d}</span>
                <Button to={meta.to} variant="text" arrow className={`mt-1.5 ${meta.accent ? "text-brand-strong!" : ""}`}>
                  {meta.cta}
                </Button>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="tint" border="top">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.home.faqEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.faqTitle}</h2>
            <Button to={paths.faqs} variant="outline" className="mt-2 self-start">
              {t.cta.viewAllFaqs}
            </Button>
          </div>
          <Accordion items={faqPreview} />
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-5.5 text-center">
          <h2 className="max-w-[640px] text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper">{t.home.finalTitle}</h2>
          <p className="max-w-[560px] text-[17.5px] leading-relaxed text-[#cfc8d9]">{t.home.finalBody}</p>
          <Button to={paths.donor} className="mt-1.5">
            {t.cta.donor}
          </Button>
        </div>
      </Section>
    </>
  );
}
