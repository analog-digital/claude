import Image from "next/image";
import Link from "next/link";
import { BFR_HERO_VIDEO_ID, type BfrHero as BfrHeroData } from "@/lib/boxes-for-rent-content";

/**
 * Hero — Figma HeroSection (bg 75:12 + TextOverlay 205:2 + FeaturesPanel 205:3).
 * ONE bright-teal field (--color-primary) holds both columns — heading (left) and
 * features + CTA (right) — with the SAME background and padding (Figma's features
 * panel is transparent and sits on the same teal, not a separate dark block).
 * The panel overhangs the hero photo into the white section below.
 * The background region runs the same muted looping YouTube clip as the home
 * header (BFR_HERO_VIDEO_ID); backgroundImage stays as the poster/fallback shown
 * until the embed loads or if it's blocked.
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
      {/* Background video covers the top region; the teal panel overhangs into white below it. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden md:h-[660px]">
        {/* Poster/fallback beneath the video — shown until the embed loads or if it's blocked. */}
        <Image src={hero.backgroundImage} alt={hero.backgroundAlt} fill priority sizes="100vw" className="object-cover" />
        {/* Same muted looping YouTube background as the home-page header. */}
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${BFR_HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${BFR_HERO_VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`}
          title="Box It Up Storage"
          allow="autoplay; encrypted-media"
          aria-hidden="true"
          tabIndex={-1}
        />
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
