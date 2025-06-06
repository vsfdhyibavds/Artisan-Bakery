export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bread' | 'pastry' | 'cake' | 'cookie' | 'gluten-free';
  image: string;
  ingredients: string[];
  allergens: string[];
  isSpecial?: boolean;
  specialPrice?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}