import Image from "next/image";
import Link from "next/link";
import type { BfrHero as BfrHeroData } from "@/lib/boxes-for-rent-content";

/**
 * Hero — Figma HeroSection (bg 75:12 + TextOverlay 205:2 + FeaturesPanel 205:3).
 * Measured: solid --color-primary heading panel (H1 40/50px, uppercase, 800;
 * subheading 20px/400), dark --color-primary-dark features panel (452px) with
 * 46×46 --color-surface icon tiles, 13px Bold uppercase labels, 11px bodies, and
 * a 150×34 --color-accent "BOOK A RENTAL" button. Absolute Figma layout
 * reproduced with flex so it stays responsive (side-by-side → stacked on mobile).
 */
export function BfrHero({ hero }: { hero: BfrHeroData }) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={hero.backgroundImage} alt={hero.backgroundAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/25" aria-hidden="true" />

      <div className="mx-auto flex min-h-[480px] max-w-[1440px] items-end px-6 py-10 md:min-h-[700px] md:py-14">
        <div className="flex w-full flex-col bg-[var(--color-primary)] text-[var(--color-white)] md:flex-row md:items-stretch">
          {/* Heading panel */}
          <div className="flex-1 px-[21px] py-[31px]">
            <h1 className="max-w-[527px] text-[32px] uppercase leading-[1.1] md:text-[40px] md:leading-[50px]">
              {hero.heading}
            </h1>
            <p className="mt-5 max-w-[452px] text-base font-normal md:text-[20px]">{hero.subheading}</p>
          </div>

          {/* Features panel */}
          <div className="bg-[var(--color-primary-dark)] p-[14px] md:w-[452px] md:shrink-0">
            <ul className="space-y-4">
              {hero.features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span
                    className="grid h-[46px] w-[46px] shrink-0 place-items-center bg-[var(--color-surface)] text-[var(--color-primary)]"
                    aria-hidden="true"
                  >
                    {/* Generic feature icon (Figma tile is a plain surface square). */}
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[13px] font-bold uppercase leading-tight">{f.title}</p>
                    <p className="mt-1 text-[11px] leading-snug text-white/90">{f.body}</p>
                  </div>
                </li>
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
    </section>
  );
}
