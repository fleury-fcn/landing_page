/**
 * Sceau halal original : étoile à 8 branches (motif géométrique islamique
 * traditionnel, du domaine public), anneau doré, et au centre « حلال » ou
 * l'emblème du projet. Couleurs fixes : un logo reste identique en clair/sombre.
 */
export type SealVariant = "halal" | "food" | "beauty";

const palette: Record<SealVariant, { star: string; deep: string }> = {
  halal: { star: "#0a6b3d", deep: "#07502d" },
  food: { star: "#0a6b3d", deep: "#07502d" },
  beauty: { star: "#8a2f6c", deep: "#6b2353" },
};

const GOLD = "#d9a92e";
// Deux carrés superposés (dont un tourné de 45°) = étoile à 8 branches.
const SQUARE = "M8 8h32v32H8z";
const DIAMOND = "M24 1.4 46.6 24 24 46.6 1.4 24z";
const LEAF = "M25 33a9 9 0 0 1-1.5-17.7C30.9 13.9 32.9 13.3 35.4 10c1.3 2.6 2.6 5.4 2.6 10.3 0 7-6.2 12.7-13 12.7Zm-11 1.3c0-3.9 2.4-7 6.7-7.7";
const SPARKLE = "M24 12l2.4 7.4L34 22l-7.6 2.6L24 32l-2.4-7.4L14 22l7.6-2.6L24 12Zm8.5 13 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1 1-2.7Z";

export function HalalSeal({
  variant = "halal",
  className = "size-9",
  title,
}: {
  variant?: SealVariant;
  className?: string;
  /** Texte alternatif ; sans titre, le sceau est décoratif. */
  title?: string;
}) {
  const c = palette[variant];
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path d={SQUARE} fill={c.star} />
      <path d={DIAMOND} fill={c.star} />
      <circle cx="24" cy="24" r="15.5" fill={c.deep} />
      <circle cx="24" cy="24" r="14" fill="none" stroke={GOLD} strokeWidth="1.4" />
      {variant === "halal" && (
        <text
          x="24"
          y="29"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#ffffff"
          style={{ fontFamily: "var(--font-arabic), 'Noto Sans Arabic', 'Geeza Pro', 'Arial', sans-serif" }}
        >
          حلال
        </text>
      )}
      {variant === "food" && (
        <path d={LEAF} fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" transform="translate(-6 1)" />
      )}
      {variant === "beauty" && <path d={SPARKLE} fill="#ffffff" transform="translate(-2 0)" />}
    </svg>
  );
}
