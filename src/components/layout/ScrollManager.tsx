import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Sticky header is 72px tall; leave a little breathing room above the target.
const HEADER_OFFSET = 88;

/**
 * Keeps scroll position sane across client-side navigation:
 * - Plain route change -> jump to the top (a new "page" shouldn't inherit
 *   the previous page's scroll position, which otherwise leaves the title
 *   hidden above the fold).
 * - Route change with a #hash -> smooth-scroll to that element, offset so
 *   the sticky header doesn't cover it.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
