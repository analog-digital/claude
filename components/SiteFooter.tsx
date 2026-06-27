import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  const { address } = SITE;
  return (
    <footer className="bg-[var(--brand)] text-[var(--brand-contrast)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Image
            src={SITE.logo.footer}
            alt={SITE.name}
            width={400}
            height={112}
            className="h-14 w-auto rounded bg-white/95 p-2"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Box It Up Storage offers customizable storage solutions for residential and
            commercial clients. Based in Chilliwack, we primarily serve Chilliwack and the
            Lower Mainland.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <svg className="h-4 w-4" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
            </a>
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-lg font-semibold">Contact us</h5>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {address.streetAddress.replace("Road", "Rd")}, {address.addressLocality},{" "}
                {address.addressRegion} {address.postalCode}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-white">
                {SITE.phoneVanity}
                <br />({SITE.phoneDisplay})
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-lg font-semibold">Resources</h5>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-lg font-semibold leading-snug">
            Subscribe now to get updates on our flexible storage solutions that might fit your
            needs.
          </h5>
          {/* TODO: wire to a newsletter/CRM endpoint (D1) in the portal phase. */}
          <form className="mt-4 flex gap-2" action="/api/subscribe" method="post">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              placeholder="Email"
              className="min-w-0 flex-1 rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button type="submit" className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/70 sm:flex-row">
          <p>{SITE.copyright}</p>
          <a href={SITE.designer.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {SITE.designer.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
