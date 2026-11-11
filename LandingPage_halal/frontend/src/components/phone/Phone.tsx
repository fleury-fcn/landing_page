import type { CSSProperties, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

/** Les écrans sont dessinés pour une largeur unique (15rem) puis mis à l'échelle
 * avec `zoom`, pour que le contenu reste proportionné quelle que soit la taille. */
const zoom: Record<Size, number> = { sm: 0.78, md: 1, lg: 1.2 };

/**
 * Cadre de téléphone 100 % CSS. Le contenu de l'écran est décoratif (aria-hidden) ;
 * si `label` est fourni, l'ensemble est exposé comme une image avec ce texte alternatif.
 */
export function Phone({
  children,
  label,
  size = "md",
  float = false,
  delay = 0,
  tilt = 0,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  size?: Size;
  float?: boolean;
  delay?: number;
  tilt?: number;
  /** Écran sombre (ex. scanner) : barre d'état en clair. */
  dark?: boolean;
  className?: string;
}) {
  const style = { "--d": delay, "--tilt": `${tilt}deg`, transform: `rotate(${tilt}deg)`, zoom: zoom[size] } as CSSProperties;
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`w-[15rem] shrink-0 ${float ? "float" : ""} ${className}`}
      style={style}
    >
      <div aria-hidden="true" className="relative rounded-[2.4rem] bg-phone p-[0.55rem] shadow-2xl shadow-brand-strong/25 ring-1 ring-white/10">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-bg text-ink">
          <div className="absolute inset-x-0 top-2 z-20 mx-auto h-[1.15rem] w-[38%] rounded-full bg-phone" />
          <StatusBar dark={dark} />
          <div className="absolute inset-x-0 top-9 bottom-0 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={`absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between px-5 text-[0.6rem] font-semibold ${dark ? "bg-[#06120b] text-white" : "text-ink"}`}
      dir="ltr"
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          {[3, 5, 7, 9].map((h) => (
            <span key={h} className="w-[2px] rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="h-[7px] w-[14px] rounded-[2px] border border-current p-px">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}
