"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);

  return (
    <section
      id="testimonials"
      className="py-20 px-6 bg-purple-100 dark:bg-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-purple-800 dark:text-purple-300">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials
            .slice((currentTestimonialPage - 1) * 2, currentTestimonialPage * 2)
            .map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 dark:bg-gray-700 dark:text-white"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 dark:bg-purple-500 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-purple-800 dark:text-purple-300">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-purple-600 dark:text-gray-300">
                  {testimonial.content}
                </p>
              </Card>
            ))}
        </div>
        <Pagination
          className="mt-8"
          count={Math.ceil(testimonials.length / 2)}
          page={currentTestimonialPage}
          onChange={(_, page) => setCurrentTestimonialPage(page)}
        />
      </motion.div>
    </section>
  );
}
