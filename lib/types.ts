import { StaticImageData } from "next/image"

export type CartItem = {
  id: number
  imageUrl: StaticImageData
  name: string
  price: number
  quantity: number
  recipe: string
}

export type Benefit = {
  title: string
  description: string
}

export type Testimonial = {
  name: string
  content: string
}