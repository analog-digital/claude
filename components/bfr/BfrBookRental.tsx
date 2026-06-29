"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import type { BfrBookRental as BfrBookRentalData } from "@/lib/boxes-for-rent-content";

/**
 * Book Your Rental — Figma BookRentalSection. Step badges + a selector with two
 * independent radio groups (box size + service plan). Per the Figma DEV CONTEXT
 * the selection "pre-fills the inquiry": we carry the chosen size + plan to the
 * canonical /inquire-today quote flow as query params (the quote wizard reads
 * them and pre-selects), keeping a single submission path into the CMS.
 */
export function BfrBookRental({ data }: { data: BfrBookRentalData }) {
  const [size, setSize] = useState("");
  const [service, setService] = useState("");

  const params = new URLSearchParams();
  if (size) params.set("boxSize", size);
  if (service) params.set("service", service);
  const quoteHref = `/inquire-today${params.toString() ? `?${params}` : ""}`;

  return (
    <section className="mt-[26px] bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-[48px] pt-[35px] lg:px-[72px]">
        <h2 className="text-[34px] md:text-[50px]">{data.heading}</h2>
        <p className="mt-3 text-white/90">{data.subHeading}</p>

        {/* Step badges */}
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.stepBadges.map((b) => (
            <li key={b.num} className="rounded-lg bg-white/10 px-4 py-3">
              <span className="block text-sm font-bold">{b.num}</span>
              <span className="block text-sm text-white/85">{b.text}</span>
            </li>
          ))}
        </ol>

        {/* Selector */}
        <div className="mt-8 rounded-lg bg-white p-6 text-[var(--color-text)] md:p-8">
          <h3 className="text-xl font-bold">{data.selectorHeading}</h3>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">{data.sizePrompt}</legend>
            <div className="mt-3 flex flex-wrap gap-4" role="radiogroup" aria-label={data.sizePrompt}>
              {data.sizeOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="bfr-size"
                    value={opt}
                    checked={size === opt}
                    onChange={() => setSize(opt)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">{data.servicePrompt}</legend>
            <div className="mt-3 flex flex-wrap gap-4" role="radiogroup" aria-label={data.servicePrompt}>
              {data.serviceOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="bfr-service"
                    value={opt}
                    checked={service === opt}
                    onChange={() => setService(opt)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href={quoteHref}
              className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              {data.requestQuoteLabel}
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-lg border border-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            >
              {data.callUsLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
