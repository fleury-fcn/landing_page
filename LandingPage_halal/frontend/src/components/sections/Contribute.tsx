import type { CSSProperties } from "react";
import { Phone } from "@/components/phone/Phone";
import { ContributeScreen } from "@/components/phone/screens";
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
    <section aria-labelledby="contribuer-title" id="contribuer" className="cv-auto bg-surface-2/60 py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <SectionHeading id="contribuer-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <div className="reveal-zoom relative mx-auto hidden h-80 w-72 overflow-hidden sm:block lg:me-8">
            <div aria-hidden="true" className="absolute inset-x-6 top-10 bottom-0 rounded-t-full bg-brand-soft" />
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <Phone size="sm" float tilt={4}>
                <ContributeScreen s={dict.screens} demo={dict.demo} labels={dict.verdicts.labels} />
              </Phone>
            </div>
          </div>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {actions.map((a, i) => (
            <li
              key={a.key}
              className="reveal lift flex flex-col rounded-card bg-surface p-6 ring-1 ring-line hover:shadow-xl hover:shadow-brand-strong/10"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={a.icon} className="size-6" />
              </span>
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
