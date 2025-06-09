import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const itemCount = useCartStore(state => state.getItemCount());

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}