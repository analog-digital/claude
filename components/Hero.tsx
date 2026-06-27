import Link from "next/link";

type HeroData = {
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  videoId: string;
  features: { title: string; body: string }[];
};

/** Full-bleed hero with a muted looping YouTube background, matching the
 *  Elementor hero used on both the home and /rental-new pages of the live site. */
export function Hero({ hero }: { hero: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand)] text-white">
      <iframe
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        src={`https://www.youtube.com/embed/${hero.videoId}?autoplay=1&mute=1&loop=1&playlist=${hero.videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`}
        title="Box It Up Storage"
        allow="autoplay; encrypted-media"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-[var(--brand)]/80" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{hero.heading}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">{hero.subheading}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={hero.primaryCta.href} className="rounded-lg bg-[var(--accent)] px-7 py-3.5 font-semibold text-white hover:bg-[var(--accent-dark)]">
            {hero.primaryCta.label}
          </Link>
          <a href={hero.secondaryCta.href} className="rounded-lg border border-white px-7 py-3.5 font-semibold text-white hover:bg-white/10">
            {hero.secondaryCta.label}
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {hero.features.map((f) => (
            <div key={f.title} className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <h2 className="text-xl font-bold">{f.title}</h2>
              <p className="mt-2 text-sm text-white/85">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
