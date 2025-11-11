// src/components/LoadingScreen.tsx

import React, { useState, useEffect } from 'react';

const videoUrl = 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/intro.mp4';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  // Estado para controlar o início do fade-out
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Função para ser chamada quando o vídeo terminar
  const handleVideoEnd = () => {
    // Inicia a animação de desaparecimento
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      // Espera a animação de 1 segundo terminar antes de remover o componente
      const timer = setTimeout(() => {
        onFinished();
      }, 1000); // Duração da transição do CSS

      return () => clearTimeout(timer);
    }
  }, [isFadingOut, onFinished]);

  return (
    // A classe 'fading-out' será adicionada para iniciar a transição
    <div className={`loading-screen ${isFadingOut ? 'fading-out' : ''}`}>
      <video
        className="loading-video"
        src={videoUrl}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default LoadingScreen;