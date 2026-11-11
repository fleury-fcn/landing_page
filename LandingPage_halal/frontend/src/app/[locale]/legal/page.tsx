import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { Container } from "@/components/ui/Container";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { ...buildMetadata(locale, dict, "legal/"), title: `${dict.legalPage.title} · Halal Open Facts`, robots: { index: false } };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = dict.legalPage;
  return (
    <>
      <SkipLink label={dict.a11y.skipToContent} />
      <SiteHeader locale={locale} dict={dict} />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Container className="max-w-3xl py-16">
          <h1 className="text-4xl font-extrabold">{l.title}</h1>
          <h2 id="mentions" className="mt-10 text-2xl font-bold">
            {l.noticeTitle}
          </h2>
          <p className="mt-3 text-muted">{l.notice}</p>
          <h2 id="confidentialite" className="mt-10 text-2xl font-bold">
            {l.privacyTitle}
          </h2>
          <p className="mt-3 text-muted">{l.privacy}</p>
          <a href={`/${locale}/`} className="mt-10 inline-block font-semibold underline underline-offset-4">
            {l.back}
          </a>
        </Container>
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
