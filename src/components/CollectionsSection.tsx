// Arquivo: src/components/CollectionsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Hook de Animação de Scroll (Mantido) ---
const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible] as const;
};

// --- Componente do Card Individual ---
interface CollectionCardProps {
  collection: {
    title: string;
    // image: string; // <-- Removido, não precisamos mais
    videoUrl: string;
    gradient: string;
    colSpan: string;
  };
  index: number;
  onCollectionClick?: (title: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, index, onCollectionClick }) => {
  const [ref, isVisible] = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const isLeft = index === 0 || index === 2;
  const animationClasses = isVisible
    ? 'opacity-100 translate-x-0'
    : `opacity-0 ${isLeft ? '-translate-x-16' : 'translate-x-16'}`;

  const handleClick = () => {
    if (onCollectionClick) {
      onCollectionClick(collection.title);
    }
  };

  // Ao passar o mouse: Toca o vídeo
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Video play interrupted", e));
    }
  };

  // Ao tirar o mouse: Pausa e volta para o frame 0 (virando uma imagem estática de novo)
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reseta para o primeiro frame
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer ${collection.colSpan} h-96 transform transition-all duration-700 ease-out ${animationClasses}`}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900">
        
        {/* --- VÍDEO (Atua como imagem de fundo quando pausado) --- */}
        <video
          ref={videoRef}
          src={collection.videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto" // Importante para carregar o primeiro frame imediatamente
        />

        {/* --- CAMADA DE ESTILO E GRADIENTE --- */}
        {/* Esta camada fica por cima do vídeo para dar o efeito de cor (gradient).
            No hover (group-hover), a opacidade vai a 0, mostrando o vídeo original limpo.
        */}
        <div className={`
          absolute inset-0 
          bg-gradient-to-br ${collection.gradient} 
          mix-blend-multiply 
          opacity-80 group-hover:opacity-0 
          transition-opacity duration-500 
          pointer-events-none
        `}></div>

        {/* Camada escura extra para legibilidade do texto (opcional) */}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500 pointer-events-none"></div>

        {/* --- TEXTO --- */}
        <div className="absolute bottom-6 left-6 z-20">
          <h3 className="text-white text-2xl font-bold drop-shadow-lg">{collection.title}</h3>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal da Seção ---
const CollectionsSection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: 'GAMES',
      // Usei o mesmo link de exemplo para todos, mas você deve substituir pelos seus específicos
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/gamespronto.mp4', 
      gradient: 'from-purple-600 to-pink-500',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'RANKING',
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/agrsimrankingpronoto.mp4',
      gradient: 'from-blue-600 to-purple-600',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'HIGHLIGHTS',
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/highliught.mp4',
      gradient: 'from-indigo-600 to-purple-500',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'LAST TOUR',
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/lasttour.mp4',
      gradient: 'from-red-500 to-orange-500',
      colSpan: 'md:col-span-1',
    }
  ];

  const handleCollectionClick = (title: string) => {
    switch (title) {
      case 'GAMES':
        navigate('/games');
        break;
      case 'RANKING':
        navigate('/ranking');
        break;
      case 'HIGHLIGHTS':
        navigate('/highlights');
        break;
      case 'LAST TOUR':
        navigate('/last-tour');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8"></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={index}
              collection={collection}
              index={index}
              onCollectionClick={handleCollectionClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;