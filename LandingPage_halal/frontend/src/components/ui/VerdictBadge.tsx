import type { Verdict } from "@/lib/verdict";
import { Icon, type IconName } from "./Icon";

const styles: Record<Verdict, { icon: IconName; className: string }> = {
  halal: { icon: "halal", className: "bg-halal-bg text-halal ring-halal/30" },
  doubtful: { icon: "doubtful", className: "bg-doubtful-bg text-doubtful ring-doubtful/30" },
  haram: { icon: "haram", className: "bg-haram-bg text-haram ring-haram/30" },
  unknown: { icon: "unknown", className: "bg-unknown-bg text-unknown ring-unknown/30" },
};

type Size = "sm" | "md" | "lg";
const sizes: Record<Size, { pill: string; icon: string }> = {
  sm: { pill: "gap-1 px-2 py-0.5 text-xs", icon: "size-3.5" },
  md: { pill: "gap-1.5 px-2.5 py-1 text-sm", icon: "size-4" },
  lg: { pill: "gap-2 px-3.5 py-1.5 text-base", icon: "size-5" },
};

/**
 * Pastille de verdict : couleur + icône + libellé.
 * La couleur n'est jamais le seul vecteur d'information (WCAG 1.4.1).
 */
export function VerdictBadge({
  verdict,
  label,
  size = "md",
}: {
  verdict: Verdict;
  label: string;
  size?: Size;
}) {
  const s = styles[verdict];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-semibold whitespace-nowrap ring-1 ring-inset ${s.className} ${sizes[size].pill}`}
      data-verdict={verdict}
    >
      <Icon name={s.icon} className={sizes[size].icon} strokeWidth={2.5} />
      {label}
    </span>
  );
}
