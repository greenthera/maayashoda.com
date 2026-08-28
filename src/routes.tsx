import type { RouteRecord } from "vite-react-ssg";
import type { ComponentType } from "react";
import { Layout } from "./components/layout/Layout";
import type { LangCode } from "./content";

type LazyResult = { Component: ComponentType };

interface Leaf {
  /** Path segment relative to the language root, "" for the homepage. */
  suffix: string;
  loader: () => Promise<LazyResult>;
  entry: string;
}

const LEAVES: Leaf[] = [
  { suffix: "", loader: async () => ({ Component: (await import("./pages/HomePage")).default }), entry: "src/pages/HomePage.tsx" },
  {
    suffix: "about-the-project/",
    loader: async () => ({ Component: (await import("./pages/AboutPage")).default }),
    entry: "src/pages/AboutPage.tsx",
  },
  {
    suffix: "milk-bank-van/",
    loader: async () => ({ Component: (await import("./pages/VanPage")).default }),
    entry: "src/pages/VanPage.tsx",
  },
  {
    suffix: "partners/",
    loader: async () => ({ Component: (await import("./pages/PartnersPage")).default }),
    entry: "src/pages/PartnersPage.tsx",
  },
  {
    suffix: "support/",
    loader: async () => ({ Component: (await import("./pages/SupportPage")).default }),
    entry: "src/pages/SupportPage.tsx",
  },
  {
    suffix: "faqs/",
    loader: async () => ({ Component: (await import("./pages/FaqsPage")).default }),
    entry: "src/pages/FaqsPage.tsx",
  },
  {
    suffix: "become-a-donor/",
    loader: async () => ({ Component: (await import("./pages/DonorPage")).default }),
    entry: "src/pages/DonorPage.tsx",
  },
  {
    suffix: "contact/",
    loader: async () => ({ Component: (await import("./pages/ContactPage")).default }),
    entry: "src/pages/ContactPage.tsx",
  },
  {
    suffix: "privacy-policy/",
    loader: async () => ({ Component: (await import("./pages/LegalPage")).PrivacyPage }),
    entry: "src/pages/LegalPage.tsx",
  },
  {
    suffix: "terms/",
    loader: async () => ({ Component: (await import("./pages/LegalPage")).TermsPage }),
    entry: "src/pages/LegalPage.tsx",
  },
  {
    suffix: "accessibility/",
    loader: async () => ({ Component: (await import("./pages/LegalPage")).AccessibilityPage }),
    entry: "src/pages/LegalPage.tsx",
  },
  {
    suffix: "thank-you/donor-registration/",
    loader: async () => ({ Component: (await import("./pages/ThankYouPage")).ThankYouDonorPage }),
    entry: "src/pages/ThankYouPage.tsx",
  },
  {
    suffix: "thank-you/contact/",
    loader: async () => ({ Component: (await import("./pages/ThankYouPage")).ThankYouContactPage }),
    entry: "src/pages/ThankYouPage.tsx",
  },
  {
    suffix: "thank-you/support-enquiry/",
    loader: async () => ({ Component: (await import("./pages/ThankYouPage")).ThankYouSupportPage }),
    entry: "src/pages/ThankYouPage.tsx",
  },
  {
    suffix: "404/",
    loader: async () => ({ Component: (await import("./pages/NotFoundPage")).default }),
    entry: "src/pages/NotFoundPage.tsx",
  },
];

const NOT_FOUND: Leaf = LEAVES[LEAVES.length - 1];

/** Every leaf route for one language: unprefixed for "en", "/hi/..." / "/gu/..." otherwise. */
function localizedChildren(lang: LangCode): RouteRecord[] {
  const prefix = lang === "en" ? "" : `${lang}/`;

  const leaves = LEAVES.map((leaf): RouteRecord => {
    if (leaf.suffix === "" && lang === "en") {
      return { index: true, lazy: leaf.loader, entry: leaf.entry };
    }
    return { path: prefix + leaf.suffix, lazy: leaf.loader, entry: leaf.entry };
  });

  // Catch-all for unmatched paths under this language, e.g. "/hi/*".
  const wildcard: RouteRecord = { path: `${prefix}*`, lazy: NOT_FOUND.loader, entry: NOT_FOUND.entry };

  return [...leaves, wildcard];
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/components/layout/Layout.tsx",
    children: [...localizedChildren("en"), ...localizedChildren("hi"), ...localizedChildren("gu")],
  },
];
