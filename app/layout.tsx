import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Chatbot from "@/components/Chatbot";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Amethyst Kombucha",
  description:
    "Kombucha adalah minuman fermentasi teh yang mengandung bakteri baik dan asam amino yang bermanfaat untuk kesehatan.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "icons/icon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased font-sans">
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}


