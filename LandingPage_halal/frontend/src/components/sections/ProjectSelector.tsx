import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { projectKeys, projectLinks, site, type ProjectKey } from "@/lib/site";

const icons: Record<ProjectKey, IconName> = { food: "leaf", beauty: "sparkle" };

export function ProjectSelector({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="projets-title" id="projets" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="projets-title" eyebrow={dict.projects.eyebrow} title={dict.projects.title} lead={dict.projects.lead} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {projectKeys.map((key) => {
            const p = dict.projects[key];
            return (
              <li key={key} className={`accent-${key} reveal`}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface p-6 ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-accent hover:shadow-xl hover:shadow-ink/5 sm:p-8">
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
