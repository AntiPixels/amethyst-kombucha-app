import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-purple-800 text-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Amethyst Kombucha</h3>
          <p>Elevating wellness, one sip at a time.</p>
          <p className="mt-4">123 Fermentation Lane, Probiotic City, 12345</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:underline">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <form className="flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-white text-purple-800 dark:bg-gray-700 dark:text-white"
            />
            <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Amethyst Kombucha. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
