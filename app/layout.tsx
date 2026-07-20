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
  description: "Aarav Shah is a high-school builder, strategist, musician, and systems thinker working across robotics, quantitative research, engineering, and leadership.",
  keywords: ["Aarav Shah", "robotics", "quantitative research", "engineering", "Frisco Texas", "student portfolio"],
  authors: [{ name: "Aarav Shah" }],
  openGraph: {
    title: "Aarav Shah — Systems in Motion",
    description: "Different systems. One mindset: disciplined improvement.",
    type: "website",
    siteName: "Aarav Shah — Systems in Motion",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Aarav Shah — Systems in Motion" }],
  },
  twitter: { card: "summary_large_image", title: "Aarav Shah — Systems in Motion", description: "Different systems. One mindset: disciplined improvement.", images: ["/og.png"] },
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
