import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg mb-8 text-muted-foreground">
          Amethyst Kombucha is more than just a beverage; it&apos;s a commitment
          to holistic wellness. Founded in 2015 by health enthusiasts and
          kombucha aficionados, our mission is to bring the ancient wisdom of
          fermented tea to modern-day wellness seekers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src="/placeholder.svg"
            alt="Kombucha brewing process"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <div className="flex flex-col justify-center text-left">
            <h3 className="text-2xl font-semibold mb-4">Our Process</h3>
            <p className="text-muted-foreground">
              We use only the finest organic ingredients and a carefully curated
              SCOBY to create our signature kombucha blends. Each batch is
              fermented to perfection, resulting in a harmonious balance of
              flavors and beneficial probiotics.
            </p>
            <ul className="mt-4 list-disc list-inside text-muted-foreground">
              <li>Sourced from local organic farms</li>
              <li>Small-batch fermentation for quality control</li>
              <li>Innovative flavor combinations</li>
              <li>Sustainability-focused packaging</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
