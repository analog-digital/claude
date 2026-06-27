import { listSubmissions } from "@/lib/cms";
import { setSubmissionStatusAction } from "@/app/admin/actions";
import { StatusSelect } from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "won", "archived"];

export default async function SubmissionsPage() {
  const submissions = await listSubmissions();

  return (
    <div>
      <h1 className="text-2xl font-bold">Form submissions</h1>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
        Every “Request a Quote” inquiry from the website lands here.
      </p>

      {submissions.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted-foreground)]">
          No submissions yet. When a visitor completes the inquiry form, it will appear here.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--muted)] text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Interested in</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {submissions.map((s) => (
                <tr key={s.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--muted-foreground)]">{s.created_at}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{s.name ?? "—"}</div>
                    {s.email && (
                      <a href={`mailto:${s.email}`} className="block text-xs text-[var(--brand)] hover:underline">
                        {s.email}
                      </a>
                    )}
                    {s.phone && (
                      <a href={`tel:${s.phone}`} className="block text-xs text-[var(--muted-foreground)]">
                        {s.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div>{s.box_size ?? "—"}</div>
                    <div className="text-[var(--muted-foreground)]">{s.service ?? ""}</div>
                    {s.source && <div className="mt-1 text-[var(--muted-foreground)]">via {s.source}</div>}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-[var(--muted-foreground)]">{s.message ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusSelect id={s.id} value={s.status} options={STATUSES} action={setSubmissionStatusAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
