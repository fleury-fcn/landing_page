import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import type { Dictionary } from "@/i18n/types";
import { verdicts } from "@/lib/verdict";

const tint = {
  halal: "border-t-halal",
  doubtful: "border-t-doubtful",
  haram: "border-t-haram",
  unknown: "border-t-unknown",
} as const;

export function VerdictSystem({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="verdicts-title" id="verdicts" className="cv-auto py-16 sm:py-24">
      <Container>
        <SectionHeading id="verdicts-title" eyebrow={dict.verdicts.eyebrow} title={dict.verdicts.title} lead={dict.verdicts.lead} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verdicts.map((v, i) => (
            <li key={v} style={{ "--i": i } as CSSProperties} className={`reveal lift rounded-card hover:shadow-xl hover:shadow-brand-strong/10 border-t-4 bg-surface p-6 ring-1 ring-line ${tint[v]}`}>
              <h3>
                <VerdictBadge verdict={v} label={dict.verdicts.labels[v]} size="lg" />
              </h3>
              <p className="mt-4 text-muted">{dict.verdicts.descriptions[v]}</p>
            </li>
          ))}
        </ul>
        <aside
          aria-labelledby="fatwa-title"
          className="reveal mt-8 flex gap-4 rounded-card border-s-4 border-brand bg-brand-soft/60 p-6 sm:p-8"
        >
          <Icon name="book" className="mt-1 size-6 shrink-0 text-food" />
          <div>
            <h3 id="fatwa-title" className="text-lg font-bold">
              {dict.verdicts.disclaimerTitle}
            </h3>
            <p className="mt-2 text-muted">{dict.verdicts.disclaimer}</p>
          </div>
        </aside>
      </Container>
    </section>
  );
}
