import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ÆTHER — Space Science Social Platform",
  description:
    "The social network and SaaS tool hub for astrophysicists, astronomers, and space science enthusiasts. Track the ISS, follow sky events, discuss research, and share observations.",
  openGraph: {
    title: "ÆTHER — Space Science Social Platform",
    description:
      "Where space science becomes community. ISS tracker, sky events, ArXiv feed, observation logs, and more.",
    images: ["/images/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÆTHER — Space Science Social Platform",
    description:
      "Where space science becomes community. ISS tracker, sky events, ArXiv feed, observation logs, and more.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        style={{
          fontFamily: "var(--font-body)",
          backgroundColor: "var(--canvas)",
          color: "var(--text-primary)",
        }}
        className="min-h-full flex flex-col antialiased"
      >
        {children}
      </body>
    </html>
  );
}
