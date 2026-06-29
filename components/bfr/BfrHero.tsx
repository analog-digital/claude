import Image from "next/image";
import Link from "next/link";
import type { BfrHero as BfrHeroData } from "@/lib/boxes-for-rent-content";

/**
 * Hero — Figma HeroSection (bg 75:12 + TextOverlay 205:2 + FeaturesPanel 205:3).
 * ONE bright-teal field (--color-primary) holds both columns — heading (left) and
 * features + CTA (right) — with the SAME background and padding (Figma's features
 * panel is transparent and sits on the same teal, not a separate dark block).
 * The panel overhangs the hero photo into the white section below.
 * TODO(content): replace backgroundImage with the real outdoor/storage hero photo.
 */
export function BfrHero({ hero }: { hero: BfrHeroData }) {
  const Feature = ({ title, body }: { title: string; body: string }) => (
    <li className="flex gap-4">
      <span className="grid h-[46px] w-[46px] shrink-0 place-items-center bg-[var(--color-surface)] text-[var(--color-primary)]" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div>
        <p className="text-[13px] font-bold uppercase leading-tight">{title}</p>
        <p className="mt-1 text-[11px] leading-snug text-white/90">{body}</p>
      </div>
    </li>
  );

  return (
    <section className="relative isolate">
      {/* Background photo covers the top region; the teal panel overhangs into white below it. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] md:h-[660px]">
        <Image src={hero.backgroundImage} alt={hero.backgroundAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pt-[300px] md:pt-[440px] lg:px-[72px]">
        <div className="w-full max-w-[1091px] bg-[var(--color-primary)] text-[var(--color-white)]">
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Heading column */}
            <div className="flex-1 px-[21px] py-[31px]">
              <h1 className="max-w-[600px] text-[32px] uppercase leading-[1.1] md:text-[40px] md:leading-[50px]">
                {hero.heading}
              </h1>
              <p className="mt-5 max-w-[452px] text-base font-normal md:text-[20px]">{hero.subheading}</p>
            </div>

            {/* Features column — same teal field, same padding */}
            <div className="px-[21px] py-[31px] md:w-[452px] md:shrink-0">
              <ul className="space-y-4">
                {hero.features.map((f) => (
                  <Feature key={f.title} title={f.title} body={f.body} />
                ))}
              </ul>
              <Link
                href={hero.ctaHref}
                className="mt-4 flex h-[34px] w-[150px] items-center justify-center rounded bg-[var(--color-accent)] text-[13px] font-bold uppercase text-white hover:opacity-90"
              >
                {hero.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
