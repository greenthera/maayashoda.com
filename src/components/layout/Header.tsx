import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageProvider";
import type { LangCode } from "../../content";

function Logo() {
  return (
    <span className="bg-brand grid h-[34px] w-[34px] flex-none place-items-center rounded-[11px]">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fdfdfd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20.5s-7.2-4.3-7.2-9.6A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.2 2.7c0 5.3-7.2 9.6-7.2 9.6Z" />
        <path d="M12 8.2V3.5" />
      </svg>
    </span>
  );
}

export function Header() {
  const { t, lang, setLang, langOptions, paths } = useLanguage();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (langOpen && langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [langOpen]);

  const navItems = [
    { to: paths.about, label: t.nav.about },
    { to: paths.van, label: t.nav.van },
    { to: paths.partners, label: t.nav.partners },
    { to: paths.support, label: t.nav.support },
    { to: paths.faqs, label: t.nav.faqs },
  ];

  const mobileNavItems = [
    { to: paths.home, label: t.nav.home },
    ...navItems,
    { to: paths.contact, label: t.cta.needHelp },
  ];

  const linkClass = (isActive: boolean) =>
    `rounded-lg px-3 py-2 text-[14px] font-medium whitespace-nowrap ${isActive ? "text-brand" : "text-ink hover:text-brand"}`;

  function closeMobileMenu() {
    setMenuOpen(false);
    setLangOpen(false);
  }

  return (
    <header className="bg-paper/92 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center gap-2.5 px-4 sm:h-[72px] sm:gap-5 sm:px-5">
        <Link to={paths.home} aria-label="Maa Yashoda home" className="text-ink flex min-w-0 flex-1 items-center gap-2.5 min-[1140px]:flex-none">
          <Logo />
          <span className="flex min-w-0 flex-col leading-[1.15]">
            <span className="truncate text-[16px] font-bold sm:text-[17px]">Maa Yashoda</span>
            <span className="text-faint hidden truncate text-[10.5px] font-semibold uppercase tracking-[0.09em] min-[380px]:block min-[1140px]:hidden">
              Human Milk Bank on Wheels Initiative
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 min-[1140px]:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-2 min-[1140px]:ml-0 sm:gap-2.5">
          <NavLink
            to={paths.contact}
            className={({ isActive }) =>
              `hidden h-10 items-center gap-1.5 rounded-[10px] px-2.5 text-[13.5px] font-medium min-[1140px]:inline-flex ${
                isActive ? "text-brand" : "text-ink hover:text-brand"
              }`
            }
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" />
              <path d="M12 17h.01" />
            </svg>
            {t.cta.needHelp}
          </NavLink>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
              aria-haspopup="true"
              aria-expanded={langOpen}
              className="border-border text-ink hover:border-border-strong flex h-10 items-center gap-1.5 rounded-[10px] border bg-paper px-2.5 text-[13.5px] font-medium sm:px-3"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              <span className="max-w-[3.5rem] truncate sm:max-w-none">{t.label}</span>
            </button>
            {langOpen ? (
              <ul role="menu" className="border-border card-shadow absolute right-0 top-[46px] flex min-w-[156px] flex-col gap-0.5 rounded-2xl border bg-paper p-1.5">
                {langOptions.map((opt) => (
                  <li key={opt.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setLang(opt.code as LangCode);
                        setLangOpen(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                        lang === opt.code ? "bg-brand-tint font-semibold" : "font-medium hover:bg-surface-1"
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <Link
            to={paths.donor}
            className="bg-brand text-paper hover:bg-brand-hover hidden h-11 items-center whitespace-nowrap rounded-xl px-4.5 text-[14.5px] font-semibold sm:inline-flex"
          >
            {t.cta.donor}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            className="border-border grid h-[42px] w-[42px] place-items-center rounded-[11px] border bg-paper min-[1140px]:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#201859" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav aria-label="Mobile" className="border-border flex max-h-[calc(100dvh-64px)] flex-col gap-0.5 overflow-y-auto border-t bg-paper px-4 pb-5 pt-3 sm:px-5 min-[1140px]:hidden">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `border-border border-b py-3.5 text-base font-medium ${isActive ? "text-brand" : "text-ink"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={paths.donor}
            onClick={closeMobileMenu}
            className="bg-brand text-paper mt-2.5 grid h-[50px] place-items-center rounded-xl text-[15px] font-semibold"
          >
            {t.cta.donor}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
