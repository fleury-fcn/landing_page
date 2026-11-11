import { isProjectKey, site, type ProjectKey } from "./site";
import { isVerdict, type Verdict } from "./verdict";

/* ───────── Types alignés sur les serializers DRF (backend/catalog/serializers.py) ───────── */

export interface ProductSummary {
  barcode: string;
  name: string;
  brand: string;
  project: ProjectKey;
  verdict: Verdict;
  image_url: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiStats {
  products: { food: number; beauty: number; total: number };
  ingredients: number;
  contributors: number;
  updated_at: string;
}

/* ───────── Gardes de type (aucune confiance aveugle dans le JSON reçu) ───────── */

type UnknownRecord = Record<string, unknown>;
const isRecord = (v: unknown): v is UnknownRecord => typeof v === "object" && v !== null && !Array.isArray(v);
const isCount = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

export function isProductSummary(v: unknown): v is ProductSummary {
  return (
    isRecord(v) &&
    typeof v.barcode === "string" &&
    typeof v.name === "string" &&
    typeof v.brand === "string" &&
    typeof v.image_url === "string" &&
    isProjectKey(v.project) &&
    isVerdict(v.verdict)
  );
}

export function isProductList(v: unknown): v is ProductSummary[] {
  return Array.isArray(v) && v.every(isProductSummary);
}

export function isPaginatedProducts(v: unknown): v is Paginated<ProductSummary> {
  return isRecord(v) && isCount(v.count) && isProductList(v.results);
}

export function isApiStats(v: unknown): v is ApiStats {
  return (
    isRecord(v) &&
    isRecord(v.products) &&
    isCount(v.products.food) &&
    isCount(v.products.beauty) &&
    isCount(v.products.total) &&
    isCount(v.ingredients) &&
    isCount(v.contributors) &&
    typeof v.updated_at === "string"
  );
}

/* ───────── Client ───────── */

export type ApiErrorKind = "network" | "timeout" | "http" | "invalid";

export class ApiError extends Error {
  constructor(
    readonly kind: ApiErrorKind,
    readonly status?: number,
  ) {
    super(`API ${kind}${status ? ` ${status}` : ""}`);
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT_MS = 6000;

export async function fetchJson<T>(
  path: string,
  guard: (v: unknown) => v is T,
  { signal, timeoutMs = DEFAULT_TIMEOUT_MS }: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<T> {
  const timeout = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  let res: Response;
  try {
    res = await fetch(`${site.apiUrl}${path}`, { signal: combined, headers: { Accept: "application/json" } });
  } catch (err) {
    if (signal?.aborted) throw err; // annulation volontaire : on laisse remonter l'AbortError
    throw new ApiError(timeout.aborted ? "timeout" : "network");
  }
  if (!res.ok) throw new ApiError("http", res.status);
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new ApiError("invalid");
  }
  if (!guard(data)) throw new ApiError("invalid");
  return data;
}

export const api = {
  stats: (signal?: AbortSignal) => fetchJson("/stats/", isApiStats, { signal }),
  popular: (limit = 6, signal?: AbortSignal) => fetchJson(`/products/popular/?limit=${limit}`, isProductList, { signal }),
  search: (q: string, project: ProjectKey, signal?: AbortSignal) =>
    fetchJson(
      `/products/search/?${new URLSearchParams({ q, project }).toString()}`,
      isPaginatedProducts,
      { signal },
    ),
};

export const isAbortError = (err: unknown): boolean => err instanceof DOMException && err.name === "AbortError";
