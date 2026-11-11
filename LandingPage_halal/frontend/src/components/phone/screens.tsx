import type { CSSProperties, ReactNode } from "react";
import { HalalSeal } from "@/components/brand/HalalSeal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import type { DemoIngredient, DemoProduct, Dictionary } from "@/i18n/types";
import { overallVerdict, type Verdict } from "@/lib/verdict";

/* Écrans d'application (maquettes HTML/CSS) réutilisés dans toute la landing. */

export interface ScreenCopy {
  s: Dictionary["screens"];
  demo: Dictionary["demo"];
  labels: Record<Verdict, string>;
}

const panel: Record<Verdict, string> = {
  halal: "bg-halal-bg text-halal",
  doubtful: "bg-doubtful-bg text-doubtful",
  haram: "bg-haram-bg text-haram",
  unknown: "bg-unknown-bg text-unknown",
};

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const label = (i: DemoIngredient) => (i.code && !i.code.includes(" ") ? `${i.name} (${i.code})` : i.name);

function AppBar({ title, icon = "back" }: { title: string; icon?: IconName }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-1 pb-2">
      <Icon name={icon} className="size-3.5 text-muted rtl:-scale-x-100" />
      <span className="text-[0.7rem] font-bold">{title}</span>
    </div>
  );
}

function TabBar({ active }: { active: 0 | 1 | 2 }) {
  const icons: IconName[] = ["search", "scan", "clock"];
  return (
    <div className="mt-auto flex items-center justify-around border-t border-line bg-surface px-4 py-2.5">
      {icons.map((name, i) => (
        <span
          key={name}
          className={`grid size-7 place-items-center rounded-full ${i === active ? "bg-brand text-on-brand" : "text-muted"}`}
        >
          <Icon name={name} className="size-3.5" />
        </span>
      ))}
    </div>
  );
}

function ProductHead({ product, accent = "food" }: { product: DemoProduct; accent?: "food" | "beauty" }) {
  return (
    <div className="flex items-center gap-2.5 px-4">
      <div
        className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent === "food" ? "bg-brand-soft text-brand" : "bg-beauty-soft text-beauty"}`}
      >
        <Icon name={accent === "food" ? "box" : "sparkle"} className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[0.7rem] leading-tight font-bold">{product.name}</p>
        <p className="text-[0.6rem] text-muted">{product.brand}</p>
      </div>
    </div>
  );
}

/** 1. Scanner : viseur caméra + ligne laser animée. */
export function ScannerScreen({ s }: ScreenCopy) {
  return (
    <div className="flex h-full flex-col bg-[#06120b] text-white">
      <AppBrand dark />
      <p className="px-4 text-[0.7rem] font-bold">{s.scanTitle}</p>
      <div className="relative mx-4 mt-2 flex-1 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,#1d3b2b,#06120b_75%)]">
        {/* coins du viseur */}
        {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute size-6 rounded-sm border-brand-glow ${c}`} />
        ))}
        {/* code-barres */}
        <div className="absolute inset-x-8 top-1/2 flex h-16 -translate-y-1/2 items-stretch justify-center gap-[2px] rounded-md bg-white p-2" dir="ltr">
          {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2].map((w, i) => (
            <span key={i} className="bg-black" style={{ width: w }} />
          ))}
        </div>
        <span className="scanline absolute inset-x-5 top-1/2 h-0.5 rounded-full bg-brand-glow shadow-[0_0_14px_3px_var(--brand-glow)]" />
      </div>
      <p className="px-4 pt-3 text-center text-[0.6rem] text-white/80">{s.scanHint}</p>
      <div className="flex items-center justify-center gap-1.5 pt-2 pb-5 text-[0.6rem] font-semibold text-brand-glow">
        <span className="relative flex size-2">
          <span className="ping absolute inline-flex size-full rounded-full bg-brand-glow opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-glow" />
        </span>
        {s.scanning}
      </div>
    </div>
  );
}

/** 2. Résultat : statut global + liste d'ingrédients qui apparaissent un à un. */
export function ResultScreen({ demo, labels, kind = "food" }: ScreenCopy & { kind?: "food" | "beauty" }) {
  const product = demo[kind];
  const overall = overallVerdict(product.ingredients.map((i) => i.verdict));
  return (
    <div className="flex h-full flex-col">
      <AppBrand kind={kind} />
      <AppBar title={product.category} />
      <ProductHead product={product} accent={kind} />
      <div className={`pop mx-4 mt-3 rounded-2xl p-3 ${panel[overall]}`} style={d(0)}>
        <p className="text-[0.55rem] font-bold uppercase">{demo.overall}</p>
        <div className="mt-1.5">
          <VerdictBadge verdict={overall} label={labels[overall]} size="md" />
        </div>
      </div>
      <ul className="mt-3 space-y-1.5 px-4">
        {product.ingredients.slice(0, 4).map((ing, i) => (
          <li
            key={ing.name + i}
            className="intro flex items-center justify-between gap-2 rounded-xl bg-surface px-2.5 py-2 ring-1 ring-line"
            style={d(i + 4)}
          >
            <span className="truncate text-[0.6rem] font-medium">{label(ing)}</span>
            <VerdictBadge verdict={ing.verdict} label={labels[ing.verdict]} size="sm" />
          </li>
        ))}
      </ul>
      <TabBar active={1} />
    </div>
  );
}

/** 3. Détail d'un ingrédient avec origine, source et divergences. */
export function DetailScreen({ s, demo, labels }: ScreenCopy) {
  const ing = demo.food.ingredients.find((i) => i.schools) ?? demo.food.ingredients[0];
  if (!ing) return null;
  const rows: [string, string][] = [
    [demo.origin, ing.origin],
    [demo.source, ing.source],
    ...(ing.schools ? ([[demo.schools, ing.schools]] as [string, string][]) : []),
  ];
  return (
    <div className="flex h-full flex-col">
      <AppBrand />
      <AppBar title={s.detailTitle} />
      <div className="px-4">
        <p className="text-sm font-extrabold">{ing.name}</p>
        {ing.code && <p className="text-[0.6rem] text-muted" dir="ltr">{ing.code}</p>}
        <div className="pop mt-2" style={d(1)}>
          <VerdictBadge verdict={ing.verdict} label={labels[ing.verdict]} size="md" />
        </div>
      </div>
      <dl className="mt-3 space-y-2 px-4">
        {rows.map(([k, v], i) => (
          <div key={k} className="intro rounded-xl bg-surface p-2.5 ring-1 ring-line" style={d(i + 3)}>
            <dt className="text-[0.55rem] font-bold text-brand uppercase">{k}</dt>
            <dd className="mt-0.5 line-clamp-3 text-[0.6rem] leading-snug text-muted">{v}</dd>
          </div>
        ))}
      </dl>
      <TabBar active={1} />
    </div>
  );
}

/** 4. Recherche : champ + résultats avec pastilles. */
export function SearchScreen({ s, demo, labels }: ScreenCopy) {
  const products: { p: DemoProduct; icon: IconName; tone: string }[] = [
    { p: demo.food, icon: "box", tone: "bg-brand-soft text-brand" },
    { p: demo.beauty, icon: "sparkle", tone: "bg-beauty-soft text-beauty" },
  ];
  return (
    <div className="flex h-full flex-col">
      <AppBrand />
      <p className="px-4 text-[0.7rem] font-bold">{s.searchTitle}</p>
      <div className="mx-4 mt-2 flex items-center gap-2 rounded-full bg-surface px-3 py-2 ring-1 ring-brand">
        <Icon name="search" className="size-3 text-muted" />
        <span className="text-[0.65rem]">{s.searchQuery}</span>
        <span className="h-3 w-px animate-pulse bg-brand" />
      </div>
      <ul className="mt-3 space-y-1.5 px-4">
        {products.map(({ p, icon, tone }, i) => {
          const v = overallVerdict(p.ingredients.map((x) => x.verdict));
          return (
            <li key={p.name} className="intro flex items-center gap-2 rounded-xl bg-surface p-2 ring-1 ring-line" style={d(i + 2)}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${tone}`}>
                <Icon name={icon} className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.6rem] font-semibold">{p.name}</span>
                <span className="block text-[0.55rem] text-muted">{p.brand}</span>
              </span>
              <VerdictBadge verdict={v} label={labels[v]} size="sm" />
            </li>
          );
        })}
      </ul>
      <p className="mt-4 px-4 text-[0.55rem] font-bold text-muted uppercase">{s.recent}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5 px-4">
        {["E471", "E120", "gélatine", "carmin"].map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.55rem]">
            {t}
          </span>
        ))}
      </div>
      <TabBar active={0} />
    </div>
  );
}

/** 5. Analyse en cours : barres de progression animées par ingrédient. */
export function AnalysisScreen({ s, demo }: ScreenCopy) {
  return (
    <div className="flex h-full flex-col">
      <AppBrand />
      <AppBar title={s.analysing} icon="flask" />
      <div className="mx-4 mt-1 grid aspect-square place-items-center rounded-2xl bg-brand-soft">
        <div className="relative grid size-16 place-items-center rounded-full bg-surface shadow-lg">
          <span className="ping absolute inset-0 rounded-full bg-brand/30" />
          <Icon name="flask" className="size-7 text-brand" />
        </div>
      </div>
      <p className="mt-2 px-4 text-[0.55rem] text-muted">{s.analysingHint}</p>
      <ul className="mt-2 space-y-2 px-4">
        {demo.food.ingredients.slice(0, 4).map((ing, i) => (
          <li key={ing.name}>
            <span className="text-[0.6rem] font-medium">{ing.name}</span>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface-2">
              <span className="bar-fill block h-full rounded-full bg-brand" style={d(i)} />
            </span>
          </li>
        ))}
      </ul>
      <TabBar active={1} />
    </div>
  );
}

/** 6. Historique des produits scannés. */
export function HistoryScreen({ s, demo, labels }: ScreenCopy) {
  const items = [...demo.food.ingredients.slice(0, 2), ...demo.beauty.ingredients.slice(2, 4), demo.food.ingredients[4]].filter(
    (x): x is DemoIngredient => Boolean(x),
  );
  return (
    <div className="flex h-full flex-col">
      <AppBrand />
      <p className="px-4 text-[0.7rem] font-bold">{s.historyTitle}</p>
      <p className="mt-2 px-4 text-[0.55rem] font-bold text-muted uppercase">{s.today}</p>
      <ul className="mt-1.5 space-y-1.5 px-4">
        {items.map((ing, i) => (
          <li key={ing.name + i} className="intro flex items-center gap-2 rounded-xl bg-surface p-2 ring-1 ring-line" style={d(i + 1)}>
            <Icon name="clock" className="size-3.5 shrink-0 text-muted" />
            <span className="min-w-0 flex-1 truncate text-[0.6rem] font-medium">{ing.name}</span>
            <VerdictBadge verdict={ing.verdict} label={labels[ing.verdict]} size="sm" />
          </li>
        ))}
      </ul>
      <TabBar active={2} />
    </div>
  );
}

/** 7. Contribution : étapes + bouton photo. */
export function ContributeScreen({ s }: ScreenCopy) {
  return (
    <div className="flex h-full flex-col">
      <AppBrand />
      <AppBar title={s.contributeTitle} />
      <div className="relative mx-4 grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line">
        <div className="shimmer absolute inset-0" />
        <Icon name="camera" className="size-9 text-brand" />
      </div>
      <ol className="mt-3 space-y-1.5 px-4">
        {s.contributeSteps.map((step, i) => (
          <li key={step} className="flex items-center gap-2 text-[0.6rem]">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.55rem] font-bold ${i === 0 ? "bg-brand text-on-brand" : "bg-surface-2 text-muted"}`}
            >
              {i === 0 ? <Icon name="check" className="size-3" strokeWidth={3} /> : i + 1}
            </span>
            <span className={i === 0 ? "font-semibold" : "text-muted"}>{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-auto px-4 pb-5">
        <span className="tap flex items-center justify-center gap-1.5 rounded-full bg-brand py-2.5 text-[0.65rem] font-bold text-on-brand">
          <Icon name="camera" className="size-3.5" />
          {s.takePhoto}
        </span>
      </div>
    </div>
  );
}

/** Pastille flottante autour des téléphones. */
export function FloatingChip({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pop absolute z-10 flex items-center gap-2 rounded-2xl bg-surface/95 px-3 py-2 text-xs font-semibold shadow-xl ring-1 shadow-brand-strong/10 ring-line backdrop-blur ${className}`}
      style={d(delay)}
    >
      {children}
    </div>
  );
}

/** Bandeau de marque dans l'app : sceau + nom du projet halal. */
export function AppBrand({ kind = "food", dark = false }: { kind?: "food" | "beauty"; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 pb-1.5 ${dark ? "text-white" : ""}`}>
      <span className="flex items-center gap-1.5" dir="ltr">
        <HalalSeal variant={kind} className="size-5" />
        <span className="text-[0.6rem] leading-none font-extrabold tracking-tight">
          <span className={dark ? "text-[#7fe0a8]" : kind === "food" ? "text-brand" : "text-beauty"}>halal</span>
          <span className="opacity-60">open</span>
          {kind}
          <span className="opacity-60">facts</span>
        </span>
      </span>
      <span lang="ar" className={`text-[0.6rem] font-bold ${dark ? "text-[#7fe0a8]" : kind === "food" ? "text-brand" : "text-beauty"}`}>
        حلال
      </span>
    </div>
  );
}
