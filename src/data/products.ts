import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import ringCategory from "@/assets/ring-category.jpg";
import earringCategory from "@/assets/earring-category.jpg";
import necklaceCategory from "@/assets/necklace-category.jpg";
import bangleCategory from "@/assets/bangle-category.jpg";

export interface StoneInfo {
  type: string;
  carat?: number;
  count?: number;
  cut?: string;
  clarity?: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  metal: string;
  weight: string;
  goldWeight?: string;
  purity: string;
  karatage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLightweight?: boolean;
  isDiamond?: boolean;
  stones?: StoneInfo[];
  makingCharges?: string;
  certification?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: "rings", name: "Rings", image: ringCategory, count: 124 },
  { id: "earrings", name: "Earrings", image: earringCategory, count: 89 },
  { id: "necklaces", name: "Necklaces", image: necklaceCategory, count: 156 },
  { id: "bangles", name: "Bangles", image: bangleCategory, count: 67 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Diamond Pendant Necklace",
    description: "Elegant gold pendant necklace featuring a brilliant cut diamond set in 22K gold with delicate chain design. Perfect for everyday elegance.",
    price: 45999,
    originalPrice: 52999,
    image: product1,
    images: [product1, product5],
    category: "necklaces",
    metal: "22K Gold",
    weight: "8.5g",
    goldWeight: "8.2g",
    purity: "916 Hallmark",
    karatage: "22K",
    isNew: true,
    isDiamond: true,
    stones: [
      { type: "Diamond", carat: 0.25, count: 1, cut: "Brilliant", clarity: "VS1", color: "F" }
    ],
    makingCharges: "12%",
    certification: "IGI Certified",
  },
  {
    id: "2",
    name: "Ruby Stud Earrings",
    description: "Stunning ruby stud earrings crafted in 22K gold with premium quality Burmese rubies. A classic piece for the discerning collector.",
    price: 32500,
    image: product2,
    images: [product2, product6],
    category: "earrings",
    metal: "22K Gold",
    weight: "4.2g",
    goldWeight: "3.8g",
    purity: "916 Hallmark",
    karatage: "22K",
    isBestSeller: true,
    isLightweight: true,
    stones: [
      { type: "Ruby", carat: 1.5, count: 2, cut: "Oval", clarity: "Eye Clean", color: "Pigeon Blood Red" }
    ],
    makingCharges: "15%",
    certification: "GRS Certified",
  },
  {
    id: "3",
    name: "Solitaire Diamond Ring",
    description: "Timeless solitaire engagement ring with a stunning round brilliant diamond in a classic 4-prong setting. Symbol of eternal love.",
    price: 125000,
    originalPrice: 145000,
    image: product3,
    images: [product3, product7],
    category: "rings",
    metal: "22K Gold",
    weight: "3.8g",
    goldWeight: "3.5g",
    purity: "916 Hallmark",
    karatage: "22K",
    isNew: true,
    isBestSeller: true,
    isDiamond: true,
    stones: [
      { type: "Diamond", carat: 0.75, count: 1, cut: "Round Brilliant", clarity: "VVS2", color: "E" }
    ],
    makingCharges: "10%",
    certification: "GIA Certified",
  },
  {
    id: "4",
    name: "Diamond Tennis Bracelet",
    description: "Exquisite diamond tennis bracelet featuring perfectly matched round diamonds set in gleaming 24K gold. Ultimate luxury for your wrist.",
    price: 185000,
    image: product4,
    images: [product4, product8],
    category: "bangles",
    metal: "24K Gold",
    weight: "12.5g",
    goldWeight: "11.8g",
    purity: "999 Hallmark",
    karatage: "24K",
    isDiamond: true,
    stones: [
      { type: "Diamond", carat: 5.0, count: 45, cut: "Round Brilliant", clarity: "VS1", color: "G" }
    ],
    makingCharges: "8%",
    certification: "IGI Certified",
  },
  {
    id: "5",
    name: "Emerald Layered Necklace",
    description: "Luxurious layered necklace set featuring natural Colombian emeralds surrounded by brilliant diamonds in 22K gold craftsmanship.",
    price: 275000,
    originalPrice: 310000,
    image: product5,
    images: [product5, product1],
    category: "necklaces",
    metal: "22K Gold",
    weight: "45g",
    goldWeight: "42g",
    purity: "916 Hallmark",
    karatage: "22K",
    isBestSeller: true,
    isDiamond: true,
    stones: [
      { type: "Emerald", carat: 8.5, count: 12, cut: "Oval", clarity: "Minor Inclusions", color: "Vivid Green" },
      { type: "Diamond", carat: 3.2, count: 48, cut: "Round Brilliant", clarity: "VS2", color: "F" }
    ],
    makingCharges: "14%",
    certification: "GIA & GRS Certified",
  },
  {
    id: "6",
    name: "Diamond Hoop Earrings",
    description: "Classic hoop earrings adorned with brilliant cut diamonds, crafted in 24K gold. Perfect for both casual and formal occasions.",
    price: 48500,
    image: product6,
    images: [product6, product2],
    category: "earrings",
    metal: "24K Gold",
    weight: "6.8g",
    goldWeight: "6.5g",
    purity: "999 Hallmark",
    karatage: "24K",
    isNew: true,
    isDiamond: true,
    isLightweight: true,
    stones: [
      { type: "Diamond", carat: 1.2, count: 24, cut: "Round Brilliant", clarity: "SI1", color: "H" }
    ],
    makingCharges: "12%",
    certification: "IGI Certified",
  },
  {
    id: "7",
    name: "Ruby Cocktail Ring",
    description: "Show-stopping cocktail ring featuring a large natural ruby surrounded by a halo of brilliant diamonds in 22K gold.",
    price: 165000,
    image: product7,
    images: [product7, product3],
    category: "rings",
    metal: "22K Gold",
    weight: "8.2g",
    goldWeight: "7.5g",
    purity: "916 Hallmark",
    karatage: "22K",
    isBestSeller: true,
    isDiamond: true,
    stones: [
      { type: "Ruby", carat: 3.5, count: 1, cut: "Cushion", clarity: "Eye Clean", color: "Vivid Red" },
      { type: "Diamond", carat: 1.8, count: 28, cut: "Round Brilliant", clarity: "VS2", color: "G" }
    ],
    makingCharges: "15%",
    certification: "GRS & GIA Certified",
  },
  {
    id: "8",
    name: "Gold Charm Bracelet",
    description: "Elegant charm bracelet featuring intricate gold charms with diamond accents. A versatile piece that tells your unique story.",
    price: 78500,
    originalPrice: 89000,
    image: product8,
    images: [product8, product4],
    category: "bangles",
    metal: "22K Gold",
    weight: "15.2g",
    goldWeight: "14.8g",
    purity: "916 Hallmark",
    karatage: "22K",
    isNew: true,
    isLightweight: true,
    isDiamond: true,
    stones: [
      { type: "Diamond", carat: 0.5, count: 10, cut: "Round Brilliant", clarity: "SI1", color: "I" }
    ],
    makingCharges: "18%",
    certification: "BIS Hallmarked",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
