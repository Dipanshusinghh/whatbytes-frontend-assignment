import React, { Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, getCategories } from '@/data/products';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = params.category as string;
  const price = params.price as string;
  const search = params.search as string;

  const allProducts = getProducts();
  const categories = getCategories();

  // Filter products
  let filteredProducts = allProducts;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (price) {
    const [min, max] = price.split('-').map(Number);
    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(lowerSearch) || 
      p.description.toLowerCase().includes(lowerSearch)
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={
          <div className="w-full lg:w-64 space-y-8 pr-0 lg:pr-6 shrink-0">
            <div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
            <div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
          </div>
        }>
          <Sidebar categories={categories} />
        </Suspense>

        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {search ? `Search results for "${search}"` : 'All Products'}
            </h1>
            <span className="text-sm font-medium px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600">
              Showing {filteredProducts.length} results
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find anything matching your current filters. Try adjusting your search or category selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
