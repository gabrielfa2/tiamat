import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              CARRINHO ({getTotalItems()})
            </h2>
            <button
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Seu carrinho está vazio</p>
                <p className="text-sm mt-2">Adicione alguns produtos incríveis!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-sm">{item.name}</h3>
                        <p className="text-purple-400 font-bold">{item.price}</p>
                        {item.selectedSize && (
                          <p className="text-gray-400 text-xs">Tamanho: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-gray-400 text-xs">Cor: {item.selectedColor}</p>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { id: item.id, quantity: item.quantity - 1 }
                            })}
                            className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center hover:bg-slate-600 transition-colors"
                          >
                            <Minus className="h-4 w-4 text-white" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { id: item.id, quantity: item.quantity + 1 }
                            })}
                            className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center hover:bg-slate-600 transition-colors"
                          >
                            <Plus className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-slate-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-bold text-lg">Total:</span>
                <span className="text-purple-400 font-bold text-xl">€{getTotalPrice()}</span>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 font-bold rounded hover:from-purple-700 hover:to-blue-700 transition-colors">
                  FINALIZAR COMPRA
                </button>
                <button 
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="w-full border border-slate-600 text-gray-300 py-2 font-bold rounded hover:bg-slate-800 transition-colors"
                >
                  LIMPAR CARRINHO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;