import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/${defaultLocale}/` },
};

/** Choisit la langue du navigateur si elle est supportée, sinon le français. */
const pickLocale = `(function(){var s=${JSON.stringify(locales)};var l=(navigator.languages||[navigator.language]).map(function(x){return String(x).slice(0,2)}).find(function(x){return s.indexOf(x)>-1})||"${defaultLocale}";location.replace("/"+l+"/")})();`;

/**
 * « / » : redirection sans dépendre de JS (meta refresh) + détection de langue
 * si JS est disponible + liens visibles en dernier recours.
 */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`1;url=/${defaultLocale}/`} />
      <script dangerouslySetInnerHTML={{ __html: pickLocale }} />
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1rem", textAlign: "center" }}>
        <h1>{site.name}</h1>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem", justifyContent: "center" }}>
          {locales.map((l) => (
            <li key={l}>
              <a href={`/${l}/`} hrefLang={l} lang={l}>
                {localeMeta[l].label}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
