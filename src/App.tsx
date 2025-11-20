// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ContactPage from './pages/ContactPage'; // <--- IMPORTANTE: Importe o novo componente
import Footer from './components/Footer';
import { usePageFocus } from './usePageFocus';
import LoadingScreen from './components/LoadingScreen';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* --- NOVA ROTA ADICIONADA --- */}
        <Route path="/about/contact" element={<ContactPage />} /> 
        
        <Route path="/games/:gameId/players" element={<GamePlayersPage />} />
      </Routes>

      {!isHomePage && <Footer />}
    </div>
  );
};

function App() {
  usePageFocus('Site Oficial - Tiamat');

  const [isLoading, setIsLoading] = useState(!sessionStorage.getItem('hasVisited'));

  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <CartProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;