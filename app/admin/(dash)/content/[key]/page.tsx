import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection, SECTION_LIST } from "@/lib/cms";
import { SectionEditor } from "@/components/admin/SectionEditor";

export const dynamic = "force-dynamic";

export default async function EditSection({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const def = SECTION_LIST.find((s) => s.key === key);
  if (!def) notFound();

  const value = await getSection(key);

  return (
    <div>
      <Link href="/admin/content" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand)]">
        ← Back to content
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{def.label}</h1>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{def.blurb}</p>

      <div className="mt-6">
        <SectionEditor sectionKey={key} initial={value as never} />
      </div>
    </div>
  );
}
