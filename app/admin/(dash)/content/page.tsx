import Link from "next/link";
import { SECTION_LIST } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default function ContentIndex() {
  // Preserve declaration order of groups as they first appear in SECTION_LIST.
  const groups: string[] = [];
  for (const s of SECTION_LIST) if (!groups.includes(s.group)) groups.push(s.group);

  return (
    <div>
      <h1 className="text-2xl font-bold">Content</h1>
      <p className="mt-1 text-sm text-[var(--color-text)]">
        Edit each section of the site. Changes go live immediately.
      </p>

      {groups.map((group) => (
        <section key={group} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]">{group}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {SECTION_LIST.filter((s) => s.group === group).map((s) => (
              <Link
                key={s.key}
                href={`/admin/content/${s.key}`}
                className="rounded-lg border border-[var(--color-surface)] bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <p className="font-semibold text-[var(--color-primary)]">{s.label}</p>
                <p className="mt-1 text-sm text-[var(--color-text)]">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
