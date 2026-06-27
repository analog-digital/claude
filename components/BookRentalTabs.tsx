"use client";

import { useState } from "react";
import Image from "next/image";
import type { Content } from "@/lib/cms";
import { SITE } from "@/lib/site";

export function BookRentalTabs({ bookSteps }: { bookSteps: Content["book_steps"] }) {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const step = bookSteps.steps[active];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: window.location.pathname }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

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
      <div role="tabpanel" className="mt-8 grid items-center gap-8 rounded-lg bg-[var(--muted)] p-6 md:grid-cols-2 md:p-10">
        <div>
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <p className="mt-3 text-[var(--muted-foreground)]">{step.body}</p>

          {active === 0 ? (
            // Step One: inquiry form — submissions are stored in the CMS (D1).
            status === "done" ? (
              <div className="mt-6 rounded-lg border border-[var(--brand)] bg-white p-6">
                <p className="font-semibold text-[var(--brand)]">Thanks — we got your request!</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  We&apos;ll be in touch shortly. For anything urgent, call {SITE.phoneDisplay}.
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-semibold">Name</span>
                    <input name="name" required autoComplete="name"
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2" />
                  </label>
                  <label className="block text-sm">
                    <span className="font-semibold">Phone</span>
                    <input name="phone" type="tel" autoComplete="tel"
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2" />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="font-semibold">Email</span>
                  <input name="email" type="email" required autoComplete="email"
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2" />
                </label>
                <fieldset>
                  <legend className="text-sm font-semibold">Select the box that best fits your needs.</legend>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {bookSteps.boxSizeOptions.map((opt) => (
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
                    {bookSteps.serviceOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm">
                        <input type="radio" name="service" value={opt} required className="h-4 w-4 accent-[var(--brand)]" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm">
                  <span className="font-semibold">Message <span className="font-normal text-[var(--muted-foreground)]">(optional)</span></span>
                  <textarea name="message" rows={3}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2" />
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={status === "sending"}
                    className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)] disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "REQUEST A QUOTE"}
                  </button>
                  <a href={`tel:${SITE.phone}`} className="text-sm font-semibold text-[var(--brand)] hover:underline">
                    CALL US TODAY
                  </a>
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-600">Something went wrong — please call {SITE.phoneDisplay}.</p>
                )}
              </form>
            )
          ) : (
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={SITE.inquireUrl} className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
                REQUEST A QUOTE
              </a>
              <a href={`tel:${SITE.phone}`} className="rounded-lg border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/10">
                CALL US TODAY
              </a>
            </div>
          )}
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
