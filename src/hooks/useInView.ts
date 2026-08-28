import { useLayoutEffect, useRef, useState } from "react";

/**
 * Drives the scroll-reveal on `Section`. Content is visible by default — in
 * the SSG HTML, for no-JS visitors, and for anything already on screen when
 * the page mounts — so slow JS never leaves the page looking blank. Only
 * elements that are genuinely below the fold at mount get hidden (via
 * useLayoutEffect, before the browser paints, so there's no visible flash)
 * and revealed once scrolled into view.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    setInView(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px", ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
