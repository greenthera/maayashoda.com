import { Outlet } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingBar } from "./LoadingBar";
import { ScrollManager } from "./ScrollManager";

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
      <Header />
      <main id="main" className="block min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
