import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";

const icons: [IconName, IconName, IconName] = ["scan", "flask", "list"];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="fonctionnement-title" id="fonctionnement" className="bg-surface-2/60 py-16 sm:py-24">
      <Container>
        <SectionHeading id="fonctionnement-title" eyebrow={dict.how.eyebrow} title={dict.how.title} lead={dict.how.lead} />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.how.steps.map((step, i) => (
            <li key={step.title} className="reveal relative rounded-card bg-surface p-6 ring-1 ring-line">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-ink text-bg">
                  <Icon name={icons[i] ?? "check"} className="size-6" />
                </span>
                <span aria-hidden="true" className="text-5xl font-extrabold text-line">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
