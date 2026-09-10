import { useEffect, useState, type ReactNode } from "react";
import ReactFastMarquee from "react-fast-marquee";

/**
 * Partner-logo strip, powered by `react-fast-marquee`. The library renders
 * nothing until it mounts (it measures widths client-side), so before hydration
 * we render a static clipped row — the logos stay in the prerendered HTML and
 * there's no layout jump when the library takes over. Hover-pause is enabled
 * only on real pointer devices; on a touch screen a CSS `:hover` that sticks
 * after a tap would otherwise freeze it. Sits on a `bg-paper` (#fdfdfd)
 * background; space children with margin.
 */
export function Marquee({ children, speed = 55 }: { children: ReactNode; speed?: number }) {
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCanHover(window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false);
  }, []);

  if (!mounted) {
    return (
      <div className="flex overflow-hidden" aria-hidden="true">
        {children}
      </div>
    );
  }

  return (
    <ReactFastMarquee speed={speed} gradient gradientColor="#fdfdfd" gradientWidth={64} pauseOnHover={canHover} autoFill>
      {children}
    </ReactFastMarquee>
  );
}
