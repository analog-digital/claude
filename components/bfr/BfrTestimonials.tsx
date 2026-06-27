import Image from "next/image";
import type { BfrTestimonials as BfrTestimonialsData } from "@/lib/boxes-for-rent-content";

export function BfrTestimonials({ data }: { data: BfrTestimonialsData }) {
  return (
    <section className="bg-[var(--color-primary-dark)] text-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">{data.eyebrow}</p>
          <h2 className="mt-2 text-[34px] md:text-[50px]">{data.heading}</h2>
          <div className="mt-8 space-y-6">
            {data.items.map((t) => (
              <figure key={t.name} className="rounded-lg bg-white/10 p-6">
                <blockquote className="text-white/90">“{t.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">
                  {t.name} <span className="font-normal text-white/70">— {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src={data.image}
            alt="Box It Up Storage facility"
            width={1151}
            height={1536}
            className="mx-auto w-full max-w-sm rounded-lg object-cover"
          />
          <div className="mt-6 rounded-lg bg-white/10 p-6 text-center">
            <p className="text-4xl font-extrabold">{data.rating.score}</p>
            <p className="mt-1 text-[var(--color-accent)]" aria-hidden="true">★★★★★</p>
            <p className="mt-1 text-sm text-white/80">
              {data.rating.count} · {data.rating.label}
            </p>
            <a
              href={data.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Read Reviews →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
