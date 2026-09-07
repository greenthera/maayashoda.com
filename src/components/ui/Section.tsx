import type { ReactNode } from "react";
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
      id={id}
      style={decorStyle(effectiveDecor, isInk)}
      className={`relative scroll-mt-20 sm:scroll-mt-24 ${toneClasses[tone]} ${borderClasses} ${
        overlap ? "-mt-6 rounded-t-[26px] sm:-mt-10 sm:rounded-t-[40px]" : ""
      } ${className}`}
    >
      <div className={`mx-auto max-w-[1280px] px-4 py-12 sm:px-5 md:py-24 ${containerClassName}`}>{children}</div>
    </section>
  );
}
