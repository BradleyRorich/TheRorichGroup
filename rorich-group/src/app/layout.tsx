import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Rorich Group | Print, Brand & Build",
  description:
    "South African company specialising in business cards, stickers, large-format printing, branded clothing, and custom web development.",
  openGraph: {
    title: "The Rorich Group",
    description: "Print. Brand. Build.",
    url: "https://www.rorichgroup.co.za",
    siteName: "The Rorich Group",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
