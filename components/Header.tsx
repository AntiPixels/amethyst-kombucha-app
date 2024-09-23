"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import Cart from "./Cart";
import { useCart } from "@/components/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const { cartItems } = useCart();

  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  const navbarHeight = useTransform(scrollY, [0, 100], ["80px", "60px"]);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <motion.header
      style={{ background: navbarBackground, height: navbarHeight }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${
        theme === "dark" ? "text-white" : "text-purple-800"
      }`}
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <span className="text-2xl font-bold">Amethyst</span>
      </div>
      <div
        className={`md:flex space-x-4 ${
          isMobileMenuOpen
            ? "absolute top-full left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-md"
            : "hidden"
        }`}
      >
        {["home", "about", "benefits", "products", "testimonials"].map(
          (section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`capitalize block md:inline-block py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {section}
            </a>
          )
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCartOpen(true)}
          className="relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalCartItems}
            </span>
          )}
        </Button>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
}
