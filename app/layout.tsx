import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/components/CartContext";

const font = Poppins ({ 
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Amethyst Kombucha",
  description:
    "Kombucha adalah minuman fermentasi teh yang mengandung bakteri baik dan asam amino yang bermanfaat untuk kesehatan.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className="antialiased {font.className}" >
        <ThemeProvider enableSystem={true} attribute="class">
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
