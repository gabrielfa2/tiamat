import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import { useCart, Product } from '../contexts/CartContext';

type Rarity = 'legendary' | 'epic' | 'rare' | 'common';

interface ProductStats {
  style: number;
  comfort: number;
  durability: number;
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in a real app, this would come from an API
  const product: Product & { rarity: Rarity; stats: ProductStats } = {
    id: 1,
    name: 'TIAMAT JERSEY 2025',
    price: '€89.99',
    originalPrice: '€99.99',
    image: `${import.meta.env.BASE_URL}dps.png`,
    category: 'jerseys',
    isNew: true,
    isCustomizable: true,
    soldOut: false,
    rarity: 'legendary',
    stats: {
      style: 100,
      comfort: 95,
      durability: 90
    },
    description: 'A nova era da performance chegou. Nosso mais novo uniforme oficial, desenhado para máximo conforto e estilo dentro e fora de jogo. Fabricado com tecnologia de ponta para jogadores profissionais.',
    features: [
      'Tecido respirável de alta performance',
      'Tecnologia anti-suor avançada',
      'Corte ergonômico para máxima mobilidade',
      'Logo bordado em alta qualidade',
      'Certificação oficial Tiamat Esports',
      'Edição limitada 2025'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Azul Tiamat', 'Roxo Dragão', 'Preto Stealth']
  };

  const productImages = [
    `${import.meta.env.BASE_URL}dps.png`,
    `${import.meta.env.BASE_URL}antes.png`,
    `${import.meta.env.BASE_URL}dps.png`,
    `${import.meta.env.BASE_URL}antes.png`
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }
    if (!selectedColor) {
      alert('Por favor, selecione uma cor');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: selectedSize,
        color: selectedColor
      }
    });

    dispatch({ type: 'OPEN_CART' });
  };

  // Helper functions for rarity
  const getRarityClasses = (rarity: Rarity) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/80 shadow-rarity-legendary';
      case 'epic': return 'border-purple-500/80 shadow-rarity-epic';
      case 'rare': return 'border-blue-400/80 shadow-rarity-rare';
      case 'common': return 'border-gray-400/60 shadow-rarity-common';
      default: return 'border-slate-600';
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

  const getRarityGlowClass = (rarity: Rarity) => {
    switch (rarity) {
      case 'legendary': return 'glow-pulse-legendary';
      case 'epic': return 'glow-pulse-epic';
      case 'rare': return 'glow-pulse-rare';
      default: return 'glow-pulse';
    }
  };

  const getRarityFillColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'legendary': return { fill: '#fbbf24', fillLight: '#fde047' };
      case 'epic': return { fill: '#a855f7', fillLight: '#c084fc' };
      case 'rare': return { fill: '#60a5fa', fillLight: '#93c5fd' };
      case 'common': return { fill: '#9ca3af', fillLight: '#d1d5db' };
      default: return { fill: '#a855f7', fillLight: '#c084fc' };
    }
  };

  const rarityColors = getRarityFillColor(product.rarity);

  return (
    <div className="pt-12 pb-12 tech-grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors font-mono text-sm uppercase"
        >
          <ArrowLeft className="h-4 w-4" />
          // BACK TO INVENTORY
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images - Inspection View */}
          <div className="space-y-4">
            {/* Main Image with Rarity Glow */}
            <div className={`
              aspect-square clip-chamfer-lg overflow-hidden 
              bg-slate-900/80 border-4 
              ${getRarityClasses(product.rarity)}
              relative
            `}>
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Rarity Corner Accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${getRarityColor(product.rarity).replace('text', 'bg')} opacity-20`}
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              ></div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    aspect-square clip-chamfer overflow-hidden border-2 transition-all
                    ${selectedImage === index
                      ? `${getRarityClasses(product.rarity)}`
                      : 'border-slate-700/50 hover:border-slate-600 bg-slate-900/60'
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Panel - Floating Glass */}
          <div className="space-y-6">
            {/* Info Container */}
            <div className="glass-darker clip-chamfer-lg p-6 border-l-4" style={{ borderLeftColor: rarityColors.fill }}>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-purple-600/90 text-white px-3 py-1 text-xs font-bold clip-chamfer backdrop-blur-sm uppercase">
                    NEW
                  </span>
                )}
                {product.isCustomizable && (
                  <span className="bg-blue-600/90 text-white px-3 py-1 text-xs font-bold clip-chamfer backdrop-blur-sm uppercase">
                    CUSTOMIZABLE
                  </span>
                )}
                <span className={`${getRarityColor(product.rarity).replace('text', 'bg')}/90 text-white px-3 py-1 text-xs font-bold clip-chamfer backdrop-blur-sm uppercase`}>
                  {product.rarity}
                </span>
              </div>

              {/* Title and Price */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">{product.name}</h1>
                <div className="flex items-center gap-4 mb-3">
                  <span className={`text-3xl font-bold credits-display ${getRarityColor(product.rarity)}`}>
                    {product.price.replace('€', '')} CR
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through font-mono">
                      {product.originalPrice.replace('€', '')} CR
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm font-mono">(127 reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">{product.description}</p>

              {/* Stats Bars - Gamified */}
              <div className="mb-6 p-4 bg-slate-900/60 clip-chamfer border border-slate-700/50">
                <h3 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">// ITEM STATS</h3>
                <div className="space-y-3">
                  {/* Style Stat */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 font-mono text-xs uppercase">Style</span>
                      <span className={`font-mono text-xs font-bold ${getRarityColor(product.rarity)}`}>
                        {product.stats.style}%
                      </span>
                    </div>
                    <div className="stat-bar clip-chamfer">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${product.stats.style}%`,
                          '--fill-color': rarityColors.fill,
                          '--fill-color-light': rarityColors.fillLight
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>

                  {/* Comfort Stat */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 font-mono text-xs uppercase">Comfort</span>
                      <span className={`font-mono text-xs font-bold ${getRarityColor(product.rarity)}`}>
                        {product.stats.comfort}%
                      </span>
                    </div>
                    <div className="stat-bar clip-chamfer">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${product.stats.comfort}%`,
                          '--fill-color': rarityColors.fill,
                          '--fill-color-light': rarityColors.fillLight
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>

                  {/* Durability Stat */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 font-mono text-xs uppercase">Durability</span>
                      <span className={`font-mono text-xs font-bold ${getRarityColor(product.rarity)}`}>
                        {product.stats.durability}%
                      </span>
                    </div>
                    <div className="stat-bar clip-chamfer">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${product.stats.durability}%`,
                          '--fill-color': rarityColors.fill,
                          '--fill-color-light': rarityColors.fillLight
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Size:</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        py-2 px-3 border-2 clip-chamfer font-bold transition-all text-sm
                        ${selectedSize === size
                          ? `${getRarityClasses(product.rarity)} text-white`
                          : 'border-slate-600/50 text-gray-300 hover:border-slate-500 bg-slate-900/40'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Color:</h3>
                <div className="space-y-2">
                  {product.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        w-full py-3 px-4 border-2 clip-chamfer font-bold transition-all text-left text-sm
                        ${selectedColor === color
                          ? `${getRarityClasses(product.rarity)} text-white`
                          : 'border-slate-600/50 text-gray-300 hover:border-slate-500 bg-slate-900/40'
                        }
                      `}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equip Button */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className={`
                    flex-1 equip-btn clip-chamfer-lg text-white py-4 font-bold 
                    transition-all text-lg tracking-widest
                    bg-gradient-to-r from-purple-600 to-blue-600 
                    hover:from-purple-500 hover:to-blue-500
                    border-2 ${getRarityClasses(product.rarity)}
                    ${getRarityGlowClass(product.rarity)}
                  `}
                >
                  EQUIP NOW
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`
                    p-4 border-2 clip-chamfer transition-all
                    ${isWishlisted
                      ? 'border-red-500 bg-red-600/50 text-white shadow-rarity-epic'
                      : 'border-slate-600/50 text-gray-300 hover:border-slate-500 bg-slate-900/40'
                    }
                  `}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="bg-slate-900/60 clip-chamfer p-4 border border-slate-700/50 mb-4">
                <h3 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">// FEATURES</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2 text-sm">
                      <span className={`${getRarityColor(product.rarity)} mt-1 font-mono`}>▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/60 p-3 clip-chamfer border border-slate-700/50">
                  <Truck className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="font-bold text-white text-xs">Frete Grátis</p>
                    <p className="text-xs font-mono">Acima de €50</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/60 p-3 clip-chamfer border border-slate-700/50">
                  <RotateCcw className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="font-bold text-white text-xs">Troca Grátis</p>
                    <p className="text-xs font-mono">30 dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/60 p-3 clip-chamfer border border-slate-700/50">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="font-bold text-white text-xs">Garantia</p>
                    <p className="text-xs font-mono">1 ano</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;