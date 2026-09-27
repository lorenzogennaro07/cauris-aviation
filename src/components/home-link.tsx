"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeLink({ className, onActivate }: { className?: string; onActivate?: () => void }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/en";
  return <Link href="/" className={className} aria-current={isHome ? "page" : undefined} onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    onActivate?.();
    if (!isHome) return;
    event.preventDefault();
    document.getElementById("contenuto")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }}>Home</Link>;
}
