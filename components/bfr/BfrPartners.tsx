import Image from "next/image";
import type { BfrPartners as BfrPartnersData } from "@/lib/boxes-for-rent-content";

export function BfrPartners({ data }: { data: BfrPartnersData }) {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[1440px] px-6 pb-[40px] pt-[80px] lg:px-[72px]">
        <h2 className="text-center text-2xl font-bold">{data.heading}</h2>
        <div className="mt-10 grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 md:grid-cols-6">
          {data.logos.map((logo) => (
            // White tile per Figma (logos sit on white, not the grey band) — C4.
            <div key={logo.src} className="flex items-center justify-center rounded-lg bg-[var(--color-white)] p-4">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
