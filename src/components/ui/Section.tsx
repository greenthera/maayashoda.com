import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { decorStyle, type Decor } from "../../lib/decor";

type Tone = "paper" | "tint" | "surface" | "ink";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper",
  tint: "bg-surface-1",
  surface: "bg-surface-2",
  ink: "bg-ink text-paper",
};

interface SectionProps {
  tone?: Tone;
  overlap?: boolean;
  border?: "top" | "bottom" | "both" | "none";
  /** Decorative background accent. Ink-toned sections always use the ring + glow
   * accent (matching the source design) unless "none" is passed explicitly. */
  decor?: Decor;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/**
 * Full-width section with the site's signature stacked, rounded-top overlap
 * so consecutive sections read as soft, layered "cards" down the page.
 * Fades/slides up the first time it scrolls into view.
 */
export function Section({
  tone = "paper",
  overlap = true,
  border = "none",
  decor = "wave",
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const borderClasses =
    border === "top"
      ? "border-t border-border"
      : border === "bottom"
        ? "border-b border-border"
        : border === "both"
          ? "border-y border-border"
          : "";

  const isInk = tone === "ink";
  const effectiveDecor: Decor = isInk ? (decor === "none" ? "none" : "ring") : decor;

  return (
    <section
      ref={ref}
      id={id}
      style={decorStyle(effectiveDecor, isInk)}
      className={`relative scroll-mt-24 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${toneClasses[tone]} ${borderClasses} ${overlap ? "-mt-10 rounded-t-[40px]" : ""} ${className}`}
    >
      <div className={`mx-auto max-w-[1280px] px-5 py-16 md:py-24 ${containerClassName}`}>{children}</div>
    </section>
  );
}
