import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { LiveStats } from "./LiveStats";

export function Stats({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section aria-labelledby="chiffres-title" id="chiffres" className="cv-auto py-16 sm:py-24">
      <Container>
        <SectionHeading id="chiffres-title" eyebrow={dict.stats.eyebrow} title={dict.stats.title} lead={dict.stats.lead} />
        <LiveStats copy={dict.stats} labels={dict.verdicts.labels} locale={locale} />
      </Container>
    </section>
  );
}
