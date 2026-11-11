import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { AppGallery } from "@/components/sections/AppGallery";
import { Contribute } from "@/components/sections/Contribute";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OpenData } from "@/components/sections/OpenData";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { ProjectSelector } from "@/components/sections/ProjectSelector";
import { Stats } from "@/components/sections/Stats";
import { VerdictSystem } from "@/components/sections/VerdictSystem";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildJsonLd, jsonLdScript } from "@/lib/seo";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(buildJsonLd(locale, dict)) }} />
      <SkipLink label={dict.a11y.skipToContent} />
      <SiteHeader locale={locale} dict={dict} />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Hero dict={dict} />
        <ProjectSelector dict={dict} />
        <HowItWorks dict={dict} />
        <AppGallery dict={dict} />
        <VerdictSystem dict={dict} />
        <ProductDemo demo={dict.demo} labels={dict.verdicts.labels} />
        <OpenData dict={dict} />
        <Stats dict={dict} locale={locale} />
        <Contribute dict={dict} />
        <Faq dict={dict} />
      </main>
      <SiteFooter locale={locale} dict={dict} />
      <RevealObserver />
    </>
  );
}
