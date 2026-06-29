"use client";

import { useActionState, useState } from "react";
import { createClientAction, type FormState } from "@/app/admin/actions";

const inputCls =
  "mt-1 w-full rounded-lg border border-[var(--color-surface)] bg-white px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none";

export function NewClientForm({ plans, boxSizes }: { plans: string[]; boxSizes: string[] }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(createClientAction, undefined);

  if (state?.ok && open) {
    // Collapse on success.
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
      >
        + Onboard a client
      </button>
    );
  }

  return (
    <form action={action} className="rounded-lg border border-[var(--color-surface)] bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">Name *</span>
          <input name="name" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Email *</span>
          <input name="email" type="email" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Phone</span>
          <input name="phone" type="tel" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Monthly amount (CAD)</span>
          <input name="monthly_amount" type="number" step="0.01" min="0" placeholder="165.00" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Plan</span>
          <select name="plan" className={inputCls} defaultValue="">
            <option value="">—</option>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">Box size</span>
          <select name="box_size" className={inputCls} defaultValue="">
            <option value="">—</option>
            {boxSizes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="font-medium">Notes</span>
        <textarea name="notes" rows={2} className={inputCls} />
      </label>

      <div className="mt-3 rounded-lg bg-[var(--color-primary-light)] p-3 text-xs text-[var(--color-primary)]">
        💳 Card capture &amp; automatic billing will appear here once Stripe is connected. For now this records the
        client manually; the client starts as <strong>pending</strong>.
      </div>

      {state?.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save client"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
