"use client";

import { useState } from "react";

/**
 * FAQ accordion — Figma FaqSection. One row open at a time (DEV CONTEXT
 * behavior); ExpandBtn toggles aria-expanded, icon + → −, answer reveals below.
 */
export function BfrFaq({ heading, faqs }: { heading: string; faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-[40px] pt-[80px] lg:px-[72px]">
      <h2 className="text-[34px] md:text-[50px]">{heading}</h2>
      <div className="mt-10 divide-y divide-[var(--color-surface)] border-y border-[var(--color-surface)]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`bfr-faq-panel-${i}`}
                  id={`bfr-faq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"
                >
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-lg text-white"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={`bfr-faq-panel-${i}`}
                role="region"
                aria-labelledby={`bfr-faq-btn-${i}`}
                hidden={!isOpen}
                className="whitespace-pre-line pb-6 text-sm leading-relaxed text-[var(--color-text)]"
              >
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
