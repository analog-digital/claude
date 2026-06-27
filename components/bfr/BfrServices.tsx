import Image from "next/image";
import Link from "next/link";
import type { BfrServices as BfrServicesData } from "@/lib/boxes-for-rent-content";

export function BfrServices({ data }: { data: BfrServicesData }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16">
      <h2 className="text-3xl font-extrabold md:text-4xl">{data.label}</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {data.cards.map((c) => (
          <article key={c.title} className="overflow-hidden rounded-lg border border-[var(--border)] bg-white">
            <div className="relative">
              <Image src={c.image} alt={c.imageAlt} width={392} height={291} className="aspect-[4/3] w-full object-cover" />
              {c.accessBadge && (
                <span className="absolute left-4 top-4 max-w-[70%] rounded bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white">
                  {c.accessBadge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{c.description}</p>
            </div>
          </article>
        ))}
      </div>
      {data.learnMoreHref && (
        <div className="mt-8">
          <Link
            href={data.learnMoreHref}
            className="inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]"
          >
            {data.learnMoreLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
