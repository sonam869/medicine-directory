
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicine Directory",
  description:
    "Search medicine information, ingredients, uses, warnings, and dosage details.",
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

