import { HalalSeal } from "./HalalSeal";
import type { ProjectKey } from "@/lib/site";

const words: Record<ProjectKey, string> = { food: "food", beauty: "beauty" };

/**
 * Logotype d'un projet : sceau + « halal open food facts » / « halal open beauty facts »,
 * « halal » mis en avant dans la couleur du projet.
 */
export function ProjectLogo({
  project,
  size = "md",
  seal = true,
  className = "",
}: {
  project: ProjectKey;
  size?: "sm" | "md" | "lg";
  /** Afficher le sceau à gauche du nom. */
  seal?: boolean;
  className?: string;
}) {
  const s = {
    sm: { seal: "size-6", text: "text-sm" },
    md: { seal: "size-9", text: "text-base" },
    lg: { seal: "size-12", text: "text-xl sm:text-2xl" },
  }[size];
  const color = project === "food" ? "text-brand" : "text-beauty";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} dir="ltr">
      {seal && <HalalSeal variant={project} className={`${s.seal} shrink-0`} />}
      <span className={`${s.text} leading-none font-extrabold tracking-tight`}>
        <span className={color}>halal</span>
        <span className="font-semibold text-muted">open</span>
        <span>{words[project]}</span>
        <span className="font-semibold text-muted">facts</span>
      </span>
    </span>
  );
}
