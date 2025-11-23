// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GamesPage from './pages/GamesPage';
import AboutPage from './pages/AboutPage';
import GamePlayersPage from './pages/GamePlayersPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { usePageFocus } from './usePageFocus';
import LoadingScreen from './components/LoadingScreen';
import RecruitmentPage from './pages/RecruitmentPage';
import RankingPage from './pages/RankingPage';
import HighlightsPage from './pages/HighlightsPage';
import LastTourPage from './pages/LastTourPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

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
        <Route path="/about/contact" element={<ContactPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/games/:gameId/players" element={<GamePlayersPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/highlights" element={<HighlightsPage />} />
        <Route path="/last-tour" element={<LastTourPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
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
    <AuthProvider>
      <CartProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;