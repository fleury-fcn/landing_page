"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { format } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { api, isAbortError, type ProductSummary } from "@/lib/api";
import { projectKeys, projectLinks, type ProjectKey } from "@/lib/site";
import type { Verdict } from "@/lib/verdict";

type State =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "done"; q: string; count: number; results: ProductSummary[] };

const MAX_RESULTS = 5;

/**
 * Amélioration progressive : sans JS, le formulaire GET envoie vers la recherche
 * de l'application ; avec JS, les résultats s'affichent sur place via l'API Django.
 */
export function HeroSearch({
  copy,
  cta,
  projectNames,
  labels,
  addLabel,
}: {
  copy: Dictionary["search"];
  addLabel: string;
  cta: string;
  projectNames: Record<ProjectKey, string>;
  labels: Record<Verdict, string>;
}) {
  const [project, setProject] = useState<ProjectKey>("food");
  const [state, setState] = useState<State>({ kind: "idle" });
  const controller = useRef<AbortController | null>(null);
  const id = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    if (q.length < 2) {
      setState({ kind: "invalid" });
      return;
    }
    controller.current?.abort();
    const ctrl = new AbortController();
    controller.current = ctrl;
    setState({ kind: "loading" });
    try {
      const page = await api.search(q, project, ctrl.signal);
      setState({ kind: "done", q, count: page.count, results: page.results.slice(0, MAX_RESULTS) });
    } catch (err) {
      if (!isAbortError(err)) setState({ kind: "error" });
    }
  }

  const message =
    state.kind === "invalid"
      ? copy.minChars
      : state.kind === "loading"
        ? copy.loading
        : state.kind === "error"
          ? copy.error
          : state.kind === "done"
            ? state.count === 0
              ? format(copy.empty, { q: state.q })
              : format(copy.results, { n: state.count, q: state.q })
            : "";

  return (
    <form
      action={projectLinks.search(project)}
      method="get"
      role="search"
      aria-label={copy.title}
      onSubmit={onSubmit}
      noValidate
      className="mt-8 max-w-xl"
    >
      <fieldset className="mb-3">
        <legend className="sr-only">{copy.projectLabel}</legend>
        <div className="inline-flex rounded-full bg-surface-2 p-1 ring-1 ring-line">
          {projectKeys.map((key) => (
            <label key={key} className={`accent-${key} relative cursor-pointer`}>
              <input
                type="radio"
                name="project"
                value={key}
                checked={project === key}
                onChange={() => setProject(key)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-9 items-center rounded-full px-4 text-sm font-semibold text-muted transition-colors peer-checked:bg-surface peer-checked:text-accent peer-checked:shadow-sm peer-checked:ring-1 peer-checked:ring-line peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus)">
                {projectNames[key]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor={`${id}-q`} className="mb-2 block text-sm font-semibold">
        {copy.inputLabel}
      </label>
      <div className="flex flex-col gap-2 rounded-3xl bg-surface p-2 shadow-xl ring-1 shadow-brand-strong/10 ring-line focus-within:ring-2 focus-within:ring-(--focus) sm:flex-row sm:rounded-full">
        <div className="flex flex-1 items-center gap-2 ps-3">
          <Icon name="search" className="size-5 shrink-0 text-muted" />
          <input
            id={`${id}-q`}
            name="q"
            type="search"
            minLength={2}
            autoComplete="off"
            enterKeyHint="search"
            placeholder={copy.placeholder}
            aria-describedby={`${id}-status`}
            aria-invalid={state.kind === "invalid" || undefined}
            className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-muted/80 focus-visible:outline-none"
          />
        </div>
        <button
          type="submit"
          aria-disabled={state.kind === "loading" || undefined}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-on-brand shadow-lg shadow-brand/25 transition-all hover:bg-brand/90 active:scale-[0.97]"
        >
          {cta}
        </button>
      </div>

      <p id={`${id}-status`} role="status" className="mt-3 min-h-6 text-sm text-muted">
        {message}
      </p>

      {state.kind === "done" && state.results.length > 0 && (
        <div className="rounded-2xl bg-surface p-2 ring-1 ring-line">
          <ul>
            {state.results.map((p) => (
              <li key={p.barcode}>
                <a
                  href={projectLinks.product(p.project, p.barcode)}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-surface-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{p.name}</span>
                    <span className="block truncate text-sm text-muted">{p.brand}</span>
                  </span>
                  <VerdictBadge verdict={p.verdict} label={labels[p.verdict]} size="sm" />
                </a>
              </li>
            ))}
          </ul>
          {state.count > state.results.length && (
            <a
              href={projectLinks.search(project, state.q)}
              className="mt-1 flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold hover:bg-surface-2"
            >
              {copy.seeAll}
              <Icon name="arrow" className="size-4 rtl:-scale-x-100" />
            </a>
          )}
        </div>
      )}
      {state.kind === "done" && state.count === 0 && (
        <a href={projectLinks.addProduct(project)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
          {addLabel}
        </a>
      )}
    </form>
  );
}
