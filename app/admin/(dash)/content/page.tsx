import Link from "next/link";
import { SECTION_LIST } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default function ContentIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Content</h1>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
        Edit each section of the home &amp; rentals page. Changes go live immediately.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SECTION_LIST.map((s) => (
          <Link
            key={s.key}
            href={`/admin/content/${s.key}`}
            className="rounded-lg border border-[var(--border)] bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <p className="font-semibold text-[var(--brand)]">{s.label}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{s.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
