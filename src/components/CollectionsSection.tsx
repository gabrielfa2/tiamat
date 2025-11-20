// Arquivo: src/components/CollectionsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- PASSO 1: Hook Customizado para Animação de Scroll ---
// Este hook observa um elemento e nos diz quando ele está visível na tela.
const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o elemento está visível, atualizamos o estado
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Para a animação não repetir, paramos de observar o elemento
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // A animação começa quando 10% do item está visível
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};


// --- PASSO 2: Componente do Card Individual ---
// Criamos um componente para cada card para que cada um possa ter seu próprio estado de animação.
interface CollectionCardProps {
  collection: {
    title: string;
    image: string;
    gradient: string;
    colSpan: string;
  };
  index: number;
  onGamesClick?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, index, onGamesClick }) => {
  const [ref, isVisible] = useScrollAnimation();

  // Define a direção da animação com base no índice (par ou ímpar)
  // Itens 0 e 2 (esquerda) virão da esquerda. Itens 1 e 3 (direita) virão da direita.
  const isLeft = index === 0 || index === 2;

  const animationClasses = isVisible
    ? 'opacity-100 translate-x-0' // Estado final: visível e na posição original
    : `opacity-0 ${isLeft ? '-translate-x-16' : 'translate-x-16'}`; // Estado inicial: invisível e deslocado

  const handleClick = () => {
    if (collection.title === 'GAMES' && onGamesClick) {
      onGamesClick();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`group cursor-pointer ${collection.colSpan} h-96 transform transition-all duration-700 ease-out ${animationClasses}`}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`}></div>
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300"></div>
        <div className="absolute bottom-6 left-6">
          <h3 className="text-white text-2xl font-bold">{collection.title}</h3>
        </div>
      </div>
    </div>
  );
};


// --- PASSO 3: Componente Principal da Seção (Atualizado) ---
// Agora a seção principal apenas monta o layout e usa o novo CollectionCard.
const CollectionsSection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: 'GAMES',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-purple-600 to-pink-500',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'RANKING',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'from-blue-600 to-purple-600',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'HIGHLIGHTS',
      image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'from-indigo-600 to-purple-500',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'LAST TOUR',
      image: 'https://images.pexels.com/photos/3757955/pexels-photo-3757955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gradient: 'from-red-500 to-orange-500',
      colSpan: 'md:col-span-1',
    }
  ];

  const handleGamesClick = () => {
    navigate('/games');
  };

  return (
    <section className="py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">COLLECTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={index}
              collection={collection}
              index={index}
              onGamesClick={handleGamesClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;