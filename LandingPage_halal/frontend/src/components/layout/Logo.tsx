import { HalalSeal } from "@/components/brand/HalalSeal";

/** Logo de la landing commune : sceau « حلال » + nom. */
export function Logo({ className = "size-9" }: { className?: string }) {
  return <HalalSeal variant="halal" className={className} />;
}
