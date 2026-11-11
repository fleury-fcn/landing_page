import snapshot from "./stats-snapshot.json";

export interface StatsSnapshot {
  products: { food: number | null; beauty: number | null; total: number | null };
  ingredients: number | null;
  contributors: number | null;
  updatedAt: string | null;
}

/**
 * Chiffres de repli si l'API Django est injoignable.
 * Le fichier JSON est régénéré par `npm run snapshot:stats` (lancé en prebuild) ;
 * s'il n'y a jamais eu d'instantané, les valeurs sont null et l'UI affiche « — ».
 */
export const fallbackStats: StatsSnapshot = snapshot;
