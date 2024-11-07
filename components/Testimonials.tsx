"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-muted">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          Apa Kata Pelanggan Kami
        </h2>
        <div className="relative">
          <Card className="p-6 h-60 bg-card text-card-foreground rounded-lg shadow-md">
            <div className="flex items-center mb-4 justify-center">
              <div>
                <h3 className="font-semibold">
                  {testimonials[currentIndex].name}
                </h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              {testimonials[currentIndex].content}
            </p>
          </Card>
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`mx-1 ${
                  currentIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
                onClick={() => goToSlide(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
