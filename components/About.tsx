"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Progress from "@/public/assets/progress-kombucha.jpg";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Tentang Kami</h2>
        <p className="text-lg mb-8 text-muted-foreground">
          Amethyst Kombucha lebih dari sekedar minuman; itu adalah komitmen
          untuk kesehatan holistik. Didirikan pada tahun 2015 oleh pecinta
          kesehatan dan kombucha, misi kami adalah membawa kebijaksanaan
          kombucha yang tua ke pencari kesehatan modern.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src={Progress}
            alt="Proses pembuatan kombucha"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <div className="flex flex-col justify-center text-left">
            <h3 className="text-2xl font-semibold mb-4">Proses Kami</h3>
            <p className="text-muted-foreground">
              Kami menggunakan bahan-bahan organik terbaik dan SCOBY yang
              dipilih dengan cermat untuk menciptakan campuran kombucha
              signature kami. Setiap batch di fermentasi dengan sempurna,
              menghasilkan keseimbangan harmonis antara rasa dan probiotik
              yang bermanfaat.
            </p>
            <ul className="mt-4 list-disc list-inside text-muted-foreground">
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Sumber dari pertanian organik lokal
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Fermentasi batch kecil untuk kontrol kualitas
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Kombinasi rasa inovatif
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                Kemasan yang berfokus pada keberlanjutan
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

