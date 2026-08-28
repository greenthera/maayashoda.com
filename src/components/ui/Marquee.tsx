import type { ReactNode } from "react";

/** Infinite horizontal scroller: renders `children` twice back-to-back and
 * animates the whole track left by 50%, so the loop is seamless. Pauses on hover. */
export function Marquee({ children, durationSeconds = 40 }: { children: ReactNode; durationSeconds?: number }) {
  return (
    <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] overflow-hidden">
      <div
        className="animate-marquee hover:[animation-play-state:paused] flex w-max items-center gap-4"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {children}
        <div aria-hidden="true" className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
