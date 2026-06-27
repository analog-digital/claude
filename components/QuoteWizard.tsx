"use client";

import { useMemo, useState } from "react";
import type { Content } from "@/lib/cms";
import { SITE } from "@/lib/site";

type Step = Content["quote_form"]["steps"][number];

const STANDARD_IDS = ["name", "email", "phone", "boxSize", "service", "message"];
const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-base focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20";

export function QuoteWizard({ form }: { form: Content["quote_form"] }) {
  const steps = useMemo(() => form.steps ?? [], [form.steps]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (steps.length === 0) {
    return <p className="text-[var(--muted-foreground)]">This form has no steps yet.</p>;
  }

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const value = answers[step.id] ?? "";

  function setValue(v: string) {
    setError(null);
    setAnswers((a) => ({ ...a, [step.id]: v }));
  }

  function validate(s: Step, v: string): string | null {
    if (s.required && !v.trim()) return "This field is required.";
    if (s.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email.";
    return null;
  }

  function next() {
    const err = validate(step, value);
    if (err) return setError(err);
    setError(null);
    if (!isLast) setIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setError(null);
    if (index > 0) setIndex((i) => i - 1);
  }

  function chooseOption(opt: string) {
    setAnswers((a) => ({ ...a, [step.id]: opt }));
    setError(null);
    // Auto-advance to the next step for a smooth one-question-at-a-time flow.
    if (!isLast) setTimeout(() => setIndex((i) => Math.min(i + 1, steps.length - 1)), 180);
  }

  async function submit() {
    const err = validate(step, value);
    if (err) return setError(err);

    // Map known step ids to submission columns; fold the rest into the message.
    const payload: Record<string, unknown> = { source: "/inquire-today", raw: answers };
    const extras: string[] = [];
    for (const s of steps) {
      const v = (answers[s.id] ?? "").trim();
      if (!v) continue;
      if (STANDARD_IDS.includes(s.id)) payload[s.id] = v;
      else extras.push(`${s.question}: ${v}`);
    }
    const baseMessage = (answers["message"] ?? "").trim();
    payload.message = [baseMessage, extras.join("\n")].filter(Boolean).join("\n\n");

    setStatus("sending");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-[var(--brand)] bg-[var(--brand-pale)] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--brand)] text-2xl text-white">✓</div>
        <h2 className="mt-4 text-2xl font-bold text-[var(--brand)]">{form.successHeading}</h2>
        <p className="mx-auto mt-2 max-w-md text-[var(--muted-foreground)]">{form.successBody}</p>
        <a
          href={`tel:${SITE.phone}`}
          className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-dark)]"
        >
          Call {SITE.phoneDisplay}
        </a>
      </div>
    );
  }

  const progress = ((index + 1) / steps.length) * 100;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          <span>
            Step {index + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--muted)]">
          <div className="h-full rounded-full bg-[var(--brand)] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold md:text-2xl">{step.question}</h2>
      {step.help && <p className="mt-2 text-sm text-[var(--muted-foreground)]">{step.help}</p>}

      <div className="mt-5">
        {step.type === "choice" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(step.options ?? []).map((opt) => {
              const selected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => chooseOption(opt)}
                  className={`rounded-lg border px-4 py-3 text-left font-medium transition-colors ${
                    selected
                      ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                      : "border-[var(--border)] bg-white hover:border-[var(--brand)] hover:bg-[var(--brand-pale)]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : step.type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={step.placeholder}
            rows={4}
            className={inputCls}
            autoFocus
          />
        ) : (
          <input
            type={step.type === "email" ? "email" : step.type === "tel" ? "tel" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                isLast ? submit() : next();
              }
            }}
            placeholder={step.placeholder}
            className={inputCls}
            autoFocus
          />
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong — please call {SITE.phoneDisplay}.</p>
      )}

      {/* Navigation */}
      <div className="mt-7 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--brand)] disabled:invisible"
        >
          ← {form.backLabel}
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="rounded-lg bg-[var(--accent)] px-7 py-3 font-semibold text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : form.submitLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-[var(--brand)] px-7 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]"
          >
            {form.nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}
