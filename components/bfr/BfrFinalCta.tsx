import Link from "next/link";
import type { BfrFinalCta as BfrFinalCtaData } from "@/lib/boxes-for-rent-content";

export function BfrFinalCta({ data }: { data: BfrFinalCtaData }) {
  return (
    <section className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-[34px] md:text-[50px]">{data.heading}</h2>
        <p className="mt-4 text-white/90">{data.body}</p>
        {data.ctaHref && (
          <Link
            href={data.ctaHref}
            className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 font-semibold text-white hover:opacity-90"
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
