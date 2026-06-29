"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Content } from "@/lib/cms";
import { SITE } from "@/lib/site";

export function BookRentalTabs({ bookSteps }: { bookSteps: Content["book_steps"] }) {
  const [active, setActive] = useState(0);
  const step = bookSteps.steps[active];

  return (
    <div className="mt-10">
      {/* Tab headers */}
      <div role="tablist" aria-label="Booking steps" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {bookSteps.steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.tab}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                selected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-surface)] bg-white hover:border-[var(--color-primary)]"
              }`}
            >
              <span className="block font-semibold">{s.tab}</span>
              <span className="block">{s.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div role="tabpanel" className="mt-8 grid items-center gap-8 rounded-lg bg-[var(--color-surface)] p-6 md:grid-cols-2 md:p-10">
        <div>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="mt-3 text-[var(--color-text)]">{step.body}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href={SITE.inquireUrl} className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              REQUEST A QUOTE
            </Link>
            <a href={`tel:${SITE.phone}`} className="rounded-lg border border-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
              CALL US TODAY
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg">
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
