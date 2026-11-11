import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${locale}/#fonctionnement`, label: dict.nav.how },
    { href: `/${locale}/#verdicts`, label: dict.nav.verdicts },
    { href: `/${locale}/#exemple`, label: dict.nav.demo },
    { href: `/${locale}/#open-data`, label: dict.nav.openData },
    { href: `/${locale}/#contribuer`, label: dict.nav.contribute },
    { href: `/${locale}/#faq`, label: dict.nav.faq },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 px-4 sm:px-6 lg:px-8">
        <a href={`/${locale}/`} className="flex min-h-16 items-center gap-2.5 font-bold" aria-label={`${site.name}, accueil`}>
          <Logo />
          <span dir="ltr">{site.name}</span>
        </a>
        <div className="order-3 -mx-4 w-[calc(100%+2rem)] overflow-x-auto border-t border-line/70 px-4 lg:order-none lg:mx-0 lg:w-auto lg:flex-1 lg:border-0 lg:px-0">
          <nav aria-label={dict.a11y.mainNav}>
            <ul className="flex min-h-11 items-center gap-1 text-sm font-medium whitespace-nowrap">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center rounded-md px-2.5 text-muted hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="ms-auto">
          <LanguageSwitcher current={locale} label={dict.a11y.languageSwitcher} />
        </div>
      </div>
    </header>
  );
}
