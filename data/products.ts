import { CartItem } from '@/lib/types'
import imageUrl1 from '@/public/assets/1.jpg'

export const products: CartItem[] = [
  { id: 1,imageUrl: imageUrl1,  name: 'Classic Amethyst', price: 4.99, quantity: 0, recipe: 'Our signature blend with a perfect balance of sweetness and tang.' },
  { id: 2,imageUrl: imageUrl1, name: 'Lavender Dream', price: 5.49, quantity: 0, recipe: 'Calming lavender infused kombucha for relaxation.' },
  { id: 3,imageUrl: imageUrl1, name: 'Ginger Zest', price: 5.29, quantity: 0, recipe: 'A spicy kick of ginger for an invigorating experience.' },
  { id: 4,imageUrl: imageUrl1, name: 'Bunga Telang', price: 5.99, quantity: 0, recipe: 'Butterfly pea flower kombucha with a mesmerizing blue hue.' },
  { id: 5,imageUrl: imageUrl1, name: 'Bunga Amaranth', price: 5.79, quantity: 0, recipe: 'Rich in antioxidants with a vibrant red color.' },
  { id: 6,imageUrl: imageUrl1, name: 'Daun Kelor', price: 5.59, quantity: 0, recipe: 'Moringa leaf kombucha packed with nutrients.' },
  { id: 7,imageUrl: imageUrl1, name: 'Teh Hijau', price: 5.39, quantity: 0, recipe: 'Green tea kombucha for a refreshing boost.' },
  { id: 8,imageUrl: imageUrl1, name: 'Black Tea', price: 5.19, quantity: 0, recipe: 'Classic black tea kombucha with a robust flavor.' },
  { id: 9,imageUrl: imageUrl1, name: 'Kopi Kombucha', price: 5.89, quantity: 0, recipe: 'Coffee-infused kombucha for a unique energy kick.' },
]