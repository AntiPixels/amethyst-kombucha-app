import { StaticImageData } from "next/image";

export interface CartItem {
  id: number;
  imageUrl: StaticImageData;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  content: string;
}
