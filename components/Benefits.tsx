"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { benefits } from "@/data/benefits";

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-6 bg-muted">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
          Manfaat Kombucha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
