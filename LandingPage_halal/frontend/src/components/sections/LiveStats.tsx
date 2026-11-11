"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Icon, type IconName } from "@/components/ui/Icon";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { api, isAbortError, type ProductSummary } from "@/lib/api";
import { fallbackStats, type StatsSnapshot } from "@/lib/fallback-stats";
import { projectLinks } from "@/lib/site";
import type { Verdict } from "@/lib/verdict";

type Status = "loading" | "live" | "fallback";

export function LiveStats({
  copy,
  labels,
  locale,
}: {
  copy: Dictionary["stats"];
  labels: Record<Verdict, string>;
  locale: Locale;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [stats, setStats] = useState<StatsSnapshot>(fallbackStats);
  const [popular, setPopular] = useState<ProductSummary[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    api
      .stats(controller.signal)
      .then((s) => {
        setStats({ products: s.products, ingredients: s.ingredients, contributors: s.contributors, updatedAt: s.updated_at });
        setStatus("live");
      })
      .catch((err: unknown) => {
        if (!isAbortError(err)) setStatus("fallback");
      });
    api
      .popular(4, controller.signal)
      .then(setPopular)
      .catch(() => {
        /* La liste est facultative : on ne l'affiche simplement pas. */
      });
    return () => controller.abort();
  }, []);

  const nf = new Intl.NumberFormat(locale);
  const items: { icon: IconName; label: string; value: number | null }[] = [
    { icon: "box", label: copy.products, value: stats.products.total },
    { icon: "flask", label: copy.ingredients, value: stats.ingredients },
    { icon: "users", label: copy.contributors, value: stats.contributors },
  ];
  const updated = stats.updatedAt ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(stats.updatedAt)) : "";
  const note = status === "loading" ? copy.loading : status === "live" ? format(copy.live, { date: updated }) : copy.fallback;

  return (
    <>
      <dl className="mt-10 grid gap-4 sm:grid-cols-3" aria-busy={status === "loading"}>
        {items.map((it, i) => (
          <div
            key={it.label}
            style={{ "--i": i } as CSSProperties}
            className="reveal lift relative flex flex-col-reverse overflow-hidden rounded-card bg-surface p-6 ring-1 ring-line hover:shadow-xl hover:shadow-brand-strong/10"
          >
            <span aria-hidden="true" className="absolute -end-8 -top-8 size-28 rounded-full bg-brand-soft" />
            <dt className="relative mt-2 text-muted">{it.label}</dt>
            <dd className="flex items-center gap-3 text-4xl font-extrabold tabular-nums">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-on-brand">
                <Icon name={it.icon} className="size-6" />
              </span>
              <span className={`relative ${status === "loading" ? "opacity-60 transition-opacity" : "transition-opacity"}`}>
                {it.value === null ? "—" : <CountUp value={it.value} format={(n) => nf.format(n)} />}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted" role="status">
        {status === "live" && <span aria-hidden="true" className="size-2 rounded-full bg-halal" />}
        {note}
      </p>

      {popular.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold">{copy.popularTitle}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((p) => (
              <li key={p.barcode} className={`accent-${p.project}`}>
                <a
                  href={projectLinks.product(p.project, p.barcode)}
                  className="lift flex h-full flex-col gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line hover:shadow-lg hover:shadow-brand-strong/10"
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-sm text-muted">{p.brand}</span>
                  <span className="mt-auto">
                    <VerdictBadge verdict={p.verdict} label={labels[p.verdict]} size="sm" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
