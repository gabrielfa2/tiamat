// Salve este código como: src/components/HeroImage.jsx

import React from 'react';
import PartnersCarousel from './PartnersCarousel';
const HeroImage = () => {
  // --- PONTO PRINCIPAL ---
  // Troque o caminho abaixo pela sua imagem.
  // Se a imagem estiver na pasta `public`, o caminho começa com "/".
  // Exemplo: "/imagens/meu-fundo.jpg"
  const imageUrl = '/bannertemp.png'; 

  return (
    // Container principal que define o aspect ratio e a imagem de fundo
    <div
      className="relative w-full aspect-[2/2] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Camada de sobreposição para escurecer a imagem e melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Container para o conteúdo centralizado */}
      <div className="relative h-full w-full flex flex-col items-center justify-center text-center text-white px-4">
        
      </div>
      <PartnersCarousel />
    </div>
  );
};

export default HeroImage;