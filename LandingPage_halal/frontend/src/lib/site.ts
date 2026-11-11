/**
 * Configuration publique du site. Toutes les URL externes passent par des
 * variables d'environnement NEXT_PUBLIC_* (voir .env.example) pour éviter
 * de coder en dur des domaines non confirmés.
 */
function env(value: string | undefined, fallback: string): string {
  return value && value.trim() !== "" ? value.replace(/\/$/, "") : fallback;
}

export const site = {
  name: "Halal Open Facts",
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
  apiUrl: env(process.env.NEXT_PUBLIC_API_URL, "http://localhost:8000/api"),
  githubUrl: env(process.env.NEXT_PUBLIC_GITHUB_URL, "https://github.com"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.org",
  projects: {
    food: {
      name: "halalopenfoodfacts",
      url: env(process.env.NEXT_PUBLIC_FOOD_URL, "http://localhost:3001"),
    },
    beauty: {
      name: "halalopenbeautyfacts",
      url: env(process.env.NEXT_PUBLIC_BEAUTY_URL, "http://localhost:3002"),
    },
  },
} as const;

export type ProjectKey = keyof typeof site.projects;
