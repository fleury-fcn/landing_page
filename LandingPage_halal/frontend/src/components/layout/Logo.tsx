export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" className="fill-ink" />
      <circle cx="13" cy="14" r="6.5" fill="none" strokeWidth="2.5" className="stroke-food" />
      <circle cx="19" cy="18" r="6.5" fill="none" strokeWidth="2.5" className="stroke-beauty" />
      <path d="m13 16.5 2.2 2.2 4.3-4.6" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-bg" />
    </svg>
  );
}
