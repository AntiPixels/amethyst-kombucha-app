import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "Amethyst Kombucha",
  description:
    "Kombucha is a fermented tea drink that contains a symbiotic culture of bacteria and yeast. It is known for its potential health benefits, such as improving digestion and boosting the immune system. The drink originated in China and has been consumed for centuries. It is made by fermenting sweetened black tea with a SCOBY (Symbiotic Culture of Bacteria and Yeast) and has a unique, tangy flavor.",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
