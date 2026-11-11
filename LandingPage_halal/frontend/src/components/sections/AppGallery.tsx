import type { CSSProperties, ReactNode } from "react";
import { Phone } from "@/components/phone/Phone";
import {
  ContributeScreen,
  DetailScreen,
  HistoryScreen,
  ResultScreen,
  ScannerScreen,
  SearchScreen,
  type ScreenCopy,
} from "@/components/phone/screens";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/types";

/**
 * Galerie défilante d'écrans de l'app. La piste est dupliquée pour une boucle
 * continue (copie masquée aux lecteurs d'écran) ; pause au survol/focus ;
 * sans animation si prefers-reduced-motion (défilement manuel).
 */
export function AppGallery({ dict }: { dict: Dictionary }) {
  const copy: ScreenCopy = { s: dict.screens, demo: dict.demo, labels: dict.verdicts.labels };
  const c = dict.gallery.captions;
  const items: { key: string; caption: string; screen: ReactNode }[] = [
    { key: "scan", caption: c.scan, screen: <ScannerScreen {...copy} /> },
    { key: "result", caption: c.result, screen: <ResultScreen {...copy} /> },
    { key: "detail", caption: c.detail, screen: <DetailScreen {...copy} /> },
    { key: "search", caption: c.search, screen: <SearchScreen {...copy} /> },
    { key: "beauty", caption: c.beauty, screen: <ResultScreen {...copy} kind="beauty" /> },
    { key: "history", caption: c.history, screen: <HistoryScreen {...copy} /> },
    { key: "contribute", caption: c.contribute, screen: <ContributeScreen {...copy} /> },
  ];

  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 gap-6 ${hidden ? "motion-reduce:hidden" : ""}`}>
      {items.map((it, i) => (
        <li key={it.key}>
          <figure className="flex w-[12.5rem] flex-col items-center gap-4">
            <Phone size="sm" tilt={i % 2 === 0 ? -2 : 2} dark={it.key === "scan"}>
              {it.screen}
            </Phone>
            <figcaption className="text-center text-sm font-medium text-white/85">{it.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="galerie-title" id="galerie" className="cv-auto relative isolate overflow-hidden bg-brand-strong py-16 text-white sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="blob absolute -top-24 start-1/4 size-[28rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-glow)_30%,transparent),transparent)]" />
        <div className="blob absolute -bottom-32 end-0 size-[24rem] rounded-full bg-[radial-gradient(closest-side,#0f8a5066,transparent)]" style={{ animationDelay: "-9s" }} />
      </div>
      <Container>
        <div className="reveal max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-wide text-[#b9f0cf] uppercase rtl:tracking-normal">{dict.gallery.eyebrow}</p>
          <h2 id="galerie-title" className="text-3xl font-bold sm:text-4xl">
            {dict.gallery.title}
          </h2>
          <p className="mt-4 text-lg text-white/80">{dict.gallery.lead}</p>
        </div>
      </Container>
      <div className="marquee mt-12 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max gap-6 px-6 py-4" style={{ "--gap": "1.5rem" } as CSSProperties}>
          {track(false)}
          {track(true)}
        </div>
      </div>
    </section>
  );
}
