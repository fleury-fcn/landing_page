import type { CSSProperties } from "react";
import { ProjectLogo } from "@/components/brand/ProjectLogo";
import { Phone } from "@/components/phone/Phone";
import { DetailScreen, FloatingChip, ResultScreen, ScannerScreen, type ScreenCopy } from "@/components/phone/screens";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import type { Dictionary } from "@/i18n/types";
import { projectKeys, projectLinks } from "@/lib/site";
import { HeroSearch } from "./HeroSearch";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

export function Hero({ dict }: { dict: Dictionary }) {
  const copy: ScreenCopy = { s: dict.screens, demo: dict.demo, labels: dict.verdicts.labels };
  const L = dict.verdicts.labels;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* fonds animés */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob absolute -top-40 -start-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--brand-soft),transparent)]" />
        <div className="blob absolute top-24 -end-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-glow)_30%,transparent),transparent)]" style={{ animationDelay: "-6s" }} />
        <div className="blob absolute -bottom-40 start-1/3 size-[26rem] rounded-full bg-[radial-gradient(closest-side,var(--beauty-soft),transparent)]" style={{ animationDelay: "-12s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="intro mb-4 inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 text-sm font-medium text-muted ring-1 ring-line backdrop-blur" style={d(0)}>
            <span className="relative flex size-2">
              <span className="ping absolute inline-flex size-full rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {dict.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="intro text-4xl font-extrabold sm:text-5xl lg:text-6xl" style={d(1)}>
            {dict.hero.title} <span className="text-gradient">{dict.hero.titleAccent}</span>
          </h1>
          <p className="intro mt-5 max-w-xl text-lg text-muted" style={d(2)}>
            {dict.hero.subtitle}
          </p>

          <div className="intro" style={d(3)}>
            <HeroSearch
              copy={dict.search}
              cta={dict.hero.ctaSearch}
              addLabel={dict.contribute.add.cta}
              projectNames={{ food: dict.projects.food.tag, beauty: dict.projects.beauty.tag }}
              labels={dict.verdicts.labels}
            />
          </div>

          <div className="intro mt-1 flex flex-wrap items-center gap-3" style={d(4)}>
            <ButtonLink href={projectLinks.scan("food")} variant="secondary" icon="scan">
              {dict.hero.ctaScan}
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {dict.hero.trust.map((item, i) => (
              <li key={item} className="intro flex items-center gap-2" style={d(5 + i)}>
                <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon name="check" className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="intro mt-8 border-t border-line pt-6" style={d(8)}>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase rtl:tracking-normal">{dict.projects.eyebrow}</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {projectKeys.map((key) => (
                <li key={key}>
                  <a
                    href={projectLinks.home(key)}
                    className="lift inline-flex min-h-12 items-center rounded-2xl bg-surface px-3 py-2 ring-1 ring-line hover:shadow-lg hover:shadow-brand-strong/10"
                  >
                    <span className="sr-only">{dict.projects[key].name}</span>
                    <span aria-hidden="true">
                      <ProjectLogo project={key} size="sm" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grappe de téléphones */}
        <div className="relative mx-auto flex h-[33rem] w-full max-w-[34rem] items-center justify-center sm:h-[36rem]">
          <Phone size="sm" tilt={-9} float delay={1} dark className="absolute start-0 top-14 hidden opacity-95 sm:block">
            <ScannerScreen {...copy} />
          </Phone>
          <Phone size="sm" tilt={9} float delay={2} className="absolute end-0 top-24 hidden opacity-95 sm:block">
            <DetailScreen {...copy} />
          </Phone>
          <Phone size="md" float label={dict.hero.mockupLabel} className="relative z-10">
            <ResultScreen {...copy} />
          </Phone>

          <FloatingChip className="start-0 top-6 sm:-start-4" delay={1}>
            <VerdictBadge verdict="haram" label={L.haram} size="sm" />
            <span dir="ltr">{dict.demo.food.ingredients[1]?.name}</span>
          </FloatingChip>
          <FloatingChip className="end-0 top-1/2 sm:-end-2" delay={3}>
            <VerdictBadge verdict="doubtful" label={L.doubtful} size="sm" />
            <span dir="ltr">E120</span>
          </FloatingChip>
          <FloatingChip className="start-2 bottom-10 sm:start-6" delay={5}>
            <VerdictBadge verdict="halal" label={L.halal} size="sm" />
            <span dir="ltr">E330</span>
          </FloatingChip>
        </div>
      </Container>
    </section>
  );
}
