import type { ReactNode } from "react";

/**
 * Infinite horizontal scroller. Renders `children` in two identical groups, each
 * carrying the inter-item gap as trailing padding, so translating the track by
 * exactly -50% loops seamlessly with no jump. Animation runs on a GPU layer
 * (`.marquee-track`) and only pauses on true hover devices.
 * `gutterY` adds vertical padding so card shadows aren't clipped by the mask.
 */
export function Marquee({ children, durationSeconds = 40, gutterY = 0 }: { children: ReactNode; durationSeconds?: number; gutterY?: number }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max" style={{ animationDuration: `${durationSeconds}s`, paddingBlock: gutterY || undefined }}>
        <div className="flex flex-none items-center gap-4 pr-4">{children}</div>
        <div aria-hidden="true" className="flex flex-none items-center gap-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
}
