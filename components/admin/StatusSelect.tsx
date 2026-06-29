"use client";

import { useState, useTransition } from "react";

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: number;
  value: string;
  options: string[];
  action: (id: number, status: string) => Promise<void>;
}) {
  const [status, setStatus] = useState(value);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        setStatus(next);
        startTransition(() => action(id, next));
      }}
      className="rounded-lg border border-[var(--color-surface)] bg-white px-2 py-1 text-xs font-medium capitalize focus:border-[var(--color-primary)] focus:outline-none disabled:opacity-60"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
