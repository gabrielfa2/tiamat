import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'TIAMAT JERSEY 2025',
      price: '€89.99',
      originalPrice: '€99.99',
      image: `${import.meta.env.BASE_URL}dps.png`,
      category: 'jerseys',
      isNew: true,
      isCustomizable: true,
      soldOut: false
    },
    {
      id: 2,
      name: 'TIAMAT HOODIE',
      price: '€69.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'lifestyle',
      isNew: false,
      isCustomizable: false,
      soldOut: true
    },
    {
      id: 3,
      name: 'TIAMAT CAP',
      price: '€29.99',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: false,
      isCustomizable: true,
      soldOut: true
    },
    {
      id: 4,
      name: 'TIAMAT MOUSEPAD',
      price: '€24.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: true,
      isCustomizable: false,
      soldOut: true
    },
    {
      id: 5,
      name: 'TIAMAT JACKET',
      price: '€89.99',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'lifestyle',
      isNew: false,
      isCustomizable: false,
      soldOut: true
    },
    {
      id: 6,
      name: 'TIAMAT BACKPACK',
      price: '€59.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: false,
      isCustomizable: false,
      soldOut: true
    }
  ];

  const categories = [
    { id: 'all', name: 'ALL PRODUCTS' },
    { id: 'jerseys', name: 'JERSEYS' },
    { id: 'lifestyle', name: 'LIFESTYLE' },
    { id: 'accessories', name: 'ACCESSORIES' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">ALL PRODUCTS</h1>
          <p className="text-gray-300">Discover our complete collection of Tiamat merchandise</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-purple-400' : 'text-gray-400'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-purple-400' : 'text-gray-400'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <span className="text-gray-400">{filteredProducts.length} products</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
          }`}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-purple-600 text-white px-2 py-1 text-xs font-bold">NEW</span>
                  )}
                  {product.isCustomizable && (
                    <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold">CUSTOMIZABLE</span>
                  )}
                </div>

                {/* Sold Out Overlay */}
                {product.soldOut && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 font-bold">SOLD OUT</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-white font-bold mb-2">{product.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-purple-400 font-bold">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="border-2 border-purple-600 text-white px-8 py-3 font-bold hover:bg-purple-600 transition-colors">
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;