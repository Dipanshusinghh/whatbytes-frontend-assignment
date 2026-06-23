"use client";

import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';

export function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex items-center border-2 border-gray-200 hover:border-gray-300 rounded-full h-14 w-full sm:w-40 bg-white transition-colors">
        <button 
          onClick={handleDecrease}
          className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-l-full transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center font-bold text-gray-900 text-lg">
          {quantity}
        </div>
        <button 
          onClick={handleIncrease}
          className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-r-full transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <button 
        onClick={handleAddToCart}
        className="h-14 flex-1 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
}
