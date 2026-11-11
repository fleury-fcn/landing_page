import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Dictionary } from "@/i18n/types";
import { projectLinks } from "@/lib/site";
import { HeroSearch } from "./HeroSearch";
import { PhoneMockup } from "./PhoneMockup";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_50%_at_15%_0%,var(--food-soft),transparent),radial-gradient(45%_45%_at_95%_20%,var(--beauty-soft),transparent)]"
      />
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-sm font-medium text-muted ring-1 ring-line">
            <Icon name="leaf" className="size-4 text-food" />
            {dict.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{dict.hero.subtitle}</p>

          <HeroSearch
            copy={dict.search}
            cta={dict.hero.ctaSearch}
            addLabel={dict.contribute.add.cta}
            projectNames={{ food: dict.projects.food.tag, beauty: dict.projects.beauty.tag }}
            labels={dict.verdicts.labels}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ButtonLink href={projectLinks.scan("food")} variant="secondary" icon="scan">
              {dict.hero.ctaScan}
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {dict.hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-halal" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <PhoneMockup dict={dict} />
      </Container>
    </section>
  );
}
