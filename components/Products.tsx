"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/components/CartContext";
import { products } from "@/data/products";
import { useTheme } from "next-themes";

export default function Products() {
  const { addToCart } = useCart();
  const [recipeDialog, setRecipeDialog] = useState<{
    isOpen: boolean;
    recipe: string;
  }>({ isOpen: false, recipe: "" });
  const { theme } = useTheme();

  return (
    <section id="products" className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2
          className={`text-4xl font-bold mb-12 text-center ${
            theme === "dark" ? "text-purple-300" : "text-purple-800"
          }`}
        >
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`overflow-hidden ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg"
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      theme === "dark" ? "text-purple-300" : "text-purple-800"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-purple-600"
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => addToCart(product)}
                      className={`${
                        theme === "dark"
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white`}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setRecipeDialog({
                          isOpen: true,
                          recipe: product.recipe,
                        })
                      }
                      className={
                        theme === "dark"
                          ? "text-purple-300 border-purple-300"
                          : "text-purple-600 border-purple-600"
                      }
                    >
                      Recipe
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      </motion.div>

      <Dialog
        open={recipeDialog.isOpen}
        onOpenChange={(isOpen) => setRecipeDialog({ isOpen, recipe: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recipe Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>{recipeDialog.recipe}</DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
}
