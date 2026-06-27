import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

/**
 * Site footer.
 * ⚠️ PLACEHOLDER: match the live site's footer content, columns and styling
 * once the source is available.
 */
export function SiteFooter() {
  const { address } = SITE;
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="font-bold text-lg">{SITE.name}</p>
          <address className="mt-3 not-italic text-sm text-[var(--muted-foreground)] leading-relaxed">
            {address.streetAddress}
            <br />
            {address.addressLocality}, {address.addressRegion} {address.postalCode}
            <br />
            <a href={`tel:${SITE.phone}`} className="hover:text-[var(--brand)]">
              {SITE.phoneDisplay}
            </a>
          </address>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--brand)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold">Hours</p>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            Gate access daily
            <br />
            7:00 AM – 8:00 PM
          </p>
          {SITE.socials.facebook && (
            <a
              href={SITE.socials.facebook}
              className="mt-4 inline-block text-sm text-[var(--brand)] hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Facebook
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted-foreground)]">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
