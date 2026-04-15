"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type HeaderToggleProps = {
  children: ReactNode;
};

export default function HeaderToggle({ children }: HeaderToggleProps) {
  const pathname = usePathname();
  const suppressHeader = pathname === "/"; // Suppress Header only on the root page

  if (suppressHeader) return null; // Don't render Header on the root page

  return <>{children}</>;
}
