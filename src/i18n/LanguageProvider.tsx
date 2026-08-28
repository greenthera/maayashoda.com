import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LANGS, LANG_CODES, type Content, type LangCode } from "../content";
import { buildPaths, stripLangPrefix, withLangPrefix, type PageKey } from "../lib/paths";

interface LanguageContextValue {
  lang: LangCode;
  t: Content;
  setLang: (lang: LangCode) => void;
  langOptions: { code: LangCode; label: string }[];
  paths: Record<PageKey, string>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Remembers that the visitor has already been auto-redirected (or has explicitly
 * picked a language), so we only ever guess from the browser once. */
const CHOICE_KEY = "my-lang-choice";

function detectBrowserLang(): LangCode | null {
  if (typeof navigator === "undefined") return null;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const primary = raw?.toLowerCase().split("-")[0];
    if (primary === "hi") return "hi";
    if (primary === "gu") return "gu";
  }
  return null;
}

/**
 * Language is derived entirely from the URL (`/`, `/hi/...`, `/gu/...`) — there is
 * no client-side-only "switch language" state, so a shared link always opens in the
 * language it was copied from, and SSG output is correct per-locale with no
 * post-hydration flash.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, rest } = stripLangPrefix(location.pathname);

  // First load only: if landing on an unprefixed (English) URL and the visitor has
  // never chosen a language before, offer their browser's preferred language instead.
  useEffect(() => {
    if (lang !== "en") return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CHOICE_KEY);
    } catch {
      // localStorage unavailable — skip the auto-redirect rather than repeat it forever
      return;
    }
    if (stored) return;

    const detected = detectBrowserLang();
    if (!detected) return;
    try {
      window.localStorage.setItem(CHOICE_KEY, detected);
    } catch {
      // ignore persistence failure
    }
    navigate(withLangPrefix(detected, rest) + location.search + location.hash, { replace: true });
    // Intentionally run once, against the URL the visitor actually landed on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback(
    (next: LangCode) => {
      try {
        window.localStorage.setItem(CHOICE_KEY, next);
      } catch {
        // ignore persistence failure
      }
      if (next === lang) return;
      navigate(withLangPrefix(next, rest) + location.search + location.hash);
    },
    [lang, rest, location.search, location.hash, navigate],
  );

  const paths = useMemo(() => buildPaths(lang), [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: LANGS[lang],
      setLang,
      langOptions: LANG_CODES.map((code) => ({ code, label: LANGS[code].label })),
      paths,
    }),
    [lang, setLang, paths],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
