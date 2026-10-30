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
    title: "Aarav Shah | Robotics, Markets & Music",
    description: "Aarav Shah's work across FTC robotics, Python market research, marching band, community leadership, and academics.",
    keywords: ["Aarav Shah", "Robo Rulers", "FTC Team 24290", "robotics", "Python", "market research", "music", "leadership", "Frisco Texas", "student portfolio"],
    authors: [{ name: "Aarav Shah" }],
    openGraph: {
      title: "Aarav Shah | Robotics, Markets & Music",
      description: "Aarav Shah's work across FTC robotics, Python market research, marching band, community leadership, and academics.",
      type: "website",
      siteName: "Aarav Shah",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Aarav Shah portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Aarav Shah | Robotics, Markets & Music",
      description: "Aarav Shah's work across FTC robotics, Python market research, marching band, community leadership, and academics.",
      images: ["/og.png"],
    },
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
