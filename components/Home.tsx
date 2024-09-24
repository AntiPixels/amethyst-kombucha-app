"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HomeBackground from "../public/assets/1.jpg";

export default function Home() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-bold mb-4 text-primary">
          Amethyst Kombucha
        </h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Elevate Your Wellness Journey
        </p>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Discover Amethyst Kombucha
        </Button>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={HomeBackground}
          alt="Amethyst Kombucha"
          width={1000}
          height={1000}
          priority
          className="h-screen w-full object-cover"
        />
      </motion.div>
    </section>
  );
}
