"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/CartContext";
import { products } from "@/data/products";
import { CartItem } from "@/lib/types";
import Image from "next/image";

export default function Products() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);

  return (
    <section id="products" className="py-20 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
          Produk Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-card">
              <CardContent className="p-6">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">{product.recipe}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-card-foreground">
                    Rp {product.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Resep
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{product.name}</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="bahan">
                          <TabsList>
                            <TabsTrigger value="bahan">Bahan-bahan</TabsTrigger>
                            <TabsTrigger value="cara">Cara Membuat</TabsTrigger>
                          </TabsList>
                          <TabsContent value="bahan">
                            <ul className="list-disc pl-5">
                              {product.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                              ))}
                            </ul>
                          </TabsContent>
                          <TabsContent value="cara">
                            <ol className="list-decimal pl-5">
                              {product.instructions.map(
                                (instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                )
                              )}
                            </ol>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => addToCart(product)}>Tambah</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
