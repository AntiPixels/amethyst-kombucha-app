import { CartItem } from "@/lib/types";
import Telang from "@/public/assets/bunga-telang.jpg";
import Amarant from "@/public/assets/bunga-amarant.jpg";
import Kelor from "@/public/assets/daun-kelor.jpg";
import THijau from "@/public/assets/teh-hijau.jpg";
import THitam from "@/public/assets/teh-hitam.jpg";
import Kopi from "@/public/assets/kopi.jpg";



export const products: CartItem[] = [
  {
    id: 1,
    imageUrl: Telang,
    name: "Bunga Telang",
    price: 55000,
    description: "Kombucha bunga telang dengan warna biru yang memesona.",
    benefits: [
      "Kaya akan antioksidan",
      "Membantu meningkatkan kesehatan mata",
      "Mendukung fungsi kognitif",
      "Memiliki sifat anti-inflamasi",
    ],
  },
  {
    id: 2,
    imageUrl: Amarant,
    name: "Bunga Amaranth",
    price: 52000,
    description: "Kaya antioksidan dengan warna merah yang menawan.",
    benefits: [
      "Mendukung kesehatan jantung",
      "Membantu menurunkan kolesterol",
      "Kaya akan protein nabati",
      "Mendukung sistem kekebalan tubuh",
    ],
  },
  {
    id: 3,
    imageUrl: Kelor,
    name: "Daun Kelor",
    price: 50000,
    description: "Kombucha daun kelor kaya nutrisi.",
    benefits: [
      "Kaya akan vitamin dan mineral",
      "Membantu mengurangi peradangan",
      "Mendukung kesehatan tulang",
      "Membantu mengontrol gula darah",
    ],
  },
  {
    id: 4,
    imageUrl: THijau,
    name: "Teh Hijau",
    price: 48000,
    description: "Kombucha teh hijau untuk kesegaran yang menyehatkan.",
    benefits: [
      "Meningkatkan metabolisme",
      "Kaya akan antioksidan",
      "Membantu meningkatkan fungsi otak",
      "Mendukung kesehatan jantung",
    ],
  },
  {
    id: 5,
    imageUrl: THitam,
    name: "Teh Hitam",
    price: 45000,
    description: "Kombucha teh hitam klasik dengan cita rasa kuat.",
    benefits: [
      "Meningkatkan energi",
      "Membantu kesehatan pencernaan",
      "Mendukung kesehatan jantung",
      "Membantu meningkatkan kekebalan tubuh",
    ],
  },
  {
    id: 6,
    imageUrl: Kopi,
    name: "Kopi Kombucha",
    price: 58000,
    description: "Kombucha kopi untuk dorongan energi yang unik.",
    benefits: [
      "Meningkatkan fokus dan konsentrasi",
      "Mendukung kesehatan hati",
      "Membantu meningkatkan metabolisme",
      "Kaya akan antioksidan",
    ],
  },
];
