import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zakat Calculator | Calculate Your Islamic Charity Obligation",
  description: "A comprehensive tool to calculate your Zakat obligation accurately. Includes gold, silver, cash, investments, retirement accounts, and more.",
  keywords: "zakat calculator, islamic charity, zakat on gold, zakat on silver, calculate zakat, nisab threshold, muslim charity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
