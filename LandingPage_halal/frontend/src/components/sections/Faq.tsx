import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";

/** <details>/<summary> natifs : accessibles au clavier et aux lecteurs d'écran sans JS. */
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="faq-title" id="faq" className="cv-auto py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-title" eyebrow={dict.faq.eyebrow} title={dict.faq.title} align="center" />
        <div className="mt-10 divide-y divide-line rounded-card bg-surface ring-1 ring-line">
          {dict.faq.items.map((item) => (
            <details key={item.question} className="group px-5 sm:px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{item.question}</h3>
                <Icon name="chevron" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
