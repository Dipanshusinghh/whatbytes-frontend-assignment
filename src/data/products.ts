export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  brand: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for daily commutes and focused work sessions.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    brand: "SoundMax"
  },
  {
    id: "2",
    name: "Minimalist Leather Backpack",
    description: "Handcrafted genuine leather backpack perfect for daily commute. Fits up to a 15-inch laptop and features multiple compartments for easy organization.",
    price: 129.50,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    brand: "LuxeCarry"
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your heart rate, sleep, and workouts. Water-resistant up to 50 meters with a 7-day battery life. Syncs seamlessly with iOS and Android devices.",
    price: 199.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    brand: "FitTech"
  },
  {
    id: "4",
    name: "Classic Aviator Sunglasses",
    description: "Timeless design with polarized lenses and UV400 protection. Perfect for any outdoor activity, offering both style and eye protection.",
    price: 89.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    brand: "RayOptics"
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "Ultra-soft, breathable organic cotton t-shirt. Ethically made and sustainably sourced. A wardrobe staple that pairs well with almost anything.",
    price: 34.00,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    brand: "EcoWear"
  },
  {
    id: "6",
    name: "Professional Mechanical Keyboard",
    description: "Tactile mechanical switches with customizable RGB backlighting and an aluminum frame. Enhances typing speed and gaming performance.",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    brand: "KeyPro"
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug",
    description: "Minimalist matte ceramic mug. Holds 12oz of your favorite hot beverage. Microwave and dishwasher safe.",
    price: 18.50,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514432324607-a09d5b4aefdd?q=80&w=1000&auto=format&fit=crop",
    rating: 4.4,
    brand: "HomeAesthetics"
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Fast 15W wireless charger compatible with all Qi-enabled devices. Sleek and slim design that looks great on any desk or nightstand.",
    price: 39.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=1000&auto=format&fit=crop",
    rating: 4.2,
    brand: "ChargeTech"
  }
];

export const getProducts = () => products;
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getCategories = () => Array.from(new Set(products.map(p => p.category)));
export const getBrands = () => Array.from(new Set(products.map(p => p.brand)));
