import { Outlet } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingBar } from "./LoadingBar";
import { ScrollManager } from "./ScrollManager";
import { SocialLinks } from "../ui/SocialLinks";

export function Layout() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <LoadingBar />
      <a
        href="#main"
        className="bg-ink text-paper absolute left-[-9999px] top-0 z-[100] px-4.5 py-3 focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <div className="bg-brand">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-5">
          <span className="text-ink/85 text-[11.5px] font-semibold uppercase tracking-[0.08em]">Follow the initiative</span>
          <SocialLinks size={16} linkClass="text-white hover:bg-white/15" />
        </div>
      </div>
      <Header />
      <main id="main" className="block min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
