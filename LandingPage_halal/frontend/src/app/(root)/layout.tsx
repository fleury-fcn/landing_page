import type { ReactNode } from "react";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
