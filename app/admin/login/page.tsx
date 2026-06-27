import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--muted)] px-4">
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-[var(--brand)]">Box It Up — Admin</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">Sign in to manage the site.</p>
        <LoginForm />
      </div>
    </main>
  );
}
