import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { Icon } from "@/components/ui/Icon";
import { projectLinks } from "@/lib/site";

/**
 * Formulaire GET classique : fonctionne sans JavaScript en envoyant vers
 * l'application food. Il est enrichi côté client à l'étape « intégration API ».
 */
export function HeroSearch({ dict }: { dict: Dictionary; locale: Locale }) {
  return (
    <form action={projectLinks.search("food")} method="get" role="search" aria-label={dict.search.title} className="mt-8 max-w-xl">
      <label htmlFor="hero-q" className="mb-2 block text-sm font-semibold">
        {dict.search.inputLabel}
      </label>
      <div className="flex flex-col gap-2 rounded-3xl bg-surface p-2 shadow-lg ring-1 shadow-ink/5 ring-line sm:flex-row sm:rounded-full">
        <div className="flex flex-1 items-center gap-2 ps-3">
          <Icon name="search" className="size-5 shrink-0 text-muted" />
          <input
            id="hero-q"
            name="q"
            type="search"
            required
            minLength={2}
            autoComplete="off"
            placeholder={dict.search.placeholder}
            className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-muted/80"
          />
        </div>
        <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-bg hover:bg-ink/85">
          {dict.hero.ctaSearch}
        </button>
      </div>
    </form>
  );
}
