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
import LoginPage from './pages/LoginPage
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { usePageFocus } from './usePageFocus';
import LoadingScreen from './components/LoadingScreen';

/**
 * Componente de Layout Principal
 * * Este componente interno foi criado para que possamos usar o hook useLocation()
 * e exibir/ocultar o Footer com base na rota atual.
 */
const MainLayout = () => {
  const location = useLocation();
  
  // A HomePage (path "/") é a única que não deve exibir este Footer,
  // pois ela já renderiza o seu próprio.
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
        <Route path="/games/:gameId/players" element={<GamePlayersPage />} 
        <Route path="/about/contact" element={<ContactPage />} />
      </Routes>

      {/* Footer é renderizado em todas as páginas, exceto a Home */}
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

  // Se estiver carregando, exibe a tela de introdução
  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  // O restante do seu código permanece igual
  return (
    <CartProvider>
      {/* MUDANÇA 1: O 'basename' agora é dinâmico.
        Ele usará "/" no Bolt.new (dev) e "/tiamat/" no build (produção),
        graças à configuração que fizemos no vite.config.ts.
      */}
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* MUDANÇA 2: Todas as outras rotas agora são gerenciadas
            pelo componente MainLayout.
          */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;