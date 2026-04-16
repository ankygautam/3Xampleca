import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3xample",
  description:
    "3xample is a build-in-public showcase of AI-agentic web applications, built live and shared openly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
