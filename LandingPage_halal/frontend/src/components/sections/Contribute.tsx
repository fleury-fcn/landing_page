import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { communityLinks, projectLinks } from "@/lib/site";

export function Contribute({ dict }: { dict: Dictionary }) {
  const c = dict.contribute;
  const actions: { key: string; icon: IconName; title: string; text: string; cta: string; href: string; external: boolean }[] = [
    { key: "add", icon: "plus", ...c.add, href: projectLinks.addProduct("food"), external: false },
    { key: "report", icon: "flag", ...c.report, href: communityLinks.reportIssue, external: true },
    { key: "code", icon: "github", ...c.code, href: communityLinks.github, external: true },
  ];
  return (
    <section aria-labelledby="contribuer-title" id="contribuer" className="bg-surface-2/60 py-16 sm:py-24">
      <Container>
        <SectionHeading id="contribuer-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {actions.map((a) => (
            <li key={a.key} className="reveal flex flex-col rounded-card bg-surface p-6 ring-1 ring-line">
              <Icon name={a.icon} className="size-7 text-food" />
              <h3 className="mt-4 text-xl font-bold">{a.title}</h3>
              <p className="mt-2 flex-1 text-muted">{a.text}</p>
              <ButtonLink
                href={a.href}
                variant={a.key === "add" ? "primary" : "secondary"}
                external={a.external}
                className="mt-6 self-start"
                aria-label={a.external ? `${a.cta} ${dict.a11y.opensNewTab}` : undefined}
              >
                {a.cta}
                {a.external && <Icon name="external" className="size-4" />}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
