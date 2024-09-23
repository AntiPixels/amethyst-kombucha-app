"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/components/CartContext";
import { CartItem } from "@/lib/types";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cartItems, addToCart, removeFromCart, clearFromCart } = useCart();
  const { theme } = useTheme();

  const sendToWhatsApp = (cartItems: CartItem[]) => {
    const message =
      encodeURIComponent(`Thank you for your order from Amethyst Kombucha!

Order Summary:
${cartItems
  .map(
    (item) =>
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(
        2
      )}`
  )
  .join("\n")}

Total: $${cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)}

We'll process your order shortly. Enjoy your kombucha!`);

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className={`absolute right-0 top-0 bottom-0 w-full max-w-md ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            } shadow-lg`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  Your Cart
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {cartItems.length === 0 ? (
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-purple-600"
                  }
                >
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <h3
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-purple-300"
                              : "text-purple-800"
                          }`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-gray-300"
                              : "text-purple-600"
                          }`}
                        >
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className={
                            theme === "dark"
                              ? "text-purple-300 border-purple-300"
                              : "text-purple-600 border-purple-600"
                          }
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToCart(item)}
                          className={
                            theme === "dark"
                              ? "text-purple-300 border-purple-300"
                              : "text-purple-600 border-purple-600"
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => clearFromCart(item.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <div className="flex justify-between mb-4">
                      <span
                        className={`font-semibold ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-800"
                        }`}
                      >
                        Total:
                      </span>
                      <span
                        className={`font-bold ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-800"
                        }`}
                      >
                        $
                        {cartItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className={`w-full ${
                        theme === "dark"
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white`}
                      onClick={() => {
                        sendToWhatsApp(cartItems);
                        onClose();
                      }}
                    >
                      Checkout via WhatsApp
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
