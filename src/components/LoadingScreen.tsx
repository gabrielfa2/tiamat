// src/components/LoadingScreen.tsx

import React, { useState, useEffect } from 'react';

const videoUrl = 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/intro.mp4';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Função unificada para encerrar o loading
  const finishLoading = () => {
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        onFinished();
      }, 1000); // Tempo da animação de fade-out
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, onFinished]);

  // Válvula de Segurança: Se o vídeo travar, libera o site em 6 segundos no máximo
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 6000); // 6 segundos (ajuste conforme a duração do seu vídeo)

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fading-out' : ''}`}>
      <video
        className="loading-video"
        src={videoUrl}
        autoPlay
        muted
        playsInline
        onEnded={finishLoading} // Se o vídeo acabar, libera
        onError={finishLoading} // Se o vídeo der erro, libera também!
        style={{ pointerEvents: 'none' }} // Evita que o usuário pause clicando
      />
    </div>
  );
};

export default LoadingScreen;
