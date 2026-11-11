import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { fallbackStats } from "@/lib/fallback-stats";

export function Stats({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const nf = new Intl.NumberFormat(locale);
  const items: { icon: IconName; label: string; value: number | null }[] = [
    { icon: "box", label: dict.stats.products, value: fallbackStats.products.total },
    { icon: "flask", label: dict.stats.ingredients, value: fallbackStats.ingredients },
    { icon: "users", label: dict.stats.contributors, value: fallbackStats.contributors },
  ];
  return (
    <section aria-labelledby="chiffres-title" id="chiffres" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="chiffres-title" eyebrow={dict.stats.eyebrow} title={dict.stats.title} lead={dict.stats.lead} />
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <div key={it.label} className="reveal flex flex-col-reverse rounded-card bg-surface p-6 ring-1 ring-line">
              <dt className="mt-1 text-muted">{it.label}</dt>
              <dd className="flex items-center gap-3 text-4xl font-extrabold tabular-nums">
                <Icon name={it.icon} className="size-7 text-food" />
                {it.value === null ? "—" : nf.format(it.value)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted">{dict.stats.fallback}</p>
      </Container>
    </section>
  );
}
