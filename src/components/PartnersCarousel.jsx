// src/components/PartnersCarousel.jsx

import React from 'react';

const partners = [
  { name: 'apex', logoSrc: `${import.meta.env.BASE_URL}apex.png` },
  { name: 'c2', logoSrc: `${import.meta.env.BASE_URL}cs2.png` },
  { name: 'ov2', logoSrc: `${import.meta.env.BASE_URL}ov2.png` },
  { name: 'pubg', logoSrc: `${import.meta.env.BASE_URL}pubg.svg` },
  { name: 'rb6', logoSrc: `${import.meta.env.BASE_URL}rb6.png` },
  { name: 'vava', logoSrc: `${import.meta.env.BASE_URL}vava.png` },
];

const extendedPartners = Array(5).fill([...partners]).flat();

const PartnersCarousel = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-800 py-4 border-t border-slate-700 overflow-hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        }}
      >
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {extendedPartners.map((partner, index) => (
            <div key={`${partner.logoSrc}-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
              <img
                src={partner.logoSrc}
                alt={`Logo do jogo ${partner.name}`}
                // 👇 MUDANÇAS AQUI 👇
                // Aplicamos um filtro que tenta deixar a imagem branca.
                // Ao passar o mouse, o filtro é removido e o brilho é aplicado.
                className="h-14 w-auto object-contain
                           filter brightness-0 invert
                           group-hover:filter-none group-hover:drop-shadow-glow-purple
                           transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;