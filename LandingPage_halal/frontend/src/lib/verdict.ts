export const verdicts = ["halal", "doubtful", "haram", "unknown"] as const;
export type Verdict = (typeof verdicts)[number];

export function isVerdict(value: unknown): value is Verdict {
  return typeof value === "string" && (verdicts as readonly string[]).includes(value);
}

/** Ordre de prudence : le statut global d'un produit est le plus sévère de ses ingrédients. */
const severity: Record<Verdict, number> = { halal: 0, unknown: 1, doubtful: 2, haram: 3 };

export function overallVerdict(items: readonly Verdict[]): Verdict {
  if (items.length === 0) return "unknown";
  return items.reduce<Verdict>((worst, v) => (severity[v] > severity[worst] ? v : worst), "halal");
}
