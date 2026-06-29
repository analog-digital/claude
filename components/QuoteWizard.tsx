"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Content } from "@/lib/cms";
import { SITE } from "@/lib/site";

type Step = Content["quote_form"]["steps"][number];

const STANDARD_IDS = ["name", "email", "phone", "boxSize", "service", "message"];

/** Loose match so a selector value like "8ft" maps to an option like "8 Ft or 10 Ft". */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Seed answers from URL query params (e.g. the /boxes-for-rent box selector). */
function initialAnswers(steps: Step[], sp: URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  for (const step of steps) {
    const param = sp.get(step.id);
    if (!param) continue;
    if (step.type === "choice") {
      const match = (step.options ?? []).find(
        (o) => norm(o).includes(norm(param)) || norm(param).includes(norm(o))
      );
      if (match) out[step.id] = match;
    } else {
      out[step.id] = param;
    }
  }
  return out;
}
const inputCls =
  "w-full rounded-lg border border-[var(--color-surface)] bg-white px-4 py-3 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";

export function QuoteWizard({ form }: { form: Content["quote_form"] }) {
  const steps = useMemo(() => form.steps ?? [], [form.steps]);
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    initialAnswers(steps, new URLSearchParams(searchParams.toString()))
  );
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (steps.length === 0) {
    return <p className="text-[var(--color-text)]">This form has no steps yet.</p>;
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
      <div className="rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary-light)] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-primary)] text-2xl text-white">✓</div>
        <h2 className="mt-4 text-2xl font-bold text-[var(--color-primary)]">{form.successHeading}</h2>
        <p className="mx-auto mt-2 max-w-md text-[var(--color-text)]">{form.successBody}</p>
        <a
          href={`tel:${SITE.phone}`}
          className="mt-6 inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Call {SITE.phoneDisplay}
        </a>
      </div>
    );
  }

  const progress = ((index + 1) / steps.length) * 100;

  return (
    <div className="rounded-lg border border-[var(--color-surface)] bg-white p-6 shadow-sm md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]">
          <span>
            Step {index + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
          <div className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold md:text-2xl">{step.question}</h2>
      {step.help && <p className="mt-2 text-sm text-[var(--color-text)]">{step.help}</p>}

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
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-surface)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
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
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] disabled:invisible"
        >
          ← {form.backLabel}
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="rounded-lg bg-[var(--color-accent)] px-7 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : form.submitLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-[var(--color-primary)] px-7 py-3 font-semibold text-white hover:bg-[var(--color-primary-dark)]"
          >
            {form.nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}
