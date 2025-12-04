import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Grid, List } from 'lucide-react';

// Rarity type definition
type Rarity = 'legendary' | 'epic' | 'rare' | 'common';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  isNew: boolean;
  isCustomizable: boolean;
  soldOut: boolean;
  rarity: Rarity;
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'TIAMAT JERSEY 2025',
      price: '89.99',
      originalPrice: '99.99',
      image: `${import.meta.env.BASE_URL}dps.png`,
      category: 'jerseys',
      isNew: true,
      isCustomizable: true,
      soldOut: false,
      rarity: 'legendary'
    },
    {
      id: 2,
      name: 'TIAMAT HOODIE',
      price: '69.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'lifestyle',
      isNew: false,
      isCustomizable: false,
      soldOut: true,
      rarity: 'epic'
    },
    {
      id: 3,
      name: 'TIAMAT CAP',
      price: '29.99',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: false,
      isCustomizable: true,
      soldOut: true,
      rarity: 'rare'
    },
    {
      id: 4,
      name: 'TIAMAT MOUSEPAD',
      price: '24.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: true,
      isCustomizable: false,
      soldOut: true,
      rarity: 'common'
    },
    {
      id: 5,
      name: 'TIAMAT JACKET',
      price: '89.99',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'lifestyle',
      isNew: false,
      isCustomizable: false,
      soldOut: true,
      rarity: 'epic'
    },
    {
      id: 6,
      name: 'TIAMAT BACKPACK',
      price: '59.99',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      isNew: false,
      isCustomizable: false,
      soldOut: true,
      rarity: 'rare'
    }
  ];

  const categories = [
    { id: 'all', name: 'ALL GEAR' },
    { id: 'jerseys', name: 'ARMOR' },
    { id: 'lifestyle', name: 'APPAREL' },
    { id: 'accessories', name: 'EQUIPMENT' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Helper function to get rarity-specific classes
  const getRarityClasses = (rarity: Rarity) => {
    const baseClasses = 'border-2 transition-all duration-300';
    switch (rarity) {
      case 'legendary':
        return `${baseClasses} border-yellow-400/60 hover-glow-legendary`;
      case 'epic':
        return `${baseClasses} border-purple-500/60 hover-glow-epic`;
      case 'rare':
        return `${baseClasses} border-blue-400/60 hover-glow-rare`;
      case 'common':
        return `${baseClasses} border-gray-400/40 hover-glow-common`;
      default:
        return baseClasses;
    }
  };

  const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      case 'common': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="pt-12 pb-12 tech-grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-wider">INVENTORY</h1>
          <p className="text-purple-300 font-mono text-sm">// TIAMAT ESPORTS GEAR</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Categories - Game Style Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`game-tab clip-chamfer ${selectedCategory === category.id ? 'active' : ''
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass-dark px-3 py-2 clip-chamfer">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <span className="text-gray-400 font-mono text-sm">{filteredProducts.length} ITEMS</span>
          </div>
        </div>

        {/* Products Grid - Inventory Style */}
        <div className={`grid gap-4 ${viewMode === 'grid'
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            : 'grid-cols-1'
          }`}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {/* Inventory Cell Card */}
              <div className={`
                inventory-cell clip-chamfer overflow-hidden
                ${getRarityClasses(product.rarity)}
                p-3
              `}>
                {/* Item Image Container */}
                <div className="relative aspect-square mb-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-purple-600/90 text-white px-2 py-0.5 text-xs font-bold clip-chamfer backdrop-blur-sm">
                        NEW
                      </span>
                    )}
                    {product.isCustomizable && (
                      <span className="bg-blue-600/90 text-white px-2 py-0.5 text-xs font-bold clip-chamfer backdrop-blur-sm">
                        CUSTOM
                      </span>
                    )}
                  </div>

                  {/* Sold Out Overlay */}
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 font-bold clip-chamfer text-xs">
                        SOLD OUT
                      </span>
                    </div>
                  )}

                  {/* Rarity Badge */}
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getRarityColor(product.rarity)}`}>
                    <div className={`w-full h-full rounded-full ${getRarityColor(product.rarity).replace('text', 'bg')} opacity-80`}></div>
                  </div>
                </div>

                {/* Item Info */}
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide leading-tight line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price Display - Credits Style */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`credits-display ${getRarityColor(product.rarity)} text-lg`}>
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-xs font-mono">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs font-mono">CR</span>
                  </div>

                  {/* Inspect Button */}
                  <button
                    className="inspect-btn w-full clip-chamfer text-xs py-2 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    <Eye className="h-3 w-3" />
                    INSPECT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="glass-dark clip-chamfer border-2 border-purple-600/50 text-white px-8 py-3 font-bold hover:border-purple-400 hover:bg-purple-600/20 transition-all uppercase tracking-wider">
            LOAD MORE GEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;