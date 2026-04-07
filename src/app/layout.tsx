import type { ReactNode } from "react";

// Root layout only passes children through to [locale] layout
// html and body tags are in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
