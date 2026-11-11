import type { CSSProperties, ReactNode } from "react";
import { Phone } from "@/components/phone/Phone";
import { AnalysisScreen, ResultScreen, ScannerScreen, type ScreenCopy } from "@/components/phone/screens";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/types";

const icons: [IconName, IconName, IconName] = ["scan", "flask", "list"];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const copy: ScreenCopy = { s: dict.screens, demo: dict.demo, labels: dict.verdicts.labels };
  const screens: [ReactNode, ReactNode, ReactNode] = [
    <ScannerScreen key="scan" {...copy} />,
    <AnalysisScreen key="analysis" {...copy} />,
    <ResultScreen key="result" {...copy} />,
  ];
  return (
    <section aria-labelledby="fonctionnement-title" id="fonctionnement" className="cv-auto bg-surface-2/60 py-16 sm:py-24">
      <Container>
        <SectionHeading id="fonctionnement-title" eyebrow={dict.how.eyebrow} title={dict.how.title} lead={dict.how.lead} />
        <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
          {/* fil conducteur entre les étapes */}
          <li aria-hidden="true" className="pointer-events-none absolute inset-x-[16%] top-[9.5rem] hidden border-t-2 border-dashed border-brand/30 md:block" />
          {dict.how.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal lift group relative flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line hover:shadow-xl hover:shadow-brand-strong/10"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="relative h-72 overflow-hidden bg-gradient-to-b from-brand-soft to-surface">
                <span className="absolute start-5 top-5 z-10 grid size-11 place-items-center rounded-2xl bg-brand text-on-brand shadow-lg">
                  <Icon name={icons[i] ?? "check"} className="size-5" />
                </span>
                <span aria-hidden="true" className="absolute end-5 top-3 text-6xl font-extrabold text-brand/15">
                  {i + 1}
                </span>
                <div className="absolute inset-x-0 top-12 flex justify-center transition-transform duration-500 group-hover:-translate-y-3">
                  <Phone size="sm" dark={i === 0}>
                    {screens[i]}
                  </Phone>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
