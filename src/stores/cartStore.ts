import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: any;
  type?: 'product' | 'custom_cake';
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: (deliveryFee?: number) => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => 
          item.id === newItem.id && 
          JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === existingItem.id && 
              JSON.stringify(item.customizations) === JSON.stringify(existingItem.customizations)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }]
          });
        }

        toast.success(`${newItem.name} added to cart`);
      },

      removeItem: (id) => {
        const { items } = get();
        const item = items.find(item => item.id === id);
        
        set({
          items: items.filter(item => item.id !== id)
        });

        if (item) {
          toast.success(`${item.name} removed from cart`);
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax
      },

      getTotal: (deliveryFee = 0) => {
        return get().getSubtotal() + get().getTax() + deliveryFee;
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'bakery-cart',
    }
  )
);