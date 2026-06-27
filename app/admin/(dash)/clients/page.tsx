import { listClients, getContent } from "@/lib/cms";
import { isStripeConfigured } from "@/lib/stripe";
import { setClientStatusAction } from "@/app/admin/actions";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { NewClientForm } from "@/components/admin/NewClientForm";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "active", "past_due", "canceled"];

function money(cents: number | null) {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);
}

export default async function ClientsPage() {
  const [clients, content] = await Promise.all([listClients(), getContent()]);
  const plans = content.services.cards.map((c) => c.title);
  const boxSizes = content.book_steps.boxSizeOptions;
  const stripeOn = isStripeConfigured();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Onboarded storage clients and their billing status.
          </p>
        </div>
        <NewClientForm plans={plans} boxSizes={boxSizes} />
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm ${
          stripeOn
            ? "border-[var(--brand)] bg-[var(--brand-pale)] text-[var(--brand)]"
            : "border-[var(--border)] bg-white text-[var(--muted-foreground)]"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${stripeOn ? "bg-[var(--brand)]" : "bg-amber-400"}`} />
        {stripeOn ? (
          <span>Stripe is connected — clients who complete the payment flow appear here automatically.</span>
        ) : (
          <span>
            Stripe not configured (placeholder keys). Billing is disabled; clients are recorded manually. Set
            <code className="mx-1 rounded bg-[var(--muted)] px-1">STRIPE_SECRET_KEY</code> to enable.
          </span>
        )}
      </div>

      {clients.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted-foreground)]">
          No clients yet. Use “Onboard a client” to add one. Once Stripe is connected, clients who complete the public
          payment flow will appear here automatically.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--muted)] text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3">Since</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Monthly</th>
                <th className="px-4 py-3">Billing</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {clients.map((c) => (
                <tr key={c.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.created_at}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.name}</div>
                    <a href={`mailto:${c.email}`} className="block text-xs text-[var(--brand)] hover:underline">
                      {c.email}
                    </a>
                    {c.phone && <div className="text-xs text-[var(--muted-foreground)]">{c.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div>{c.plan ?? "—"}</div>
                    <div className="text-[var(--muted-foreground)]">{c.box_size ?? ""}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{money(c.monthly_amount_cents)}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">
                    {c.stripe_customer_id ? (
                      <span className="rounded bg-[var(--brand-pale)] px-2 py-0.5 text-[var(--brand)]">Stripe linked</span>
                    ) : (
                      "Manual"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={c.id} value={c.status} options={STATUSES} action={setClientStatusAction} />
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
