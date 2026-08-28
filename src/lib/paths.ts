import type { LangCode } from "../content";

export type PageKey =
  | "home"
  | "about"
  | "van"
  | "partners"
  | "support"
  | "faqs"
  | "donor"
  | "contact"
  | "privacy"
  | "terms"
  | "accessibility"
  | "thanksDonor"
  | "thanksContact"
  | "thanksSupport"
  | "notFound";

/** Path suffix (leading slash, always trailing slash) for the English/unprefixed site. */
export const EN_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about-the-project/",
  van: "/milk-bank-van/",
  partners: "/partners/",
  support: "/support/",
  faqs: "/faqs/",
  donor: "/become-a-donor/",
  contact: "/contact/",
  privacy: "/privacy-policy/",
  terms: "/terms/",
  accessibility: "/accessibility/",
  thanksDonor: "/thank-you/donor-registration/",
  thanksContact: "/thank-you/contact/",
  thanksSupport: "/thank-you/support-enquiry/",
  notFound: "/404/",
};

const LOCALIZED_PREFIXES: Exclude<LangCode, "en">[] = ["hi", "gu"];

/** Prepend the `/hi` or `/gu` URL prefix onto an (unprefixed, English) path. English passes through unchanged. */
export function withLangPrefix(lang: LangCode, path: string): string {
  if (lang === "en") return path;
  return `/${lang}${path}`;
}

/** Every route path (English unprefixed, `/hi/...`, `/gu/...`) for the given language. */
export function buildPaths(lang: LangCode): Record<PageKey, string> {
  const entries = (Object.keys(EN_PATHS) as PageKey[]).map((key) => [key, withLangPrefix(lang, EN_PATHS[key])] as const);
  return Object.fromEntries(entries) as Record<PageKey, string>;
}

/**
 * Split a pathname into its language and the unprefixed (English-shaped) rest,
 * e.g. "/hi/faqs/" -> { lang: "hi", rest: "/faqs/" }, "/faqs/" -> { lang: "en", rest: "/faqs/" }.
 */
export function stripLangPrefix(pathname: string): { lang: LangCode; rest: string } {
  for (const lang of LOCALIZED_PREFIXES) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      const rest = pathname.slice(1 + lang.length);
      return { lang, rest: rest === "" ? "/" : rest };
    }
  }
  return { lang: "en", rest: pathname === "" ? "/" : pathname };
}
