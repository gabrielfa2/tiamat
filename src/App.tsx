// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GamesPage from './pages/GamesPage';
import AboutPage from './pages/AboutPage';
import GamePlayersPage from './pages/GamePlayersPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import { usePageFocus } from './usePageFocus';
import LoadingScreen from './components/LoadingScreen'; // Importe o novo componente

function App() {
  usePageFocus('Site Oficial - Tiamat');

  // --- ALTERAÇÃO 1: Controle do estado de carregamento ---
  const [isLoading, setIsLoading] = useState(!sessionStorage.getItem('hasVisited'));

  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, [isLoading]);

  // Se estiver carregando, exibe a tela de introduçã
  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  // --- O restante do seu código permanece igual ---
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <div className="min-h-screen bg-slate-900">
              <Header />
              <Cart />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/games/:gameId/players" element={<GamePlayersPage />} />
              </Routes>
              {/* Footer para todas as páginas exceto HomePage */}
              {window.location.pathname !== '/' && <Footer />}
            </div>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;