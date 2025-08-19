import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BIMCO CRM - Maritime Customer Relations",
  description: "Maritime industry CRM system for managing companies, contacts, courses and fleet operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bimco-cream font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
