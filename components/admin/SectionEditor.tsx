"use client";

import { useState } from "react";
import { saveSectionAction, resetSectionAction } from "@/app/admin/actions";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function humanize(key: string) {
  return key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Build an empty value shaped like a template (for "Add item"). */
function blankLike(v: Json): Json {
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") {
    const o: Record<string, Json> = {};
    for (const k of Object.keys(v)) o[k] = blankLike((v as Record<string, Json>)[k]);
    return o;
  }
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  return "";
}

const inputCls =
  "mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none";

function Field({
  value,
  label,
  depth,
  onChange,
}: {
  value: Json;
  label?: string;
  depth: number;
  onChange: (v: Json) => void;
}) {
  if (typeof value === "string") {
    const long = value.length > 60 || value.includes("\n");
    return (
      <label className="block">
        {label && <span className="block text-sm font-medium text-[var(--foreground)]">{label}</span>}
        {long ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={Math.min(14, Math.max(3, value.split("\n").length + 1))}
            className={inputCls}
          />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        {label && <span className="block text-sm font-medium">{label}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={inputCls}
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const singular = label?.replace(/s$/, "") ?? "Item";
    return (
      <fieldset className="rounded-lg border border-[var(--border)] p-4">
        {label && (
          <legend className="px-1 text-sm font-semibold text-[var(--brand)]">
            {label} <span className="font-normal text-[var(--muted-foreground)]">({value.length})</span>
          </legend>
        )}
        <div className="space-y-4">
          {value.map((item, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                  {singular} {i + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => {
                      const arr = [...value];
                      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                      onChange(arr);
                    }}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--brand)] disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === value.length - 1}
                    onClick={() => {
                      const arr = [...value];
                      [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
                      onChange(arr);
                    }}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--brand)] disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((_, j) => j !== i))}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <Field
                value={item}
                depth={depth + 1}
                onChange={(nv) => {
                  const arr = [...value];
                  arr[i] = nv;
                  onChange(arr);
                }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, value.length ? blankLike(value[0]) : ""])}
          className="mt-3 rounded-lg border border-dashed border-[var(--brand)] px-3 py-1.5 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand-pale)]"
        >
          + Add {singular.toLowerCase()}
        </button>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    return (
      <div className={depth > 0 ? "space-y-4 rounded-lg border border-[var(--border)] p-4" : "space-y-5"}>
        {label && depth > 0 && <p className="text-sm font-semibold text-[var(--brand)]">{label}</p>}
        {Object.keys(obj).map((k) => (
          <Field
            key={k}
            label={humanize(k)}
            value={obj[k]}
            depth={depth + 1}
            onChange={(nv) => onChange({ ...obj, [k]: nv })}
          />
        ))}
      </div>
    );
  }

  // null / unknown — expose as text
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium">{label}</span>}
      <input value={value === null ? "" : String(value)} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

export function SectionEditor({ sectionKey, initial }: { sectionKey: string; initial: Json }) {
  const [value, setValue] = useState<Json>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string } | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await saveSectionAction(sectionKey, JSON.stringify(value));
    setSaving(false);
    if (res?.ok) setMsg({ ok: true, text: "Saved — changes are live." });
    else setMsg({ ok: false, text: res?.error ?? "Save failed." });
  }

  async function reset() {
    if (!confirm("Reset this section to the original default? Your edits will be removed.")) return;
    await resetSectionAction(sectionKey);
    location.reload();
  }

  return (
    <div>
      <div className="rounded-lg border border-[var(--border)] bg-white p-6">
        <Field value={value} depth={0} onChange={setValue} />
      </div>

      <div className="sticky bottom-0 mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-[var(--border)] bg-white/95 p-3 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-[var(--brand)] px-5 py-2 font-semibold text-white hover:bg-[var(--brand-dark)] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:border-red-300 hover:text-red-600"
        >
          Reset to default
        </button>
        {msg && (
          <span className={`text-sm font-medium ${msg.ok ? "text-[var(--brand)]" : "text-red-600"}`}>{msg.text}</span>
        )}
      </div>
    </div>
  );
}
