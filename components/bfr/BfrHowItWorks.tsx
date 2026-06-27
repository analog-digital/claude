import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import type { BfrHowItWorks as BfrHowItWorksData } from "@/lib/boxes-for-rent-content";

export function BfrHowItWorks({ data }: { data: BfrHowItWorksData }) {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-extrabold md:text-4xl">{data.label}</h2>
        <p className="mt-4 font-semibold">{data.subHeading}</p>
        {data.description.split("\n\n").map((p, i) => (
          <p key={i} className="mt-4 text-[var(--muted-foreground)]">
            {p}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/inquire-today"
            className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]"
          >
            {data.requestQuoteLabel}
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="rounded-lg border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/10"
          >
            {data.callUsLabel}
          </a>
        </div>
      </div>
      <Image
        src={data.image}
        alt={data.imageAlt}
        width={676}
        height={451}
        className="w-full rounded-lg object-cover"
      />
    </section>
  );
}
