import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand shadow-lg shadow-brand/25 hover:bg-brand/90 hover:shadow-brand/35",
  secondary: "bg-surface text-ink ring-1 ring-inset ring-line hover:ring-brand hover:text-brand",
  ghost: "text-accent underline-offset-4 hover:underline px-0!",
};

export const buttonClass = (variant: Variant = "primary"): string =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] ${variants[variant]}`;

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  icon?: IconName;
  /** Ajoute une flèche (retournée automatiquement en RTL). */
  arrow?: boolean;
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", icon, arrow, external, className = "", children, ...rest }: Props) {
  return (
    <a
      className={`${buttonClass(variant)} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon && <Icon name={icon} className="size-4.5" />}
      {children}
      {arrow && <Icon name="arrow" className="size-4 rtl:-scale-x-100" />}
    </a>
  );
}
