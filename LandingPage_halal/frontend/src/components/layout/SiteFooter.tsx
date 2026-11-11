import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { communityLinks, projectLinks, site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const columns: { title: string; links: { label: string; href: string; ltr?: boolean }[] }[] = [
    {
      title: f.projects,
      links: [
        { label: dict.projects.food.name, href: projectLinks.home("food"), ltr: true },
        { label: dict.projects.beauty.name, href: projectLinks.home("beauty"), ltr: true },
      ],
    },
    {
      title: f.resources,
      links: [
        { label: f.methodology, href: `/${locale}/#methodologie` },
        { label: f.api, href: communityLinks.api },
        { label: dict.nav.faq, href: `/${locale}/#faq` },
      ],
    },
    {
      title: f.community,
      links: [
        { label: f.contribute, href: `/${locale}/#contribuer` },
        { label: f.github, href: communityLinks.github },
      ],
    },
    {
      title: f.legal,
      links: [
        { label: f.legalNotice, href: `/${locale}/legal/#mentions` },
        { label: f.privacy, href: `/${locale}/legal/#confidentialite` },
        { label: `${f.contact} · ${site.contactEmail}`, href: `mailto:${site.contactEmail}` },
      ],
    },
  ];
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <p className="flex items-center gap-2.5 font-bold">
              <Logo />
              <span dir="ltr">{site.name}</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted">{f.tagline}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-3 space-y-1 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} dir={l.ltr ? "ltr" : undefined} className="inline-flex min-h-9 items-center break-all text-muted hover:text-ink hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <span dir="ltr">{site.name}</span> · {f.license}
          </p>
          <div className="flex items-center gap-3">
            <span aria-hidden="true">{f.language}</span>
            <LanguageSwitcher current={locale} label={`${f.language} (${dict.a11y.languageSwitcher})`} />
          </div>
        </div>
      </div>
    </footer>
  );
}
