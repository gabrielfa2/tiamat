import React, { useState, useEffect, useRef } from 'react';
import PartnersCarousel from './PartnersCarousel';

// --- CONFIGURAÇÃO ---

// 1. Twitch (Automático)
const TWITCH_CHANNEL = '';

// 2. YouTube (Manual)
const YOUTUBE_VIDEO_ID = '';

// 3. Vídeo do Hover (O "Reveal")
const HOVER_VIDEO_URL = 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/videohover.mp4';

declare global {
  interface Window {
    Twitch: any;
  }
}

type StreamSource = 'twitch' | 'youtube' | 'none';

const HeroSlider = () => {
  const [activeStream, setActiveStream] = useState<StreamSource>('none');
  const [isHoverVideoVisible, setIsHoverVideoVisible] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const twitchPlayer = useRef<any>(null);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  // Ref para controlar o timer de "saída suave"
  const fadeTimeoutRef = useRef<number | null>(null);

  const imageUrl = `${import.meta.env.BASE_URL}bannertemp.png`;

  useEffect(() => {
    const loadTwitchScript = () => {
      if (document.getElementById('twitch-embed-script')) return;
      const script = document.createElement('script');
      script.setAttribute('src', 'https://player.twitch.tv/js/embed/v1.js');
      script.setAttribute('id', 'twitch-embed-script');
      document.body.appendChild(script);
    };

    loadTwitchScript();

    if (YOUTUBE_VIDEO_ID) {
      if (!twitchPlayer.current) {
        setActiveStream('youtube');
      }
    }

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

        player.addEventListener(window.Twitch.Player.ONLINE, () => {
          console.log('Twitch Online');
          setActiveStream('twitch');
          player.setMuted(true);
        });

        player.addEventListener(window.Twitch.Player.OFFLINE, () => {
          console.log('Twitch Offline');
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

  // --- HANDLERS DA ÁREA MÁGICA (COM TRANSIÇÃO SUAVE) ---

  const handleMagicEnter = () => {
    // 1. Se o usuário voltou o mouse rápido, cancela o "pause" que estava agendado
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    // 2. Mostra e toca o vídeo
    if (hoverVideoRef.current) {
      setIsHoverVideoVisible(true);
      hoverVideoRef.current.play().catch(e => console.error("Erro play hover:", e));
    }
  };

  const handleMagicLeave = () => {
    // 1. Começa o fade-out visual imediatamente
    setIsHoverVideoVisible(false);

    // 2. Agenda o pause/reset para DEPOIS que a animação CSS terminar (500ms)
    // Isso evita o corte "seco"
    fadeTimeoutRef.current = window.setTimeout(() => {
      if (hoverVideoRef.current) {
        hoverVideoRef.current.pause();
        hoverVideoRef.current.currentTime = 0;
      }
    }, 500); // Deve ser igual ao 'duration-500' do className
  };

  return (
    <div className="relative w-full h-[75vh] md:h-auto md:aspect-[21/9] bg-slate-900 overflow-hidden group">

      {/* CAMADA 0: ÁREA MÁGICA (Z-20) - Ajustado para não bloquear o Menu */}
      {activeStream === 'none' && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[35%] h-[60%] z-20 cursor-pointer"
          onMouseEnter={handleMagicEnter}
          onMouseLeave={handleMagicLeave}
          style={{ backgroundColor: 'transparent' }}
        />
      )}

      {/* CAMADA 1: VÍDEO DE HOVER (Z-10) */}
      {activeStream === 'none' && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none ${isHoverVideoVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <video
            ref={hoverVideoRef}
            src={HOVER_VIDEO_URL}
            className="w-full h-full object-cover"
            muted
            playsInline
          // SEM LOOP: Para ele congelar no último frame se o mouse ficar muito tempo
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      )}

      {/* CAMADA 2: PLAYER DA TWITCH (Z-0) */}
      <div
        ref={playerRef}
        id="twitch-embed"
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${activeStream === 'twitch' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* CAMADA 3: PLAYER DO YOUTUBE (Z-0) */}
      {activeStream === 'youtube' && YOUTUBE_VIDEO_ID && (
        <div className="absolute inset-0 z-0 w-full h-full">
          <iframe
            className="w-full h-full object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-transparent"></div>
        </div>
      )}

      {/* CAMADA 4: BANNER PADRÃO (Z-0) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-0 ${activeStream === 'none' ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
        </div>
      </div>

      {/* ELEMENTOS DE INTERFACE (Z-30) */}
      {activeStream !== 'none' && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm animate-pulse shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          {activeStream === 'twitch' ? 'TWITCH LIVE' : 'YOUTUBE LIVE'}
        </div>
      )}

      {activeStream === 'twitch' && (
        <button
          onClick={() => {
            if (twitchPlayer.current) {
              const muted = twitchPlayer.current.getMuted();
              twitchPlayer.current.setMuted(!muted);
            }
          }}
          className="absolute bottom-24 right-4 z-30 bg-black/50 hover:bg-purple-600 text-white p-2 rounded-full transition-colors"
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
