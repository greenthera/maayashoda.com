import { useLanguage } from "../i18n/LanguageProvider";
import { PageHead } from "../components/layout/PageHead";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import { AnimatedWords } from "../components/ui/AnimatedWords";
import { Reveal } from "../components/ui/Reveal";
import { VanScene } from "../components/ui/VanScene";
import { ringStyle } from "../lib/decor";
import { StepList } from "../components/ui/StepList";

export default function VanPage() {
  const { t, paths } = useLanguage();

  return (
    <>
      <PageHead title={t.van.title} />

      <section className="bg-paper border-border animate-fade-up border-b" style={ringStyle()}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-11 px-5 pb-18 pt-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex max-w-[620px] flex-col gap-5.5">
            <Eyebrow>{t.van.eyebrow}</Eyebrow>
            <h1 className="text-ink text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.07] tracking-[-0.035em]">
              <AnimatedWords text={t.van.h1} />
            </h1>
            <p className="text-muted text-[18px] leading-relaxed">{t.van.lead}</p>
          </div>
          <VanScene className="py-6 sm:py-10" />
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-4.5">
            <Eyebrow>{t.van.whyEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[420px] text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em]">{t.van.whyTitle}</h2>
            <blockquote className="bg-brand-tint card-shadow mt-2.5 max-w-[420px] rounded-[20px] p-6 text-[18px] font-medium leading-snug text-brand-soft">
              “{t.van.quote}”
            </blockquote>
          </div>
          <div className="flex max-w-[620px] flex-col gap-5">
            {t.van.whyBody.map((para, i) => (
              <p key={i} className="text-muted text-[17px] leading-[1.7]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint" border="both">
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.van.outreachEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.van.outreachTitle}</h2>
        </div>
        <Reveal as="ul" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.van.outreachPoints.map((p) => (
            <li key={p.t} className="card-shadow border-border flex flex-col gap-2.5 rounded-[20px] border bg-paper p-6.5">
              <span className="text-ink text-[17px] font-semibold">{p.t}</span>
              <span className="text-muted text-[15px] leading-[1.65]">{p.d}</span>
            </li>
          ))}
        </Reveal>
        <p className="text-faint mt-6.5 max-w-[640px] text-[13.5px] leading-relaxed">{t.van.outreachNote}</p>
      </Section>

      <Section>
        <div className="mb-10 flex max-w-[620px] flex-col gap-3">
          <Eyebrow>{t.van.roleEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.van.roleTitle}</h2>
        </div>
        <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2" step={90}>
          <div className="bg-surface-2 card-shadow flex flex-col gap-3 rounded-[22px] p-8">
            <span className="text-faint text-[11.5px] font-semibold uppercase tracking-[0.09em]">01</span>
            <span className="text-ink text-xl font-semibold">{t.van.roleBank.t}</span>
            <span className="text-muted text-[15.5px] leading-[1.7]">{t.van.roleBank.d}</span>
          </div>
          <div className="bg-brand-tint card-shadow flex flex-col gap-3 rounded-[22px] p-8">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.09em] text-[#c07a9c]">02</span>
            <span className="text-ink text-xl font-semibold">{t.van.roleVan.t}</span>
            <span className="text-brand-soft text-[15.5px] leading-[1.7]">{t.van.roleVan.d}</span>
          </div>
        </Reveal>
        <p className="text-ink mt-6 text-[14.5px] font-medium">{t.van.roleNote}</p>
      </Section>

      <Section tone="surface">
        <div className="mb-11 flex flex-col gap-3">
          <Eyebrow>{t.van.journeyEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.van.journeyTitle}</h2>
        </div>
        <StepList steps={t.van.journeySteps.map((label) => ({ label }))} />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow>{t.van.repEyebrow}</Eyebrow>
            <h2 className="text-ink max-w-[400px] text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.14] tracking-[-0.03em]">{t.van.repTitle}</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2.5">
            {t.van.represents.map((r) => (
              <li key={r} className="border-border-strong text-ink rounded-full border px-5 py-3 text-[15.5px] font-medium">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="tint" border="top">
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <Eyebrow>{t.van.futureEyebrow}</Eyebrow>
          <h2 className="text-ink text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.16] tracking-[-0.025em]">{t.van.futureTitle}</h2>
          <p className="text-muted text-base leading-[1.7]">{t.van.futureBody}</p>
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-[600px] text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-paper">{t.van.finalTitle}</h2>
          <p className="max-w-[540px] text-[17px] leading-relaxed text-[#cfc8d9]">{t.van.finalBody}</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-3">
            <Button to={paths.donor}>{t.cta.donor}</Button>
            <Button to={paths.about} variant="outline-invert">
              {t.cta.learnProject}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
