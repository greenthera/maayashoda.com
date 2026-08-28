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
  const isDonorPage = location.pathname === paths.donor;

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

  const navItems = isDonorPage
    ? [
        { to: paths.about, label: t.nav.about },
        { to: paths.faqs, label: t.nav.faqs },
        { to: paths.contact, label: t.cta.needHelp },
      ]
    : [
        { to: paths.about, label: t.nav.about },
        { to: paths.van, label: t.nav.van },
        { to: paths.partners, label: t.nav.partners },
        { to: paths.support, label: t.nav.support },
        { to: paths.faqs, label: t.nav.faqs },
      ];

  const mobileNavItems = [{ to: paths.home, label: t.nav.home }, ...navItems, { to: paths.contact, label: t.nav.contact }];

  const linkClass = (isActive: boolean) =>
    `rounded-lg px-3.5 py-2 text-[14.5px] font-medium whitespace-nowrap ${isActive ? "text-brand" : "text-ink hover:text-brand"}`;

  return (
    <header className="bg-paper/92 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-5 px-5">
        <Link to={paths.home} aria-label="Maa Yashoda — home" className="text-ink flex flex-none items-center gap-2.5">
          <Logo />
          <span className="flex flex-col leading-[1.15]">
            <span className="text-[17px] font-bold tracking-[-0.02em]">Maa Yashoda</span>
            <span className="text-faint text-[10.5px] font-semibold uppercase tracking-[0.09em]">Human Milk Bank Initiative</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
              aria-haspopup="true"
              aria-expanded={langOpen}
              className="border-border text-ink hover:border-border-strong flex h-10 items-center gap-1.5 rounded-[10px] border bg-paper px-3 text-[13.5px] font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              <span>{t.label}</span>
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

          {!isDonorPage ? (
            <Link
              to={paths.donor}
              className="bg-brand text-paper hover:bg-brand-hover hidden h-11 items-center whitespace-nowrap rounded-xl px-4.5 text-[14.5px] font-semibold sm:inline-flex"
            >
              {t.cta.donor}
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            className="border-border grid h-[42px] w-[42px] place-items-center rounded-[11px] border bg-paper lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#201859" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav aria-label="Mobile" className="border-border flex flex-col gap-0.5 border-t bg-paper px-5 pb-5 pt-3 lg:hidden">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-border border-b py-3.5 text-base font-medium ${isActive ? "text-brand" : "text-ink"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to={paths.donor} className="bg-brand text-paper mt-2.5 grid h-[50px] place-items-center rounded-xl text-[15px] font-semibold">
            {t.cta.donor}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
