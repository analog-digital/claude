import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import type { BfrHowItWorks as BfrHowItWorksData } from "@/lib/boxes-for-rent-content";

export function BfrHowItWorks({ data }: { data: BfrHowItWorksData }) {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <h2 className="text-[34px] md:text-[50px]">{data.label}</h2>
        <p className="mt-4 font-semibold">{data.subHeading}</p>
        {data.description.split("\n\n").map((p, i) => (
          <p key={i} className="mt-4 text-[var(--color-text)]">
            {p}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/inquire-today"
            className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            {data.requestQuoteLabel}
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="rounded-lg border border-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
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
