import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import {ThemeProvider} from "@/components/ThemeProvider";
import {Toaster} from "@/components/ui/sonner";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: { default: "Find My Pic", template: "%s | Find My Pic" },
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
      className={cn("h-full scroll-smooth antialiased font-sans", geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <TanstackQueryProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}