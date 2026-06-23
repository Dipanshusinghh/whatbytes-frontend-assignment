"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';

export function Header() {
  const { cartCount } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Sync search input with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
            W
          </div>
          <span className="font-bold text-xl hidden sm:block">Whatbytes</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button type="submit" className="absolute left-3">
              <Search className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <User className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
