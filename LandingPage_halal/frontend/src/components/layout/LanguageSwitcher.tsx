import { localeMeta, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ current, label, path = "" }: { current: Locale; label: string; path?: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1 text-sm">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <a
                href={`/${locale}/${path}`}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2.5 font-medium transition-colors ${
                  active ? "bg-brand text-on-brand" : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span aria-hidden="true">{locale.toUpperCase()}</span>
                <span className="sr-only">{localeMeta[locale].label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
