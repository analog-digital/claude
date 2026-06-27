import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/cms";

export const dynamic = "force-dynamic";

/** Public inquiry form endpoint — stores the submission in the CMS (D1). */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      body = Object.fromEntries((await req.formData()).entries()) as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);
  const name = str(body.name);
  const email = str(body.email);

  // Basic validation + a honeypot field ("company") to deter spam bots.
  if (str(body.company)) return NextResponse.json({ ok: true }); // silently drop bots
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
  }

  try {
    const id = await createSubmission({
      name,
      email,
      phone: str(body.phone),
      box_size: str(body.boxSize) ?? str(body.box_size),
      service: str(body.service),
      message: str(body.message),
      source: str(body.source),
      raw: body,
    });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not save your request." }, { status: 500 });
  }
}
