import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CheckCircle2, Copy, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [orderTotal, setOrderTotal] = useState('0.00');
  const [orderItemCount, setOrderItemCount] = useState(0);

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Gera ID de pedido aleatório com 15 caracteres alfanuméricos
  const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Função de checkout
  const handleCheckout = () => {
    // Salva os valores ANTES de limpar o carrinho
    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    setOrderTotal(totalPrice);
    setOrderItemCount(totalItems);

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setShowSuccessModal(true);

    // Limpa o carrinho após 500ms (para dar tempo da animação)
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
    }, 500);
  };

  // Copia o ID do pedido
  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Fecha o modal de sucesso
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    dispatch({ type: 'CLOSE_CART' });
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[70]"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 z-[70] transform transition-transform duration-300 ease-in-out">
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
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 font-bold rounded hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
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

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-70 z-[80] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h2>
                <p className="text-green-50 text-sm">Your order has been confirmed</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Order ID Section */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
                  <p className="text-gray-600 text-sm font-medium mb-2 text-center">Order ID</p>
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <code className="text-lg font-mono font-bold text-gray-800 tracking-wider">
                      {orderId}
                    </code>
                    <button
                      onClick={handleCopyOrderId}
                      className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy Order ID"
                    >
                      {isCopied ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Total Items</span>
                    <span className="font-bold text-gray-800">{orderItemCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Total Amount</span>
                    <span className="font-bold text-gray-800">€{orderTotal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 text-sm">Payment Status</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      Paid
                    </span>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm text-center">
                    <strong>Thank you for your purchase!</strong><br />
                    A confirmation email has been sent to your registered email address.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleCloseSuccessModal}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleCloseSuccessModal}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;