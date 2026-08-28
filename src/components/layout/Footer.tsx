import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageProvider";

export function Footer() {
  const { t, paths } = useLanguage();

  const footerCols = [
    {
      title: t.footer.explore,
      links: [
        { to: paths.about, label: t.nav.about },
        { to: paths.van, label: t.nav.van },
        { to: paths.partners, label: t.nav.partners },
      ],
    },
    {
      title: t.footer.getInvolved,
      links: [
        { to: paths.donor, label: t.cta.donor },
        { to: paths.support, label: t.cta.support },
      ],
    },
    {
      title: t.footer.help,
      links: [
        { to: paths.faqs, label: t.nav.faqs },
        { to: paths.contact, label: t.nav.contact },
      ],
    },
  ];

  const legalLinks = [
    { to: paths.privacy, label: t.footer.privacy },
    { to: paths.terms, label: t.footer.terms },
    { to: paths.accessibility, label: t.footer.accessibility },
  ];

  return (
    <footer className="bg-ink text-paper relative z-40 -mt-10 rounded-t-[40px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-11 px-5 pb-8 pt-18 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex max-w-[380px] flex-col gap-4.5">
          <div className="flex items-center gap-2.5">
            <span className="bg-brand grid h-[34px] w-[34px] place-items-center rounded-[11px]">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fdfdfd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20.5s-7.2-4.3-7.2-9.6A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.2 2.7c0 5.3-7.2 9.6-7.2 9.6Z" />
                <path d="M12 8.2V3.5" />
              </svg>
            </span>
            <span className="text-[17px] font-bold tracking-[-0.02em]">Maa Yashoda</span>
          </div>
          <p className="text-[14.5px] leading-[1.7] text-[#cfc8d9]">{t.footer.desc}</p>
          <div className="flex flex-col gap-1 rounded-2xl border border-white/15 px-4 py-3.5">
            <span className="text-faint text-[10.5px] font-semibold uppercase tracking-[0.09em]">{t.grant.badge}</span>
            <span className="text-[14.5px] font-semibold">{t.grant.number}</span>
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title} className="flex flex-col gap-3.5">
            <h3 className="text-faint text-[11px] font-semibold uppercase tracking-[0.09em]">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-paper hover:text-brand text-[14.5px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1280px] px-5 pb-12">
        <div className="border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-brand text-[13px] text-[#cfc8d9]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-faint text-[13px]">{t.footer.copyright}</p>
        </div>
        <div className="mt-4.5 flex flex-wrap items-start justify-between gap-4">
          <p className="text-faint max-w-[720px] text-[12.5px] leading-relaxed">{t.footer.note}</p>
          <p className="text-faint flex-none text-[12.5px]">
            Developed by{" "}
            <a href="https://shivantra.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand font-medium text-[#cfc8d9]">
              Shivantra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
