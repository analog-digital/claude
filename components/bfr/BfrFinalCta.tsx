import Link from "next/link";
import type { BfrFinalCta as BfrFinalCtaData } from "@/lib/boxes-for-rent-content";

export function BfrFinalCta({ data }: { data: BfrFinalCtaData }) {
  return (
    <section className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 text-center lg:px-[72px]">
        <h2 className="mx-auto max-w-3xl text-[34px] md:text-[50px]">{data.heading}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/90">{data.body}</p>
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
