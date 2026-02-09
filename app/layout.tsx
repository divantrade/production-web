import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout passes through to [locale]/layout.tsx
// which provides html/body with dynamic lang/dir attributes
export default function RootLayout({ children }: Props) {
  return children;
}
