import Image from "next/image";
import Link from "next/link";
import type { BfrServices as BfrServicesData } from "@/lib/boxes-for-rent-content";

export function BfrServices({ data }: { data: BfrServicesData }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-0 pt-[147px] lg:px-[72px]">
      <h2 className="text-[34px] md:text-[50px]">{data.label}</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {data.cards.map((c) => (
          <article key={c.title} className="overflow-hidden rounded-lg border border-[var(--color-surface)] bg-white">
            <div className="relative">
              <Image src={c.image} alt={c.imageAlt} width={392} height={291} className="aspect-[4/3] w-full object-cover" />
              {c.accessBadge && (
                <span className="absolute left-4 top-4 max-w-[70%] rounded bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white">
                  {c.accessBadge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">{c.description}</p>
            </div>
          </article>
        ))}
      </div>
      {data.learnMoreHref && (
        <div className="mt-8">
          <Link
            href={data.learnMoreHref}
            className="inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            {data.learnMoreLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
