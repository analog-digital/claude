"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BfrBoxSizes, BfrBoxCard } from "@/lib/boxes-for-rent-content";

/** Star rating rendered from a numeric string (e.g. "4.8"); empty → nothing. */
function StarRating({ rating }: { rating: string }) {
  const value = parseFloat(rating);
  if (!rating || Number.isNaN(value)) return null;
  const full = Math.round(value);
  return (
    <span className="text-sm text-[var(--accent)]" aria-label={`Rated ${rating} out of 5`}>
      {"★★★★★".slice(0, full)}
      <span className="text-[var(--border)]">{"★★★★★".slice(full)}</span>
    </span>
  );
}

function LegendDot({ filled, color }: { filled: boolean; color: string }) {
  return (
    <span
      className="inline-block h-3.5 w-3.5 rounded-full"
      style={filled ? { background: color } : { border: `2px solid ${color}` }}
      aria-hidden="true"
    />
  );
}

function Card({ card }: { card: BfrBoxCard }) {
  return (
    <article className="flex w-[320px] shrink-0 snap-start flex-col rounded-lg border border-[var(--border)] bg-white p-4 sm:w-[360px]">
      <div className="flex items-start justify-between">
        {card.pricing ? <p className="text-xl font-extrabold text-[var(--brand)]">{card.pricing}</p> : <span />}
        {card.availabilityBadge && (
          <span className="rounded bg-[var(--brand-light)] px-2 py-1 text-xs font-semibold text-[var(--brand-dark)]">
            {card.availabilityBadge}
          </span>
        )}
      </div>

      <div className="relative mx-auto mt-3 h-40 w-full">
        <Image src={card.image} alt={card.imageAlt} fill sizes="360px" className="object-contain" />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={card.rating} />
        <span className="ml-auto flex items-center gap-1.5">
          <LegendDot filled={card.availableMobile} color="var(--brand)" />
          <LegendDot filled={card.availableDaily} color="var(--accent)" />
        </span>
      </div>

      <h3 className="mt-2 text-lg font-bold">{card.sizeLabel}</h3>
      {card.dimensions && <p className="text-sm text-[var(--muted-foreground)]">{card.dimensions}</p>}
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--muted-foreground)]">{card.description}</p>

      {card.galleryHref && (
        <Link
          href={card.galleryHref}
          className="mt-4 inline-block w-fit rounded bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--accent-dark)]"
        >
          VIEW GALLERY
        </Link>
      )}
    </article>
  );
}

export function BfrBoxSizesCarousel({ data }: { data: BfrBoxSizes }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 scroll position

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

  const legendColor = (mode: "mobile" | "daily") => (mode === "mobile" ? "var(--brand)" : "var(--accent)");

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold md:text-4xl">{data.label}</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">{data.description}</p>
        </div>
        <ul className="space-y-2">
          {data.legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2 text-sm font-medium">
              <LegendDot filled color={legendColor(l.mode)} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="relative mt-10"
        role="region"
        aria-label={data.label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCards(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCards(-1);
          }
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

        {/* Controls + progress track */}
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous box sizes"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
          >
            ←
          </button>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="absolute top-0 h-full w-1/3 rounded-full bg-[var(--brand)] transition-[left] duration-150"
              style={{ left: `${progress * 66}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Next box sizes"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
