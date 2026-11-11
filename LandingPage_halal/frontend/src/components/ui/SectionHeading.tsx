import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "start",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase rtl:tracking-normal">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}
