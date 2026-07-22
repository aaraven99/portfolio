import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
  metadataBase: base,
  title: "Aarav Shah — Systems in Motion",
  description: "Aarav Shah's portfolio: robotics, quantitative-finance research, engineering, music, and leadership.",
  keywords: ["Aarav Shah", "quantitative finance", "backtesting", "robotics", "engineering", "Frisco Texas", "student portfolio"],
  authors: [{ name: "Aarav Shah" }],
  openGraph: {
    title: "Aarav Shah — Quantitative Finance Collection",
    description: "Ten quantitative-finance systems built with disciplined assumptions and reproducible research.",
    type: "website",
    siteName: "Aarav Shah — Systems in Motion",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Aarav Shah quantitative finance collection" }],
  },
  twitter: { card: "summary_large_image", title: "Aarav Shah — Quantitative Finance Collection", description: "Ten quantitative-finance systems built with disciplined assumptions and reproducible research.", images: ["/og.png"] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
