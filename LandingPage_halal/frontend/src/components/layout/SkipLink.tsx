export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#contenu"
      className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
    >
      {label}
    </a>
  );
}
