import Link from "next/link";
import { listSubmissions, listClients, SECTION_LIST } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [submissions, clients] = await Promise.all([listSubmissions(), listClients()]);
  const newSubs = submissions.filter((s) => s.status === "new").length;
  const activeClients = clients.filter((c) => c.status === "active").length;

  const cards = [
    { label: "Editable sections", value: SECTION_LIST.length, href: "/admin/content", sub: "Manage page content" },
    { label: "New submissions", value: newSubs, href: "/admin/submissions", sub: `${submissions.length} total` },
    { label: "Active clients", value: activeClients, href: "/admin/clients", sub: `${clients.length} total` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-[var(--color-text)]">Manage your website content, leads and clients.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg border border-[var(--color-surface)] bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <p className="text-sm text-[var(--color-text)]">{c.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-[var(--color-primary)]">{c.value}</p>
            <p className="mt-1 text-xs text-[var(--color-text)]">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-[var(--color-surface)] bg-white p-5">
        <h2 className="font-semibold">Recent submissions</h2>
        {submissions.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--color-text)]">No submissions yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-[var(--color-surface)]">
            {submissions.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2 text-sm">
                <span>
                  <span className="font-medium">{s.name ?? "—"}</span>{" "}
                  <span className="text-[var(--color-text)]">· {s.box_size ?? "?"} · {s.service ?? "?"}</span>
                </span>
                <span className="text-xs text-[var(--color-text)]">{s.created_at}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/admin/submissions" className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">
          View all submissions →
        </Link>
      </div>
    </div>
  );
}
