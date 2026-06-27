import Image from "next/image";
import type { BfrPartners as BfrPartnersData } from "@/lib/boxes-for-rent-content";

export function BfrPartners({ data }: { data: BfrPartnersData }) {
  return (
    <section className="bg-[var(--muted)]">
      <div className="mx-auto max-w-[1440px] px-6 py-14">
        <h2 className="text-center text-2xl font-bold">{data.heading}</h2>
        <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
          {data.logos.map((logo) => (
            <div key={logo.src} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="h-16 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
