import type { Metadata } from "next";
import { Poppins, Inter } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import {ThemeProvider} from "@/components/ThemeProvider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "Find My Pic",
  description: "A web app for helping users find images matching their appearance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.className, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
      <ThemeProvider attribute="class" enableSystem defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}