"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  const taxRate = 0.08; // 8% tax
  const tax = cartTotal * taxRate;
  const total = cartTotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-gray-100">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center text-lg">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you love!
        </p>
        <Link 
          href="/" 
          className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center"></div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center group">
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-6">
                    <Link href={`/product/${item.id}`} className="shrink-0 relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                        {item.category}
                      </span>
                      <Link href={`/product/${item.id}`} className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <span className="text-gray-500 font-medium mt-1">${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center">
                    <div className="flex items-center border-2 border-gray-100 rounded-full bg-white h-12 w-32 hover:border-gray-200 transition-colors">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors rounded-l-full"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors rounded-r-full"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="col-span-1 sm:col-span-2 sm:text-right font-black text-gray-900 text-xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Action */}
                  <div className="col-span-1 flex sm:justify-center mt-2 sm:mt-0">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2 sm:block"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="sm:hidden text-sm font-medium text-red-600">Remove Item</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Shipping</span>
                <span className="font-bold text-green-600 uppercase text-sm tracking-wider flex items-center">Free</span>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-50 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-4 font-bold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-xs text-gray-400 mt-6 font-medium uppercase tracking-wider">
              Secure checkout guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
