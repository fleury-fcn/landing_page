import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Halal Open Facts";

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

const verdicts = [
  { label: "Halal", fg: "#166534", bg: "#dcfce7" },
  { label: "Douteux · Doubtful", fg: "#8a3b0c", bg: "#fef3c7" },
  { label: "Haram", fg: "#9f1c1c", bg: "#fee2e2" },
];

/** Image Open Graph générée au build (texte latin uniquement : police par défaut de next/og). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #07502d 0%, #0a6b3d 55%, #34c77b 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#ffffff", display: "flex" }} />
          Halal Open Facts
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Food & cosmetics,</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>ingredient by ingredient.</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {verdicts.map((v) => (
            <div key={v.label} style={{ display: "flex", padding: "12px 24px", borderRadius: 999, background: v.bg, color: v.fg, fontSize: 30, fontWeight: 700 }}>
              {v.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
