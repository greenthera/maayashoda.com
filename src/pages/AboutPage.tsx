import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { Reveal } from "../components/ui/Reveal";
import { ringStyle } from "../lib/decor";

export default function AboutPage() {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={t.about.title} />

      <section className="bg-surface-1 border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-11 px-5 pb-16 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex max-w-[620px] flex-col items-start gap-5.5">
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.035em]">
              <AnimatedWords text={t.about.h1} />
            </h1>
            <p className="text-muted text-[18px] leading-relaxed">{t.about.lead}</p>
            <Reveal as="ul" className="mt-1 flex flex-wrap gap-2.5" step={70}>
              {t.about.approach.map((p) => (
                <li key={p.t} className="border-border-strong text-ink rounded-full border bg-paper/70 px-4 py-2 text-[13.5px] font-medium">
                  {p.t}
                </li>
              ))}
            </Reveal>
          </div>
          <div className="border-border card-shadow mx-auto flex w-full max-w-[440px] items-center justify-center overflow-hidden rounded-[28px] border bg-white p-6 sm:p-8">
            <img
              src={`${import.meta.env.BASE_URL}images/project/yashoda-maa.webp`}
              alt="Yashoda Maa — bridge between donor mothers and babies"
              width={720}
              height={720}
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.about.storyEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[440px] text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em]">{t.about.storyTitle}</h2>
          </div>
          <div className="flex max-w-[640px] flex-col gap-5">
            {t.about.storyBody.map((para, i) => (
              <p key={i} className="text-muted text-[17px] leading-[1.7]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>{t.about.challengeEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.about.challengeTitle}</h2>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.challenges.map((c) => (
            <li key={c.t} className="card-shadow border-border flex flex-col gap-2.5 rounded-[20px] border bg-paper p-6.5">
              <span className="text-ink text-[17px] font-semibold">{c.t}</span>
              <span className="text-muted text-[15px] leading-[1.65]">{c.d}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section>
        <div className="mb-12 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.about.approachEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.about.approachTitle}</h2>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.approach.map((p, i) => (
            <li key={p.t} className="flex flex-col gap-3">
              <span className="bg-brand-tint grid h-11 w-11 place-items-center rounded-[13px]">
                <span className="text-brand-strong text-[15px] font-bold">{`0${i + 1}`}</span>
              </span>
              <span className="text-ink text-lg font-semibold">{p.t}</span>
              <span className="text-muted text-[15.5px] leading-[1.65]">{p.d}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section tone="tint" border="both">
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.about.objEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[420px] text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.about.objTitle}</h2>
            <p className="text-faint max-w-[420px] text-[13.5px] leading-relaxed">{t.about.objNote}</p>
          </div>
          <Reveal as="ol" className="flex max-w-[640px] flex-col" step={45}>
            {t.about.objectives.map((text, i) => (
              <li key={text} className="border-border flex items-start gap-4.5 border-b py-4.5">
                <span className="text-brand min-w-[22px] flex-none pt-0.5 text-[13px] font-semibold">{`0${i + 1}`}</span>
                <span className="text-ink text-[16.5px] leading-relaxed">{text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="bg-surface-2 grid grid-cols-1 items-center gap-10 rounded-[28px] p-8 sm:p-11 lg:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>{t.about.grantEyebrow}</Eyebrow>
            <h2 className="text-ink text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.16] tracking-[-0.03em]">{t.about.grantTitle}</h2>
            <div className="border-brand-tint-border relative mt-2 flex w-full max-w-[360px] flex-col gap-2 overflow-hidden rounded-[22px] border bg-brand-tint px-6 py-6 text-left sm:px-8 sm:py-7">
              <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40">
                <g fill="none" stroke="#ea4885" strokeOpacity="0.16">
                  <circle cx="60" cy="60" r="26" />
                  <circle cx="60" cy="60" r="40" />
                  <circle cx="60" cy="60" r="54" />
                </g>
              </svg>
              <span className="relative text-brand-strong text-[11.5px] font-semibold uppercase tracking-[0.1em]">{t.grant.badge}</span>
              <span className="relative text-ink text-[clamp(1.6rem,5vw,2.25rem)] font-bold leading-none tracking-[-0.025em]">GG2694832</span>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="text-muted text-[16.5px] leading-[1.7]">{t.about.grantBody}</p>
            <p className="text-faint text-[13.5px] leading-relaxed">{t.about.grantNote}</p>
          </div>
        </div>
      </Section>

      <Section overlap={false} className="bg-paper">
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.about.ecoEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[420px] text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.about.ecoTitle}</h2>
            <Button to={paths.partners} variant="outline" className="mt-2 self-start">
              {t.cta.meetPartners}
            </Button>
          </div>
          <div className="flex max-w-[620px] flex-col gap-5.5">
            <p className="text-muted text-[17px] leading-[1.7]">{t.about.ecoBody}</p>
            <Reveal as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2" step={70}>
              {t.partners.eco.map((e) => (
                <li key={e.t} className="card-shadow border-border flex flex-col gap-1.5 rounded-2xl border px-5 py-4.5">
                  <span className="text-ink text-[15.5px] font-semibold">{e.t}</span>
                  <span className="text-muted text-sm leading-relaxed">{e.d}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="tint" border="top">
        <div className="flex max-w-[720px] flex-col gap-4.5">
          <Eyebrow>{t.about.visionEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.about.visionTitle}</h2>
          <p className="text-muted text-[17.5px] leading-[1.7]">{t.about.visionBody}</p>
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[620px] text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper">{t.about.finalTitle}</h2>
          <p className="max-w-[540px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.about.finalBody}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-3">
            <Button to={paths.donor}>{t.cta.donor}</Button>
            <Button to={paths.van} variant="outline-invert">
              {t.cta.exploreVan}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
