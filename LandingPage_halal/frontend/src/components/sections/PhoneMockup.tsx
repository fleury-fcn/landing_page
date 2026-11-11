import type { Dictionary } from "@/i18n/types";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { overallVerdict, type Verdict } from "@/lib/verdict";

const panel: Record<Verdict, string> = {
  halal: "bg-halal-bg text-halal",
  doubtful: "bg-doubtful-bg text-doubtful",
  haram: "bg-haram-bg text-haram",
  unknown: "bg-unknown-bg text-unknown",
};

/** Maquette 100 % HTML/CSS : 0 octet d'image, net à toutes les résolutions. */
export function PhoneMockup({ dict }: { dict: Dictionary }) {
  const product = dict.demo.food;
  const rows: { name: string; verdict: Verdict }[] = product.ingredients.slice(1, 4).map((i) => ({
    name: i.code ? `${i.name} (${i.code})` : i.name,
    verdict: i.verdict,
  }));
  const overall = overallVerdict(product.ingredients.map((i) => i.verdict));
  return (
    <div role="img" aria-label={dict.hero.mockupLabel} className="relative mx-auto w-full max-w-[18.5rem]">
      <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--food-soft),transparent)] opacity-90" />
      <div aria-hidden="true" className="rounded-[2.6rem] bg-ink p-2.5 shadow-2xl shadow-ink/20">
        <div className="overflow-hidden rounded-[2.1rem] bg-bg">
          <div className="mx-auto mt-2.5 h-5 w-24 rounded-full bg-ink" />
          <div className="space-y-4 p-4 pt-5">
            <div className="flex items-center gap-3">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--beauty-soft),var(--food-soft))]">
                <div className="size-7 rounded-full bg-surface/80 ring-4 ring-surface/40" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{product.name}</p>
                <p className="text-xs text-muted">{product.brand}</p>
              </div>
            </div>
            <div className={`rounded-2xl p-3 ${panel[overall]}`}>
              <p className="text-[0.7rem] font-semibold uppercase">{dict.demo.overall}</p>
              <p className="mt-1">
                <VerdictBadge verdict={overall} label={dict.verdicts.labels[overall]} size="lg" />
              </p>
            </div>
            <ul className="space-y-2">
              {rows.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-2 rounded-xl bg-surface p-2.5 ring-1 ring-line">
                  <span className="truncate text-xs font-medium">{r.name}</span>
                  <VerdictBadge verdict={r.verdict} label={dict.verdicts.labels[r.verdict]} size="sm" />
                </li>
              ))}
            </ul>
            <div className="h-9 rounded-full bg-ink/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
