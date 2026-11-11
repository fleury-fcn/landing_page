import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={localeMeta[locale].dir}>
      <body>{children}</body>
    </html>
  );
}
