import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";
import { communityLinks } from "@/lib/site";

const icons: [IconName, IconName, IconName, IconName] = ["database", "quote", "book", "code"];

export function OpenData({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="open-data-title" id="open-data" className="cv-auto py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading id="open-data-title" eyebrow={dict.openData.eyebrow} title={dict.openData.title} lead={dict.openData.lead} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {dict.openData.points.map((p, i) => (
              <li key={p.title} className="reveal" style={{ "--i": i } as CSSProperties}>
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon name={icons[i] ?? "check"} className="size-5" />
                </span>
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="mt-1 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="methodologie" className="reveal-right relative self-start overflow-hidden rounded-card bg-brand-strong p-6 text-white shadow-2xl shadow-brand-strong/30 sm:p-8">
          <h3 className="text-xl font-bold">{dict.openData.methodologyTitle}</h3>
          <ol className="mt-6 space-y-4">
            {dict.openData.methodology.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-white/90">{step}</span>
              </li>
            ))}
          </ol>
          <ButtonLink href={communityLinks.api} variant="secondary" icon="database" arrow className="mt-8">
            {dict.openData.apiCta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
