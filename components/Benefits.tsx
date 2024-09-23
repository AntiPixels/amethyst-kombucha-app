import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { benefits } from "@/data/benefits";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-20 px-6 bg-purple-100 dark:bg-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-800 dark:text-purple-300">
          Benefits of Kombucha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 dark:bg-gray-700 dark:text-white">
              <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">
                {benefit.title}
              </h3>
              <p className="text-purple-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
