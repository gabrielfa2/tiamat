import React from 'react';

// Os dados dos banners continuam os mesmos
const bannerData = [
  {
    imageUrl: `${import.meta.env.BASE_URL}time.png`,
    link: '/games',
    // porque ele vai ver os times por jogo tlgd
  },
  {
    imageUrl: `${import.meta.env.BASE_URL}time.png`,
    link: '/products',
    //link para uma tela com todos os produtos, aí fica todos esgotados, menos a camisa
  },
];

const DualBanners = () => {
  return (
    // 👇 MUDANÇA 1: Removido o padding 'py-16' para a seção encostar nos elementos adjacentes
    <section className="bg-slate-900">
      {/* 👇 MUDANÇA 2: Removido o 'max-w-screen-2xl mx-auto px-4' do container */}
      {/* Agora este container permite que o conteúdo interno vá de ponta a ponta */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {bannerData.map((banner, index) => (
            <a href={banner.link} key={index} className="group block">
              {/* 👇 MUDANÇA 3: Removido o 'rounded-lg' para que as imagens não tenham bordas arredondadas nos cantos */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={banner.imageUrl}
                  // Removi o 'alt' pois não há título nos dados, você pode adicionar se quiser
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* O restante da estrutura interna permanece igual */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualBanners;