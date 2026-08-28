import en from "./en";
import gu from "./gu";
import hi from "./hi";
import type { Content } from "./en";

export type { Content };
export type LangCode = "en" | "hi" | "gu";

export const LANGS: Record<LangCode, Content> = { en, hi, gu };
export const LANG_CODES: LangCode[] = ["en", "hi", "gu"];

export function isLangCode(value: string | null | undefined): value is LangCode {
  return value === "en" || value === "hi" || value === "gu";
}
