import { Product } from '../lib/types';

export const products: Product[] = [
  // Breads
  {
    id: 'sourdough-loaf',
    name: 'Artisan Sourdough Loaf',
    description: 'Traditional sourdough with a crispy crust and tangy flavor, made with our 100-year-old starter.',
    price: 8.50,
    category: 'bread',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Organic flour', 'Water', 'Sea salt', 'Sourdough starter'],
    allergens: ['Gluten'],
    isSpecial: true,
    specialPrice: 7.50
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    description: 'Hearty whole wheat bread packed with nutrients and fiber.',
    price: 6.00,
    category: 'bread',
    image: 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Whole wheat flour', 'Water', 'Yeast', 'Honey', 'Salt'],
    allergens: ['Gluten']
  },
  {
    id: 'french-baguette',
    name: 'French Baguette',
    description: 'Classic French baguette with a golden crust and airy interior.',
    price: 4.50,
    category: 'bread',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Bread flour', 'Water', 'Yeast', 'Salt'],
    allergens: ['Gluten']
  },

  // Pastries
  {
    id: 'chocolate-croissant',
    name: 'Pain au Chocolat',
    description: 'Buttery, flaky croissant filled with rich dark chocolate.',
    price: 3.75,
    category: 'pastry',
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Butter', 'Flour', 'Dark chocolate', 'Eggs', 'Milk'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    isSpecial: true,
    specialPrice: 3.25
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    description: 'Delicate croissant filled with sweet almond cream and topped with sliced almonds.',
    price: 4.25,
    category: 'pastry',
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Butter', 'Flour', 'Almond cream', 'Sliced almonds', 'Sugar'],
    allergens: ['Gluten', 'Dairy', 'Nuts']
  },
  {
    id: 'danish-pastry',
    name: 'Fruit Danish',
    description: 'Light and flaky Danish pastry topped with seasonal fruit and glaze.',
    price: 3.50,
    category: 'pastry',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Pastry dough', 'Seasonal fruit', 'Cream cheese', 'Sugar glaze'],
    allergens: ['Gluten', 'Dairy', 'Eggs']
  },

  // Cakes
  {
    id: 'chocolate-layer-cake',
    name: 'Triple Chocolate Layer Cake',
    description: 'Decadent three-layer chocolate cake with rich chocolate ganache.',
    price: 45.00,
    category: 'cake',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Dark chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla'],
    allergens: ['Gluten', 'Dairy', 'Eggs']
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Cake',
    description: 'Classic red velvet cake with cream cheese frosting.',
    price: 42.00,
    category: 'cake',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Flour', 'Cocoa powder', 'Red food coloring', 'Cream cheese', 'Butter'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    isSpecial: true,
    specialPrice: 38.00
  },

  // Cookies
  {
    id: 'chocolate-chip-cookies',
    name: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies with a perfect chewy texture.',
    price: 2.50,
    category: 'cookie',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Flour', 'Chocolate chips', 'Butter', 'Brown sugar', 'Eggs'],
    allergens: ['Gluten', 'Dairy', 'Eggs']
  },
  {
    id: 'oatmeal-raisin-cookies',
    name: 'Oatmeal Raisin Cookies',
    description: 'Hearty oatmeal cookies studded with plump raisins.',
    price: 2.25,
    category: 'cookie',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Oats', 'Flour', 'Raisins', 'Butter', 'Cinnamon'],
    allergens: ['Gluten', 'Dairy']
  },

  // Gluten-Free
  {
    id: 'gf-almond-bread',
    name: 'Gluten-Free Almond Bread',
    description: 'Moist and flavorful bread made with almond flour.',
    price: 12.00,
    category: 'gluten-free',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Almond flour', 'Eggs', 'Honey', 'Baking soda', 'Salt'],
    allergens: ['Nuts', 'Eggs']
  },
  {
    id: 'gf-chocolate-muffins',
    name: 'Gluten-Free Chocolate Muffins',
    description: 'Rich chocolate muffins that are completely gluten-free.',
    price: 4.50,
    category: 'gluten-free',
    image: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: ['Rice flour', 'Cocoa powder', 'Chocolate chips', 'Eggs', 'Coconut oil'],
    allergens: ['Eggs']
  }
];

export const getProductsByCategory = (category: Product['category']) => {
  return products.filter(product => product.category === category);
};

export const getSpecialProducts = () => {
  return products.filter(product => product.isSpecial);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};