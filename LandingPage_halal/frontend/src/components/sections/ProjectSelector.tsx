import { Phone } from "@/components/phone/Phone";
import { ResultScreen } from "@/components/phone/screens";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { projectKeys, projectLinks, site, type ProjectKey } from "@/lib/site";

const icons: Record<ProjectKey, IconName> = { food: "leaf", beauty: "sparkle" };

export function ProjectSelector({ dict }: { dict: Dictionary }) {
  const { screens, demo } = dict;
  const labels = dict.verdicts.labels;
  return (
    <section aria-labelledby="projets-title" id="projets" className="cv-auto py-16 sm:py-24">
      <Container>
        <SectionHeading id="projets-title" eyebrow={dict.projects.eyebrow} title={dict.projects.title} lead={dict.projects.lead} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {projectKeys.map((key, idx) => {
            const p = dict.projects[key];
            return (
              <li key={key} className={`accent-${key} ${idx === 0 ? "reveal-left" : "reveal-right"}`}>
                <article className="lift group relative flex h-full flex-col overflow-hidden rounded-card bg-surface p-6 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent hover:shadow-2xl hover:shadow-brand-strong/10 sm:p-8 sm:pe-52 lg:pe-56">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <Icon name={icons[key]} className="size-6" />
                    </span>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">{p.tag}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold" dir="ltr">
                    <span className="sr-only">{site.projects[key].name}: </span>
                    {p.name}
                  </h3>
                  <p className="mt-3 text-muted">{p.description}</p>
                  <p className="mt-6 text-sm font-semibold">{p.watchlistLabel}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.watchlist.map((w) => (
                      <li key={w} className="rounded-full bg-surface-2 px-3 py-1 text-sm">
                        {w}
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -end-6 -bottom-40 hidden transition-transform duration-500 group-hover:-translate-y-6 sm:block"
                  >
                    <div className="absolute inset-0 -z-10 rounded-full bg-accent-soft blur-2xl" />
                    <Phone size="sm" tilt={-6}>
                      <ResultScreen s={screens} demo={demo} labels={labels} kind={key} />
                    </Phone>
                  </div>
                  <a
                    href={projectLinks.home(key)}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-accent after:absolute after:inset-0 after:content-['']"
                  >
                    {p.cta}
                    <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
