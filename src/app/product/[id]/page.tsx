import React from 'react';
import { getProductById } from '@/data/products';
import { notFound } from 'next/navigation';
import { Star, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { AddToCartSection } from './AddToCartSection';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to products
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 p-8 lg:p-12 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full max-w-lg object-contain rounded-2xl shadow-md mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 lg:p-16 flex flex-col bg-gray-50/30">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-sm text-gray-500 font-semibold tracking-wide">
                {product.brand}
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1.5 text-gray-700 font-bold text-lg">{product.rating}</span>
              </div>
              <div className="h-5 w-px bg-gray-300"></div>
              <span className="text-gray-500 font-medium">128 Reviews</span>
            </div>

            <p className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tight">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-auto">
              <AddToCartSection product={product} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200">
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">Free shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">30-day returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">2 year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
