import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import {
  HERO,
  BOX_SIZES,
  HOW_IT_WORKS,
  SERVICES,
  BOOK_STEPS,
  STORY,
  PARTNERS,
  FAQS,
  TESTIMONIALS,
  FINAL_CTA,
} from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { BookRentalTabs } from "@/components/BookRentalTabs";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
};

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\n/g, "<br />") },
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />

      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden bg-[var(--brand)] text-white">
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${HERO.videoId}?autoplay=1&mute=1&loop=1&playlist=${HERO.videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`}
          title="Box It Up Storage"
          allow="autoplay; encrypted-media"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-[var(--brand)]/80" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{HERO.heading}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">{HERO.subheading}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={HERO.primaryCta.href} className="rounded-lg bg-[var(--accent)] px-7 py-3.5 font-semibold text-white hover:bg-[var(--accent-dark)]">
              {HERO.primaryCta.label}
            </Link>
            <a href={HERO.secondaryCta.href} className="rounded-lg border border-white px-7 py-3.5 font-semibold text-white hover:bg-white/10">
              {HERO.secondaryCta.label}
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {HERO.features.map((f) => (
              <div key={f.title} className="rounded-lg bg-white/10 p-6 backdrop-blur">
                <h2 className="text-xl font-bold">{f.title}</h2>
                <p className="mt-2 text-sm text-white/85">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BOX SIZES ───────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{BOX_SIZES.heading}</h2>
            <p className="mt-4 text-[var(--muted-foreground)]">{BOX_SIZES.intro}</p>
          </div>
          <ul className="flex flex-wrap gap-6 md:justify-end">
            {BOX_SIZES.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-sm font-medium">
                <span className="h-3.5 w-3.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BOX_SIZES.slides.map((s) => (
            <article key={s.title} className="flex flex-col overflow-hidden rounded-lg border border-[var(--border)]">
              <Image src={s.image} alt={s.title} width={1200} height={678} className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-[10]">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{HOW_IT_WORKS.heading}</h2>
            <p className="mt-5 font-semibold">{HOW_IT_WORKS.lead}</p>
            {HOW_IT_WORKS.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-[var(--muted-foreground)]">{p}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={SITE.inquireUrl} className="rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-dark)]">
                REQUEST A QUOTE
              </Link>
              <a href={`tel:${SITE.phone}`} className="rounded-lg border border-[var(--brand)] px-6 py-3 font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/10">
                CALL US TODAY
              </a>
            </div>
          </div>
          <Image src={HOW_IT_WORKS.image} alt="How it works" width={676} height={451} className="w-full rounded-lg object-cover" />
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">{SERVICES.heading}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {SERVICES.cards.map((c) => (
            <article key={c.title} className="overflow-hidden rounded-lg border border-[var(--border)]">
              <div className="relative">
                <Image src={c.image} alt={c.title} width={392} height={291} className="aspect-[4/3] w-full object-cover" />
                <span className="absolute left-4 top-4 max-w-[70%] rounded bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white">
                  {c.badge}
                </span>
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold">
                  {c.title} <span className="font-normal text-[var(--muted-foreground)]">{c.price}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── BOOK YOUR RENTAL ───────────── */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">{BOOK_STEPS.heading}</h2>
          <p className="mt-3 text-[var(--muted-foreground)]">{BOOK_STEPS.intro}</p>
          <BookRentalTabs />
        </div>
      </section>

      {/* ───────────── OUR STORY ───────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{STORY.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{STORY.heading}</h2>
          <p className="mt-5 text-[var(--muted-foreground)]">{STORY.body}</p>
          <Link href={STORY.cta.href} className="mt-8 inline-block rounded-lg bg-[var(--brand)] px-6 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]">
            {STORY.cta.label}
          </Link>
        </div>
        <Image src={STORY.image} alt={STORY.heading} width={872} height={951} className="w-full rounded-lg object-cover" />
      </section>

      {/* ───────────── PARTNERS ───────────── */}
      <section className="bg-[var(--muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold">{PARTNERS.heading}</h2>
          <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
            {PARTNERS.logos.map((logo) => (
              <div key={logo.src} className="flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={160} height={80} className="h-16 w-auto object-contain opacity-80 transition-opacity hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="mt-10 divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold marker:content-none">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--muted)] text-[var(--brand)] transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="whitespace-pre-line px-6 pb-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="bg-[var(--brand)] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{TESTIMONIALS.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">{TESTIMONIALS.heading}</h2>
            <div className="mt-8 space-y-6">
              {TESTIMONIALS.items.map((t) => (
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
            <Image src={TESTIMONIALS.image} alt="Box It Up Storage facility" width={1151} height={1536} className="mx-auto w-full max-w-sm rounded-lg object-cover" />
            <div className="mt-6 rounded-lg bg-white/10 p-6 text-center">
              <p className="text-4xl font-extrabold">{TESTIMONIALS.rating.score}</p>
              <p className="mt-1 text-[var(--accent)]" aria-hidden="true">★★★★★</p>
              <p className="mt-1 text-sm text-white/80">{TESTIMONIALS.rating.count} · {TESTIMONIALS.rating.label}</p>
              <a href={TESTIMONIALS.reviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
                Read Reviews →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{FINAL_CTA.heading}</h2>
        <p className="mt-4 text-[var(--muted-foreground)]">{FINAL_CTA.body}</p>
        <Link href={FINAL_CTA.cta.href} className="mt-8 inline-block rounded-lg bg-[var(--accent)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--accent-dark)]">
          {FINAL_CTA.cta.label}
        </Link>
      </section>
    </>
  );
}
