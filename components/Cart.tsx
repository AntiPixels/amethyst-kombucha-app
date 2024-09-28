"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { CartItem } from "@/lib/types";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cartItems, addToCart, removeFromCart, clearFromCart } = useCart();

  const sendToWhatsApp = (cartItems: CartItem[]) => {
    const message =
      encodeURIComponent(`Terima kasih atas pesanan Anda dari Amethyst Kombucha!

Ringkasan Pesanan:
${cartItems
  .map(
    (item) =>
      `${item.name} x${item.quantity} - Rp${(
        item.price * item.quantity
      ).toFixed(2)}`
  )
  .join("\n")}

Total: Rp${cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)}

Kami akan segera memproses pesanan Anda. Nikmati kombucha Anda!`);

    window.open(`https://wa.me/6289637579315?text=${message}`, "_blank");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background text-foreground shadow-lg"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Keranjang Anda</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground">Keranjang Anda kosong.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4 p-3 rounded-lg bg-muted"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Rp{item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToCart(item)}
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
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">
                        Rp
                        {cartItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { X, Trash2 } from "lucide-react";
// import { useCart } from "@/components/CartContext";
// import { CartItem } from "@/lib/types";

// type CartProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function Cart({ isOpen, onClose }: CartProps) {
//   const { cartItems, addToCart, removeFromCart, clearFromCart } = useCart();

//   const sendToWhatsApp = (cartItems: CartItem[]) => {
//     const message =
//       encodeURIComponent(`Terima kasih atas pesanan Anda dari Amethyst Kombucha!

// Ringkasan Pesanan:
// ${cartItems
//   .map(
//     (item) =>
//       `${item.name} x${item.quantity} - Rp${(
//         item.price * item.quantity
//       ).toFixed(2)}`
//   )
//   .join("\n")}

// Total: Rp${cartItems
//         .reduce((total, item) => total + item.price * item.quantity, 0)
//         .toFixed(2)}

// Kami akan segera memproses pesanan Anda. Nikmati kombucha Anda!`);

//     window.open(`https://wa.me/?text=${message}`, "_blank");
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background text-foreground shadow-lg z-50"
//         >
//           <div className="p-6 h-full flex flex-col">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Keranjang Anda</h2>
//               <Button variant="ghost" size="icon" onClick={onClose}>
//                 <X className="h-6 w-6" />
//               </Button>
//             </div>
//             {cartItems.length === 0 ? (
//               <p className="text-muted-foreground">Keranjang Anda kosong.</p>
//             ) : (
//               <>
//                 <div className="flex-grow overflow-auto">
//                   {cartItems.map((item) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.2 }}
//                       className="flex justify-between items-center mb-4 p-3 rounded-lg bg-muted"
//                     >
//                       <div>
//                         <h3 className="font-semibold">{item.name}</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Rp{item.price.toFixed(2)} x {item.quantity}
//                         </p>
//                       </div>
//                       <div className="flex items-center">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           -
//                         </Button>
//                         <span className="mx-2">{item.quantity}</span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() => addToCart(item)}
//                         >
//                           +
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => clearFromCart(item.id)}
//                           className="ml-2"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//                 <div className="mt-6">
//                   <div className="flex justify-between mb-4">
//                     <span className="font-semibold">Total:</span>
//                     <span className="font-bold">
//                       Rp
//                       {cartItems
//                         .reduce(
//                           (total, item) => total + item.price * item.quantity,
//                           0
//                         )
//                         .toFixed(2)}
//                     </span>
//                   </div>
//                   <Button
//                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
//                     onClick={() => {
//                       sendToWhatsApp(cartItems);
//                       onClose();
//                     }}
//                   >
//                     Checkout via WhatsApp
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
