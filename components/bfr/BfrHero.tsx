import Image from "next/image";
import Link from "next/link";
import type { BfrHero as BfrHeroData } from "@/lib/boxes-for-rent-content";

/**
 * Hero — Figma HeroSection (75:12 bg + 205:2 text overlay + 205:3 features panel).
 * Full-bleed background photo with a teal heading panel on the left and a
 * features panel (two features + "Book a Rental" CTA) on the right.
 */
export function BfrHero({ hero }: { hero: BfrHeroData }) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image
        src={hero.backgroundImage}
        alt={hero.backgroundAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/25" aria-hidden="true" />

      <div className="mx-auto grid max-w-[1440px] items-end gap-6 px-6 py-20 md:grid-cols-2 md:py-28">
        {/* Heading panel */}
        <div className="rounded-lg bg-[var(--brand)]/90 p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{hero.heading}</h1>
          <p className="mt-4 max-w-md text-base text-white/90 md:text-lg">{hero.subheading}</p>
        </div>

        {/* Features panel */}
        <div className="rounded-lg bg-[var(--brand-dark)]/85 p-6 backdrop-blur-sm md:justify-self-end md:max-w-md">
          <ul className="space-y-5">
            {hero.features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span
                  className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <h2 className="font-bold">{f.title}</h2>
                  <p className="mt-1 text-sm text-white/85">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href={hero.ctaHref}
            className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]"
          >
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
