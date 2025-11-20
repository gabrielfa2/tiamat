// Arquivo: src/components/CollectionsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- PASSO 1: Hook Customizado para Animação de Scroll ---
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
      {
        threshold: 0.1,
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
interface CollectionCardProps {
  collection: {
    title: string;
    image: string;
    videoUrl: string; // <--- Novo campo para a URL do vídeo
    gradient: string;
    colSpan: string;
  };
  index: number;
  onCollectionClick?: (title: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, index, onCollectionClick }) => {
  const [ref, isVisible] = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null); // Referência para controlar o vídeo

  const isLeft = index === 0 || index === 2;

  const animationClasses = isVisible
    ? 'opacity-100 translate-x-0'
    : `opacity-0 ${isLeft ? '-translate-x-16' : 'translate-x-16'}`;

  const handleClick = () => {
    if (onCollectionClick) {
      onCollectionClick(collection.title);
    }
  };

  // Handlers para Hover
  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Tenta reproduzir o vídeo. O catch previne erros se o usuário passar o mouse muito rápido
      videoRef.current.play().catch((e) => console.log("Video play interrupted", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reseta para o frame inicial
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter} // Ativa o vídeo
      onMouseLeave={handleMouseLeave} // Reseta o vídeo
      className={`group cursor-pointer ${collection.colSpan} h-96 transform transition-all duration-700 ease-out ${animationClasses}`}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900">
        
        {/* --- CAMADA 1: VÍDEO (Aparece no Hover) --- */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <video
            ref={videoRef}
            src={collection.videoUrl}
            className="w-full h-full object-cover"
            loop
            muted // Obrigatório para autoplay funcionar sem interação explícita de clique
            playsInline
          />
          {/* Overlay leve sobre o vídeo para garantir leitura do texto */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* --- CAMADA 2: IMAGEM ESTÁTICA (Fundo Padrão) --- */}
        {/* A imagem fica por baixo e o vídeo aparece por cima com fade-in */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`}></div>
          <div className="absolute inset-0">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300"></div>
        </div>

        {/* --- CAMADA 3: TEXTO (Sempre no topo z-20) --- */}
        <div className="absolute bottom-6 left-6 z-20">
          <h3 className="text-white text-2xl font-bold drop-shadow-lg">{collection.title}</h3>
        </div>
      </div>
    </div>
  );
};

// --- PASSO 3: Componente Principal da Seção ---
const CollectionsSection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: 'GAMES',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
      // 👇 COLE O LINK PÚBLICO DO SEU VÍDEO AQUI
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/gamespronto.mp4', 
      gradient: 'from-purple-600 to-pink-500',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'RANKING',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      // 👇 COLE O LINK PÚBLICO DO SEU VÍDEO AQUI
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/video.mp4', 
      gradient: 'from-blue-600 to-purple-600',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'HIGHLIGHTS',
      image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      // 👇 COLE O LINK PÚBLICO DO SEU VÍDEO AQUI
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/video.mp4', 
      gradient: 'from-indigo-600 to-purple-500',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'LAST TOUR',
      image: 'https://images.pexels.com/photos/3757955/pexels-photo-3757955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      // 👇 COLE O LINK PÚBLICO DO SEU VÍDEO AQUI
      videoUrl: 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/video.mp4', 
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
        <h2 className="text-3xl font-bold text-white mb-8">COLLECTIONS</h2>
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