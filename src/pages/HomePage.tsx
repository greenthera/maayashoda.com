import { partnerLogos } from "../content/partnerAssets";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { StepList } from "../components/ui/StepList";
import { Marquee } from "../components/ui/Marquee";
import { PartnerCard } from "../components/ui/PartnerCard";
import { GalleryLightbox } from "../components/ui/GalleryLightbox";
import { Accordion } from "../components/ui/Accordion";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { Reveal } from "../components/ui/Reveal";
import { VanScene } from "../components/ui/VanScene";

const GALLERY = [
  { id: "gallery-1", src: `${import.meta.env.BASE_URL}images/moments/awareness-session-rich.webp`, label: "Awareness session" },
  { id: "gallery-2", src: `${import.meta.env.BASE_URL}images/moments/community-outreach-rich.webp`, label: "Community outreach" },
  { id: "gallery-3", src: `${import.meta.env.BASE_URL}images/moments/partner-engagement-rich.webp`, label: "Partner engagement" },
  { id: "gallery-4", src: `${import.meta.env.BASE_URL}images/moments/milk-bank-van-rich.webp`, label: "Milk bank van" },
  { id: "gallery-5", src: `${import.meta.env.BASE_URL}images/moments/team-at-work-rich.webp`, label: "Team at work" },
];

export default function HomePage() {
  const { t, paths } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

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
        <div aria-hidden="true" className="pointer-events-none absolute -right-[14%] -top-[42%] hidden aspect-square w-[760px] lg:block">
          <svg viewBox="0 0 800 800" className="h-full w-full" role="presentation">
            <g fill="none" stroke="#ea4885" strokeOpacity="0.07">
              <circle cx="400" cy="400" r="200" />
              <circle cx="400" cy="400" r="300" />
              <circle cx="400" cy="400" r="390" />
            </g>
            <g className="animate-pulse-ring" style={{ transformOrigin: "400px 400px" }}>
              <circle cx="400" cy="400" r="250" fill="none" stroke="#ea4885" strokeWidth="1.2" strokeOpacity="0.4" />
            </g>
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-9 px-4 pb-8 pt-10 sm:px-5 sm:pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-10 lg:pt-16">
          <div className="flex flex-col items-start gap-5 max-lg:items-center max-lg:text-center">
            <span className="bg-brand-tint text-brand-strong inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em]">
              {t.grant.badge}
            </span>
            <h1 className="text-ink text-[clamp(2.3rem,4.9vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              <AnimatedWords text={t.home.h1} />
            </h1>
            <p className="text-muted max-w-[540px] text-[17px] leading-relaxed sm:text-[18.5px]">{t.home.heroLead}</p>
            <div className="mt-1 flex flex-wrap gap-3 max-lg:justify-center">
              <Button to={paths.donor}>{t.cta.donor}</Button>
              <Button to={paths.about} variant="outline">
                {t.cta.learnProject}
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap items-stretch gap-3 max-lg:justify-center">
              <span className="border-brand-tint-border bg-brand-tint text-brand-strong inline-flex min-h-12 items-center gap-2 rounded-xl border px-4 py-3 text-[13px] font-semibold tracking-[-0.01em]">
                <span aria-hidden="true" className="bg-brand h-1.5 w-1.5 rounded-full" />
                {t.grant.number}
              </span>
              <Button to={paths.partners} variant="text" arrow className="text-[13.5px]">
                {t.cta.meetPartners}
              </Button>
            </div>
          </div>

          <div className="order-first flex justify-center lg:order-none lg:justify-end">
            <img
              src={`${import.meta.env.BASE_URL}images/project/yashoda-maa-mark.webp`}
              alt="Maa Yashoda — Human Milk Bank on Wheels"
              width={440}
              height={444}
              className="h-auto w-[clamp(210px,46vw,440px)]"
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 pb-10 pt-2 sm:px-5 sm:pb-14 sm:pt-4">
          <Marquee gutterY={26}>
            {partnerNames.map((name, i) => (
              <PartnerCard key={name} logo={partnerLogos[i]} name={name} />
            ))}
          </Marquee>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4.5">
            <Eyebrow>{t.home.whyEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[460px] text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em]">{t.home.whyTitle}</h2>
            <blockquote className="bg-surface-2 card-shadow mt-3 max-w-[420px] rounded-[18px] px-4.5 py-4.5 text-base font-medium leading-snug text-ink sm:rounded-[20px] sm:px-6 sm:py-5.5 sm:text-[18px]">
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
        <div className="mx-auto mb-11 flex max-w-3xl flex-col items-center gap-3 text-center">
          <Eyebrow>{t.home.journeyEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.journeyTitle}</h2>
        </div>
        <StepList steps={t.home.journeySteps.map((label) => ({ label }))} />
        <div className="border-brand-tint-border mx-auto mt-10 flex max-w-[760px] flex-col items-center gap-4 rounded-3xl border bg-paper px-6 py-7 text-center shadow-sm sm:px-10">
          <span aria-hidden="true" className="bg-brand-tint text-brand-strong grid h-11 w-11 place-items-center rounded-full">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/></svg>
          </span>
          <p className="text-muted text-[15px] leading-relaxed">{t.home.journeyNote}</p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <VanScene animate className="py-4 sm:py-8" />
          <div className="flex max-w-[560px] flex-col items-start gap-5">
            <Eyebrow>{t.home.vanEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.vanTitle}</h2>
            <p className="text-muted text-[17px] leading-[1.7]">{t.home.vanBody}</p>
            <Reveal as="ul" className="border-border mt-1 flex w-full flex-col gap-4 border-t pt-5" step={45}>
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
            </Reveal>
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
            <div className="border-brand-tint-border relative mt-2 flex w-full max-w-[360px] flex-col gap-2 overflow-hidden rounded-[22px] border bg-brand-tint px-6 py-6 text-left sm:px-8 sm:py-7">
              <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40">
                <g fill="none" stroke="#ea4885" strokeOpacity="0.16">
                  <circle cx="60" cy="60" r="26" />
                  <circle cx="60" cy="60" r="40" />
                  <circle cx="60" cy="60" r="54" />
                </g>
              </svg>
              <span className="relative text-brand-strong text-[11.5px] font-semibold uppercase tracking-[0.1em]">{t.home.grantNumberLabel}</span>
              <span className="relative text-ink text-[clamp(1.6rem,5vw,2.25rem)] font-bold leading-none tracking-[-0.025em]">GG2694832</span>
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

      <Section containerClassName="pb-0!">
        <div className="mb-7 flex max-w-[640px] flex-col gap-3">
          <Eyebrow>{t.home.partnersEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.partnersTitle}</h2>
          <p className="text-muted text-[17px] leading-[1.7]">{t.home.partnersLead}</p>
        </div>
        <Marquee durationSeconds={45} gutterY={26}>
          {partnerNames.map((name, i) => (
            <PartnerCard key={name} logo={partnerLogos[i]} name={name} />
          ))}
        </Marquee>
      </Section>

      <Section overlap={false} containerClassName="py-12! md:py-20!">
        <div className="mb-10 flex max-w-[640px] flex-col gap-3">
          <Eyebrow>{t.home.galleryEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.galleryTitle}</h2>
          <p className="text-muted text-[17px] leading-[1.7]">{t.home.galleryLead}</p>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5" step={70}>
          {GALLERY.map((g, index) => (
            <li key={g.id} className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <button type="button" onClick={() => setLightbox(index)} aria-label={`Open ${g.label} illustration`}
                className="group border-border relative block aspect-[3/2] w-full overflow-hidden rounded-2xl border bg-surface-2 text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <img src={g.src} alt={g.label} width={1536} height={1024} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-14 text-white">
                  <span className="text-sm font-semibold sm:text-base">{g.label}</span>
                  <span aria-hidden="true" className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/40 bg-white/15 text-lg">↗</span>
                </span>
              </button>
            </li>
          ))}
        </Reveal>
        {lightbox !== null ? <GalleryLightbox images={GALLERY} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} /> : null}
      </Section>

      <Section overlap={false} containerClassName="pt-0!">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>{t.home.involvedEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.home.involvedTitle}</h2>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {t.home.involved.map((c, i) => {
            const meta = involvedMeta[i];
            return (
              <li
                key={c.t}
                className={`flex flex-col gap-3 rounded-[18px] border p-5 sm:rounded-[20px] sm:p-8 ${
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
        </Reveal>
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
