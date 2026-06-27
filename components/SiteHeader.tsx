import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

/**
 * Site header / primary navigation.
 * ⚠️ PLACEHOLDER: layout/markup is scaffolding. Replace the wordmark with the
 * exact logo asset and match the live site's header styling (colors, spacing,
 * sticky behavior, mobile menu) once the source is available.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" aria-label={`${SITE.name} home`}>
          {/* TODO: swap for <Image> of the real logo (WP media URL). */}
          <span className="text-[var(--brand)]">Box It Up</span>
          <span className="text-[var(--foreground)]">Storage</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--brand)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`tel:${SITE.phone}`}
          className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand-contrast)] hover:bg-[var(--brand-dark)] transition-colors"
        >
          {SITE.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
