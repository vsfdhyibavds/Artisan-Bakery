import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Info, Heart, Leaf } from 'lucide-react';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1 }}
        className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={() => setShowDetails(true)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isSpecial && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Special
              </span>
            )}
            {product.category === 'gluten-free' && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                GF
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
              className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Allergens */}
          {product.allergens.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.allergens.slice(0, 3).map((allergen) => (
                <span
                  key={allergen}
                  className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded"
                >
                  {allergen}
                </span>
              ))}
              {product.allergens.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.allergens.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.specialPrice ? (
                <>
                  <span className="text-lg font-bold text-accent-600 dark:text-accent-400">
                    {formatPrice(product.specialPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Details Modal */}
      {showDetails && (
        <ProductDetailsModal
          product={product}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

// Product Details Modal Component
interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2">
                {product.specialPrice ? (
                  <>
                    <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                      {formatPrice(product.specialPrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {product.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Ingredients
              </h3>
              <ul className="space-y-1">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                    • {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Allergen Information
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}