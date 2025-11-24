import React, { useState, useEffect, useRef } from 'react';
import PartnersCarousel from './PartnersCarousel';

// --- CONFIGURAÇÃO ---

// 1. Twitch (Automático): Coloque o nome do canal.
const TWITCH_CHANNEL = ''; 

// 2. YouTube (Manual):
// Quando for abrir live no YouTube, cole o ID do vídeo aqui.
// O ID é a parte final da URL: youtube.com/watch?v=XXXXXXXX
// Se não tiver live no YouTube, deixe como uma string vazia: ''
const YOUTUBE_VIDEO_ID = ''; // Exemplo: 'jfKfPfyJRdk'

declare global {
  interface Window {
    Twitch: any;
  }
}

type StreamSource = 'twitch' | 'youtube' | 'none';

const HeroSlider = () => {
  const [activeStream, setActiveStream] = useState<StreamSource>('none');
  const playerRef = useRef<HTMLDivElement>(null);
  const twitchPlayer = useRef<any>(null);

  // Imagem de Background (Fallback)
  const imageUrl = `${import.meta.env.BASE_URL}bannertemp.png`; 

  useEffect(() => {
    // Carrega o script da Twitch
    const loadTwitchScript = () => {
      if (document.getElementById('twitch-embed-script')) return;
      const script = document.createElement('script');
      script.setAttribute('src', 'https://player.twitch.tv/js/embed/v1.js');
      script.setAttribute('id', 'twitch-embed-script');
      document.body.appendChild(script);
    };

    loadTwitchScript();

    // Verifica se deve mostrar o YouTube imediatamente (caso a Twitch demore ou falhe)
    // Se tiver um ID configurado manualmente, já preparamos o terreno
    if (YOUTUBE_VIDEO_ID) {
        // Se não tiver player da Twitch ainda, assume YouTube por enquanto
        if (!twitchPlayer.current) {
            setActiveStream('youtube');
        }
    }

    // Inicializa o Player da Twitch e os "ouvintes" de estado
    const initPlayer = setInterval(() => {
      if (window.Twitch && window.Twitch.Player && playerRef.current && !twitchPlayer.current) {
        clearInterval(initPlayer);

        const parentDomains = ['localhost', window.location.hostname];

        const player = new window.Twitch.Player(playerRef.current, {
          width: '100%',
          height: '100%',
          channel: TWITCH_CHANNEL,
          parent: parentDomains,
          autoplay: true,
          muted: true,
          controls: false, 
        });

        twitchPlayer.current = player;

        // --- EVENTOS DA TWITCH ---
        
        // 1. Twitch ficou ONLINE -> Ela ganha prioridade total
        player.addEventListener(window.Twitch.Player.ONLINE, () => {
          console.log('Twitch está ONLINE');
          setActiveStream('twitch');
          player.setMuted(true); 
        });

        // 2. Twitch ficou OFFLINE -> Verificamos se tem YouTube manual configurado
        player.addEventListener(window.Twitch.Player.OFFLINE, () => {
          console.log('Twitch está OFFLINE');
          if (YOUTUBE_VIDEO_ID) {
            setActiveStream('youtube');
          } else {
            setActiveStream('none');
          }
        });
      }
    }, 1000);

    return () => clearInterval(initPlayer);
  }, []);

  return (
    <div className="relative w-full aspect-[21/9] bg-slate-900 overflow-hidden group">
      
      {/* --- CAMADA 1: PLAYER DA TWITCH --- */}
      <div 
        ref={playerRef} 
        id="twitch-embed"
        className={`absolute inset-0 z-30 transition-opacity duration-1000 ${
          activeStream === 'twitch' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* --- CAMADA 2: PLAYER DO YOUTUBE --- */}
      {/* Só é renderizado se houver um ID manual configurado e a Twitch estiver off */}
      {activeStream === 'youtube' && YOUTUBE_VIDEO_ID && (
        <div className="absolute inset-0 z-20 w-full h-full">
          <iframe
            className="w-full h-full object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* Overlay transparente para impedir cliques e manter função de banner */}
          <div className="absolute inset-0 bg-transparent"></div>
        </div>
      )}

      {/* --- CAMADA 3: BANNER PADRÃO (IMAGEM) --- */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeStream === 'none' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-100"></div>
          <div className="relative h-full w-full flex flex-col items-center justify-center text-center text-white px-4">
             {/* Texto opcional aqui */}
          </div>
        </div>
      </div>

      {/* --- INDICADOR "AO VIVO" --- */}
      {activeStream !== 'none' && (
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm animate-pulse shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          {activeStream === 'twitch' ? 'TWITCH LIVE' : 'YOUTUBE LIVE'}
        </div>
      )}

      {/* --- CONTROLE DE SOM (Apenas Twitch) --- */}
      {activeStream === 'twitch' && (
        <button 
            onClick={() => {
                if(twitchPlayer.current) {
                    const muted = twitchPlayer.current.getMuted();
                    twitchPlayer.current.setMuted(!muted);
                }
            }}
            className="absolute bottom-24 right-4 z-40 bg-black/50 hover:bg-purple-600 text-white p-2 rounded-full transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
        </button>
      )}

      <PartnersCarousel />
    </div>
  );
};

export default HeroSlider;
