import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Jost — the closest free Google Fonts match to FuturaPT, the geometric sans
// declared as the brand typeface in the live site's Elementor global kit.
const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  icons: {
    icon: `${SITE.url}/wp-content/uploads/2024/08/cropped-Box-It-Up-Logo-2-32x32.jpg`,
    apple: `${SITE.url}/wp-content/uploads/2024/08/cropped-Box-It-Up-Logo-2-180x180.jpg`,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE.url}/wp-content/uploads/2025/04/box-it-up-1024x576.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE.url}/wp-content/uploads/2025/04/box-it-up-1024x576.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
