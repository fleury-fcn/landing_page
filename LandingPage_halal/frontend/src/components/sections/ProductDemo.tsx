"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { format } from "@/i18n/get-dictionary";
import type { DemoProduct, Dictionary } from "@/i18n/types";
import { overallVerdict, type Verdict } from "@/lib/verdict";
import { projectKeys, type ProjectKey } from "@/lib/site";

type DemoCopy = Dictionary["demo"];
type Labels = Record<Verdict, string>;

/** Onglets WAI-ARIA (activation automatique, flèches + Début/Fin, sens RTL respecté). */
export function ProductDemo({ demo, labels: verdictLabels }: { demo: DemoCopy; labels: Labels }) {
  const [active, setActive] = useState<ProjectKey>("food");
  const tabs = useRef<Record<ProjectKey, HTMLButtonElement | null>>({ food: null, beauty: null });
  const baseId = useId();
  const tabLabels: Record<ProjectKey, string> = { food: demo.tabFood, beauty: demo.tabBeauty };

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const index = projectKeys.indexOf(active);
    const step: Record<string, number> = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
    };
    let next: number | undefined;
    if (event.key in step) next = (index + (step[event.key] ?? 0) + projectKeys.length) % projectKeys.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projectKeys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const key = projectKeys[next];
    if (!key) return;
    setActive(key);
    tabs.current[key]?.focus();
  }

  return (
    <section aria-labelledby="exemple-title" id="exemple" className="cv-auto py-16 sm:py-24">
      <Container>
        <SectionHeading id="exemple-title" eyebrow={demo.eyebrow} title={demo.title} lead={demo.lead} />
        <div className="mt-10">
          <div
            role="tablist"
            aria-label={demo.tabsLabel}
            onKeyDown={onKeyDown}
            className="inline-flex rounded-full bg-surface-2 p-1 ring-1 ring-line"
          >
            {projectKeys.map((key) => {
              const selected = key === active;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabs.current[key] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${baseId}-tab-${key}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(key)}
                  className={`accent-${key} min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                    selected ? "bg-surface text-accent shadow-sm ring-1 ring-line" : "text-muted hover:text-ink"
                  }`}
                >
                  {tabLabels[key]}
                </button>
              );
            })}
          </div>
          {projectKeys.map((key) => (
            <div
              key={key}
              role="tabpanel"
              id={`${baseId}-panel-${key}`}
              aria-labelledby={`${baseId}-tab-${key}`}
              hidden={key !== active}
              tabIndex={0}
              className={`accent-${key} mt-6 rounded-card`}
            >
              <ProductCard product={demo[key]} demo={demo} labels={verdictLabels} />
            </div>
          ))}
          <p className="mt-4 text-sm text-muted">{demo.fictional}</p>
        </div>
      </Container>
    </section>
  );
}

function ProductCard({ product, demo, labels }: { product: DemoProduct; demo: DemoCopy; labels: Labels }) {
  const overall = overallVerdict(product.ingredients.map((i) => i.verdict));
  const flagged = product.ingredients.filter((i) => i.verdict !== "halal").length;
  const firstFlagged = product.ingredients.findIndex((i) => i.verdict !== "halal");
  return (
    <article className="grid overflow-hidden rounded-card bg-surface ring-1 ring-line lg:grid-cols-[20rem_1fr]">
      <header className="border-b border-line bg-accent-soft/60 p-6 lg:border-e lg:border-b-0 sm:p-8">
        <div aria-hidden="true" className="grid size-20 place-items-center rounded-3xl bg-surface ring-1 ring-line">
          <Icon name="box" className="size-9 text-accent" />
        </div>
        <p className="mt-5 text-sm font-semibold text-accent">{product.category}</p>
        <h3 className="mt-1 text-2xl font-bold">{product.name}</h3>
        <p className="text-muted">{product.brand}</p>
        <div className="mt-6 rounded-2xl bg-surface p-4 ring-1 ring-line">
          <p className="text-sm font-semibold">{demo.overall}</p>
          <p className="mt-2">
            <VerdictBadge verdict={overall} label={labels[overall]} size="lg" />
          </p>
          <p className="mt-2 text-sm text-muted">{demo.overallHint}</p>
        </div>
      </header>
      <div className="p-4 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-2 sm:px-0">
          <h4 className="font-bold">{demo.ingredients}</h4>
          <p className="text-sm text-muted">{format(demo.flagged, { n: flagged })}</p>
        </div>
        <ul className="mt-4 space-y-2">
          {product.ingredients.map((ing, i) => (
            <li key={ing.name + (ing.code ?? "")}>
              <details open={i === firstFlagged} className="group rounded-2xl ring-1 ring-line open:bg-surface-2/50">
                <summary className="flex min-h-14 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <Icon name="chevron" className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
                  <span className="font-medium">{ing.name}</span>
                  {ing.code && (
                    <span className="text-sm text-muted" dir="ltr">
                      {ing.code}
                    </span>
                  )}
                  <span className="ms-auto">
                    <VerdictBadge verdict={ing.verdict} label={labels[ing.verdict]} size="sm" />
                  </span>
                </summary>
                <dl className="grid gap-3 px-4 pb-4 text-sm sm:grid-cols-[8rem_1fr] sm:ps-11">
                  <dt className="font-semibold">{demo.origin}</dt>
                  <dd className="text-muted">{ing.origin}</dd>
                  <dt className="font-semibold">{demo.source}</dt>
                  <dd className="text-muted">{ing.source}</dd>
                  {ing.schools && (
                    <>
                      <dt className="font-semibold">{demo.schools}</dt>
                      <dd className="text-muted">{ing.schools}</dd>
                    </>
                  )}
                </dl>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
