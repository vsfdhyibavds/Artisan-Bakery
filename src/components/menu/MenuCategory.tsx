import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../lib/types';
import ProductCard from './ProductCard';

interface MenuCategoryProps {
  title: string;
  products: Product[];
  categoryId: string;
}

export default function MenuCategory({ title, products, categoryId }: MenuCategoryProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      id={categoryId}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}