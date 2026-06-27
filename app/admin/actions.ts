"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { login, logout, requireAuth } from "@/lib/auth";
import {
  saveSection,
  resetSection,
  updateSubmissionStatus,
  createClient,
  updateClientStatus,
} from "@/lib/cms";

export type FormState = { ok?: boolean; error?: string } | undefined;

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  try {
    if (!(await login(password))) return { error: "Incorrect password." };
  } catch (e) {
    return { error: (e as Error).message };
  }
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/rental-new");
  revalidatePath("/boxes-for-rent");
}

export async function saveSectionAction(key: string, json: string): Promise<FormState> {
  await requireAuth();
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { error: "Could not parse the edited content." };
  }
  await saveSection(key, data);
  revalidatePublic();
  revalidatePath(`/admin/content/${key}`);
  return { ok: true };
}

export async function resetSectionAction(key: string): Promise<FormState> {
  await requireAuth();
  await resetSection(key);
  revalidatePublic();
  return { ok: true };
}

export async function setSubmissionStatusAction(id: number, status: string) {
  await requireAuth();
  await updateSubmissionStatus(id, status);
  revalidatePath("/admin/submissions");
}

export async function setClientStatusAction(id: number, status: string) {
  await requireAuth();
  await updateClientStatus(id, status);
  revalidatePath("/admin/clients");
}

export async function createClientAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAuth();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!name || !email) return { error: "Name and email are required." };
  const amountRaw = String(formData.get("monthly_amount") ?? "").trim();
  const amount = amountRaw ? Math.round(parseFloat(amountRaw) * 100) : undefined;
  await createClient({
    name,
    email,
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    plan: String(formData.get("plan") ?? "").trim() || undefined,
    box_size: String(formData.get("box_size") ?? "").trim() || undefined,
    monthly_amount_cents: Number.isFinite(amount as number) ? amount : undefined,
    status: String(formData.get("status") ?? "pending").trim() || "pending",
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  });
  revalidatePath("/admin/clients");
  return { ok: true };
}
