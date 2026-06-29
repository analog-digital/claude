import Image from "next/image";
import Link from "next/link";
import type { BfrFinalCta as BfrFinalCtaData } from "@/lib/boxes-for-rent-content";

/**
 * Box It Up Today — Figma final CTA (75:49): a storage-container photo behind a
 * dark teal (primary-dark) wash, with white copy + an accent Book Now button.
 * Until the real photo is supplied (backgroundImage), the section shows the
 * solid primary-dark wash on its own — still the design's dark background, not
 * the previous bright teal.
 */
export function BfrFinalCta({ data }: { data: BfrFinalCtaData }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-primary-dark)] text-white">
      {data.backgroundImage && (
        <>
          <Image
            src={data.backgroundImage}
            alt={data.backgroundAlt}
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          {/* Dark teal wash over the photo (matches the Figma overlay). */}
          <div className="absolute inset-0 -z-10 bg-[var(--color-primary-dark)]/80" aria-hidden="true" />
        </>
      )}
      <div className="mx-auto max-w-[1440px] px-6 py-16 text-center lg:px-[72px]">
        <h2 className="mx-auto max-w-3xl text-[34px] md:text-[50px]">{data.heading}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/90">{data.body}</p>
        {data.ctaHref && (
          <Link
            href={data.ctaHref}
            className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 font-semibold text-white hover:opacity-90"
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
