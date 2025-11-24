import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import { useCart, Product } from '../contexts/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in a real app, this would come from an API
  const product: Product = {
    id: 1,
    name: 'TIAMAT JERSEY 2025',
    price: '€89.99',
    originalPrice: '€99.99',
    image: `${import.meta.env.BASE_URL}dps.png`,
    category: 'jerseys',
    isNew: true,
    isCustomizable: true,
    soldOut: false,
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

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar aos Produtos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-purple-500' : 'border-slate-700 hover:border-slate-600'
                    }`}
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

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <span className="bg-purple-600 text-white px-3 py-1 text-sm font-bold rounded">NEW</span>
              )}
              {product.isCustomizable && (
                <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded">CUSTOMIZABLE</span>
              )}
            </div>

            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-purple-400">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                )}
                <span className="text-green-400 font-bold">10% OFF</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400">(127 avaliações)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-bold mb-3">Tamanho:</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border rounded font-bold transition-colors ${selectedSize === size
                        ? 'border-purple-500 bg-purple-600 text-white'
                        : 'border-slate-600 text-gray-300 hover:border-slate-500'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-bold mb-3">Cor:</h3>
              <div className="space-y-2">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full py-3 px-4 border rounded font-bold transition-colors text-left ${selectedColor === color
                        ? 'border-purple-500 bg-purple-600 text-white'
                        : 'border-slate-600 text-gray-300 hover:border-slate-500'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 font-bold rounded hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                ADICIONAR AO CARRINHO
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 border rounded transition-colors ${isWishlisted
                    ? 'border-red-500 bg-red-600 text-white'
                    : 'border-slate-600 text-gray-300 hover:border-slate-500'
                  }`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Características:</h3>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-bold text-white">Frete Grátis</p>
                  <p className="text-sm">Acima de €50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RotateCcw className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-bold text-white">Troca Grátis</p>
                  <p className="text-sm">30 dias</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-bold text-white">Garantia</p>
                  <p className="text-sm">1 ano</p>
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