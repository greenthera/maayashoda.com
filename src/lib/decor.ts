import type { CSSProperties } from "react";

/**
 * Decorative background accents used across the site: a faint ring cluster
 * (top-right) and a dashed wave with two dots (bottom-left), ported from the
 * original design's inline SVG backgrounds. Swapping to `ink` variants keeps
 * them visible on the navy sections.
 */

function ringSvg(stroke: string, opacity: number) {
  const s = encodeURIComponent(stroke);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360' fill='none'%3E%3Cg stroke='${s}' stroke-opacity='${opacity}'%3E%3Ccircle cx='340' cy='40' r='130'/%3E%3Ccircle cx='340' cy='40' r='192'/%3E%3Ccircle cx='340' cy='40' r='254'/%3E%3C/g%3E%3C/svg%3E")`;
}

function waveSvg(stroke: string, opacity: number) {
  const s = encodeURIComponent(stroke);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='680' height='340' fill='none'%3E%3Cpath d='M-20 262C80 262 130 176 232 176s148 84 258 62 156-116 220-104' stroke='${s}' stroke-opacity='${opacity}' stroke-width='2' stroke-dasharray='6 12' stroke-linecap='round'/%3E%3Ccircle cx='232' cy='176' r='5' fill='%23ea4885' fill-opacity='0.16'/%3E%3Ccircle cx='490' cy='238' r='5' fill='%23ea4885' fill-opacity='0.16'/%3E%3C/svg%3E")`;
}

const GLOW = "radial-gradient(900px 460px at 88% -25%, rgba(234,72,133,0.26), transparent 70%)";

export type Decor = "none" | "wave" | "ring" | "both";

/** Ring accent, tinted pink on light backgrounds, white + a soft pink glow on ink. */
export function ringStyle(onInk = false): CSSProperties {
  return onInk
    ? {
        backgroundImage: `${ringSvg("#fdfdfd", 0.1)}, ${GLOW}`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "100% 0, 100% 0",
      }
    : {
        backgroundImage: ringSvg("#ea4885", 0.09),
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% 0",
      };
}

/** Dashed wave accent, navy on light backgrounds, paper-white on ink. */
export function waveStyle(onInk = false): CSSProperties {
  return {
    backgroundImage: waveSvg(onInk ? "#fdfdfd" : "#201859", onInk ? 0.12 : 0.07),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%",
  };
}

/** Wave (bottom-left) + ring (top-right) together. */
export function bothStyle(onInk = false): CSSProperties {
  const ring = onInk ? `${ringSvg("#fdfdfd", 0.1)}, ${GLOW}` : ringSvg("#ea4885", 0.09);
  const wave = waveSvg(onInk ? "#fdfdfd" : "#201859", onInk ? 0.12 : 0.07);
  return onInk
    ? {
        backgroundImage: `${wave}, ${ring}`,
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundPosition: "0 100%, 100% 0, 100% 0",
      }
    : {
        backgroundImage: `${wave}, ${ring}`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "0 100%, 100% 0",
      };
}

export function decorStyle(decor: Decor, onInk = false): CSSProperties {
  if (decor === "none") return {};
  if (decor === "ring") return ringStyle(onInk);
  if (decor === "both") return bothStyle(onInk);
  return waveStyle(onInk);
}
