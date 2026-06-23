"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SidebarProps {
  categories: string[];
}

export function Sidebar({ categories }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category');
  const currentPrice = searchParams.get('price');

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8 pr-0 lg:pr-6">
      {/* Categories */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Categories</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={!currentCategory}
              onChange={() => updateFilters('category', null)}
            />
            <span className={`text-sm transition-colors ${!currentCategory ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              All Categories
            </span>
          </label>
          
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={currentCategory === category}
                onChange={() => updateFilters('category', category)}
              />
              <span className={`text-sm transition-colors ${currentCategory === category ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Price Range</h3>
        <div className="space-y-3">
          {[
            { label: 'All Prices', value: null },
            { label: 'Under $50', value: '0-50' },
            { label: '$50 to $100', value: '50-100' },
            { label: '$100 to $200', value: '100-200' },
            { label: 'Over $200', value: '200-9999' },
          ].map((range) => (
            <label key={range.label} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={currentPrice === range.value || (!currentPrice && !range.value)}
                onChange={() => updateFilters('price', range.value)}
              />
              <span className={`text-sm transition-colors ${currentPrice === range.value || (!currentPrice && !range.value) ? 'text-blue-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
