"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderToggle() {
  const pathname = usePathname();
  const suppressHeader = pathname === "/"; // Suppress Header only on the root page

  if (suppressHeader) return null; // Don't render Header on the root page

  return <Header />;
}
