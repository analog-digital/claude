"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BfrBoxSizes, BfrBoxCard } from "@/lib/boxes-for-rent-content";

/** Star rating as real SVG icons (Figma stars are flagged [IMAGE], annotation
 *  209:178). Renders nothing when no rating is set (gap field). */
function StarRating({ rating }: { rating: string }) {
  const value = parseFloat(rating);
  if (!rating || Number.isNaN(value)) return null;
  const full = Math.round(value);
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < full ? "var(--color-accent)" : "var(--color-white)"} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** One availability dot (filled = supported), white-ringed for contrast on the image. */
function AvailDot({ filled, color }: { filled: boolean; color: string }) {
  return (
    <span
      className="inline-block h-3.5 w-3.5 rounded-full ring-2 ring-white"
      style={filled ? { background: color } : { background: "transparent", boxShadow: `inset 0 0 0 2px ${color}` }}
      aria-hidden="true"
    />
  );
}

function Card({ card }: { card: BfrBoxCard }) {
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col sm:w-[360px]">
      {/* Teal card panel (Figma 75:14 = --color-primary-medium, radius 5px) */}
      <div data-card-bg className="relative h-[226px] rounded-[5px] bg-[var(--color-primary-medium)] p-4 text-white">
        <div className="flex items-start justify-between">
          {card.pricing ? <p className="text-xl font-extrabold">{card.pricing}</p> : <span />}
          {card.availabilityBadge && (
            <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
              {card.availabilityBadge}
            </span>
          )}
        </div>

        <div className="relative mx-auto mt-1 h-[150px] w-full">
          <Image src={card.image} alt={card.imageAlt} fill sizes="360px" className="object-contain" />
          {/* Availability dots — inside the card image (annotation: keep dots here + legend) */}
          <div className="absolute bottom-1 right-1 flex items-center gap-1.5">
            <AvailDot filled={card.availableMobile} color="var(--color-primary)" />
            <AvailDot filled={card.availableDaily} color="var(--color-accent)" />
          </div>
          <div className="absolute bottom-1 left-1">
            <StarRating rating={card.rating} />
          </div>
        </div>
      </div>

      {/* Below the panel (page surface) */}
      <div className="px-1 pt-3">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">{card.sizeLabel}</h3>
        {card.dimensions && <p className="text-sm text-[var(--color-text)]">{card.dimensions}</p>}
        <p className="mt-1 line-clamp-3 text-sm text-[var(--color-text)]">{card.description}</p>
        {/* VIEW GALLERY shows on every card; real URL is a content TODO. */}
        {/* TODO: replace "#" with the real gallery URL per box size */}
        <Link
          href={card.galleryHref || "#"}
          data-gallery
          className="mt-3 inline-block rounded bg-[var(--color-accent)] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
        >
          VIEW GALLERY
        </Link>
      </div>
    </article>
  );
}

export function BfrBoxSizesCarousel({ data }: { data: BfrBoxSizes }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card ? (card as HTMLElement).offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  const legendColor = (mode: "mobile" | "daily") => (mode === "mobile" ? "var(--color-primary)" : "var(--color-accent)");

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-0 pt-[145px] lg:px-[72px]">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-[34px] md:text-[50px]">{data.label}</h2>
          <p className="mt-3 text-[var(--color-text)]">{data.description}</p>
        </div>
        <ul className="space-y-2">
          {data.legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2 text-sm font-medium">
              <span className="inline-block h-3.5 w-3.5 rounded-full" style={{ background: legendColor(l.mode) }} aria-hidden="true" />
              {l.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Carousel: arrows overlay the card row, vertically centered (P2) */}
      <div
        className="relative mt-10"
        role="region"
        aria-label={data.label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); scrollByCards(1); }
          else if (e.key === "ArrowLeft") { e.preventDefault(); scrollByCards(-1); }
        }}
      >
        <div
          ref={trackRef}
          onScroll={updateProgress}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
        >
          {data.cards.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>

        {/* Arrows: white filled circles centered on the teal panel row (~113px tall) */}
        <button
          type="button"
          data-arrow
          onClick={() => scrollByCards(-1)}
          aria-label="Previous box sizes"
          className="absolute left-0 top-[113px] z-10 grid h-10 w-10 -translate-y-1/2 -translate-x-1/2 place-items-center rounded-full bg-white text-[var(--color-primary)] shadow-md hover:bg-[var(--color-primary)] hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          data-arrow
          onClick={() => scrollByCards(1)}
          aria-label="Next box sizes"
          className="absolute right-0 top-[113px] z-10 grid h-10 w-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-white text-[var(--color-primary)] shadow-md hover:bg-[var(--color-primary)] hover:text-white"
        >
          →
        </button>

        {/* Progress track */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
          <div className="h-full w-1/3 rounded-full bg-[var(--color-primary)] transition-[margin] duration-150" style={{ marginLeft: `${progress * 66}%` }} />
        </div>
      </div>
    </section>
  );
}
