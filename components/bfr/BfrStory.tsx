import Image from "next/image";
import Link from "next/link";
import type { BfrStory as BfrStoryData } from "@/lib/boxes-for-rent-content";

export function BfrStory({ data }: { data: BfrStoryData }) {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 md:grid-cols-2">
      <Image src={data.image} alt={data.imageAlt} width={872} height={951} className="w-full rounded-lg object-cover" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{data.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{data.heading}</h2>
        <p className="mt-5 text-[var(--muted-foreground)]">{data.body}</p>
        {data.ctaHref && (
          <Link
            href={data.ctaHref}
            className="mt-8 inline-block rounded-lg bg-[var(--brand)] px-6 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]"
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
