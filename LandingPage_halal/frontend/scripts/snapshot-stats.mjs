// Récupère /api/stats/ et met à jour src/lib/stats-snapshot.json (repli statique).
// Si l'API est injoignable, le fichier existant est conservé : le build ne casse jamais.
import { writeFile } from "node:fs/promises";

const api = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");
const target = new URL("../src/lib/stats-snapshot.json", import.meta.url);

try {
  const res = await fetch(`${api}/stats/`, { signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const s = await res.json();
  const snapshot = {
    products: { food: s.products.food, beauty: s.products.beauty, total: s.products.total },
    ingredients: s.ingredients,
    contributors: s.contributors,
    updatedAt: s.updated_at,
  };
  await writeFile(target, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`[snapshot:stats] mis à jour depuis ${api}`);
} catch (err) {
  console.warn(`[snapshot:stats] API indisponible (${err.message}) : instantané existant conservé.`);
}
