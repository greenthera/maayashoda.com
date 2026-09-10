import { useEffect, useRef, type ReactNode } from "react";

/**
 * Infinite horizontal logo scroller, driven by `requestAnimationFrame` rather
 * than a CSS animation — iOS Safari repeatedly froze the CSS version (a wide
 * animated element combined with `mask-image` / `will-change`, plus it not
 * resuming animations after being scrolled off-screen). The JS loop is immune to
 * all of that: it pauses itself when off-screen and (on pointer devices) on
 * hover, and resumes cleanly. Two identical groups, each carrying the inter-item
 * gap as trailing padding, so wrapping by exactly one group width is seamless.
 * `gutterY` pads the track vertically so card shadows aren't clipped. Renders on
 * a `bg-paper` background.
 */
export function Marquee({ children, durationSeconds = 40, gutterY = 0 }: { children: ReactNode; durationSeconds?: number; gutterY?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;

    let offset = 0;
    let last = 0;
    let hovered = false;
    let visible = true;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!last) last = now;
      const dt = now - last;
      last = now;
      if (hovered || !visible || dt > 250) return; // skip big gaps (tab return / off-screen)
      const width = group.offsetWidth;
      if (width > 0) {
        offset += (width / (durationSeconds * 1000)) * dt;
        if (offset >= width) offset -= width;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    };
    raf = requestAnimationFrame(frame);

    const onEnter = () => {
      if (canHover) hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = 0;
      },
      { threshold: 0 },
    );
    io.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      io.disconnect();
    };
  }, [durationSeconds]);

  return (
    <div className="relative overflow-hidden">
      <div ref={trackRef} className="flex w-max" style={{ paddingBlock: gutterY || undefined }}>
        <div ref={groupRef} className="flex flex-none items-center gap-4 pr-4">
          {children}
        </div>
        <div aria-hidden="true" className="flex flex-none items-center gap-4 pr-4">
          {children}
        </div>
      </div>
      <div aria-hidden="true" className="from-paper pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent sm:w-16" />
      <div aria-hidden="true" className="from-paper pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent sm:w-16" />
    </div>
  );
}
