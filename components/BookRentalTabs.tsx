"use client";

import { useState } from "react";
import Image from "next/image";
import { BOOK_STEPS } from "@/lib/content";
import { SITE } from "@/lib/site";

export function BookRentalTabs() {
  const [active, setActive] = useState(0);
  const step = BOOK_STEPS.steps[active];

  return (
    <div className="mt-10">
      {/* Tab headers */}
      <div role="tablist" aria-label="Booking steps" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {BOOK_STEPS.steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.tab}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                selected
                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                  : "border-[var(--border)] bg-white hover:border-[var(--brand)]"
              }`}
            >
              <span className="block font-semibold">{s.tab}</span>
              <span className="block">{s.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div role="tabpanel" className="mt-8 grid items-center gap-8 rounded-xl bg-[var(--muted)] p-6 md:grid-cols-2 md:p-10">
        <div>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="mt-3 text-[var(--muted-foreground)]">{step.body}</p>

          {active === 0 ? (
            // Step One: inquiry form (mirrors the live Elementor form).
            // TODO: wire submission to the CRM (Cloudflare D1) in the portal phase.
            <form className="mt-6 space-y-5" action="/api/inquire" method="post">
              <fieldset>
                <legend className="text-sm font-semibold">Select the box that best fits your needs.</legend>
                <div className="mt-2 flex flex-wrap gap-4">
                  {BOOK_STEPS.boxSizeOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm">
                      <input type="radio" name="boxSize" value={opt} required className="h-4 w-4 accent-[var(--brand)]" />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold">Select the service that fits your needs.</legend>
                <div className="mt-2 flex flex-wrap gap-4">
                  {BOOK_STEPS.serviceOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm">
                      <input type="radio" name="service" value={opt} required className="h-4 w-4 accent-[var(--brand)]" />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
                  REQUEST A QUOTE
                </button>
                <a href={`tel:${SITE.phone}`} className="text-sm font-semibold text-[var(--brand)] hover:underline">
                  CALL US TODAY
                </a>
              </div>
            </form>
          ) : (
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={SITE.inquireUrl} className="rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
                REQUEST A QUOTE
              </a>
              <a href={`tel:${SITE.phone}`} className="rounded-md border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/10">
                CALL US TODAY
              </a>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl">
          <Image
            src={step.image}
            alt={step.title}
            width={800}
            height={534}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
