"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "@/public/assets/logo.jpg";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const sections = [
    { name: "Beranda", id: "home" },
    { name: "Tentang", id: "about" },
    { name: "Manfaat", id: "benefits" },
    { name: "Produk", id: "products" },
    { name: "Testimoni", id: "testimonials" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Adjust this value based on your header height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      console.error(`Element with id "${sectionId}" not found.`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Amethyst Kombucha Logo"
              width={40}
              height={40}
              className="filter drop-shadow-md rounded-full"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="mr-4"
            />
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-foreground" />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-4 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {section.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;