import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { logoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  return (
    <div className="min-h-screen bg-[var(--muted)]">
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--brand)]">Box It Up</span>
            <span className="rounded bg-[var(--brand-pale)] px-2 py-0.5 text-xs font-semibold text-[var(--brand)]">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand)]">
              View site ↗
            </a>
            <form action={logoutAction}>
              <button className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--brand)]">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <AdminNav />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
