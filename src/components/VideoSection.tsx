import React from 'react';

const VideoSection = () => {
  const videoUrl = 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/videotiamatpronto.mp4';
  const posterUrl = `${import.meta.env.BASE_URL}bannertemp.png`;

  return (
    <section className="py-1">
      {/* 👇 AQUI ESTÁ A ALTERAÇÃO 👇 */}
      {/* Trocamos 'max-w-screen-xl' por 'max-w-screen-2xl' para aumentar a largura */}
      <div className="max-w-screen-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <video
            className="w-full"
            src={videoUrl}
            loop
            muted
            autoPlay
            playsInline
            poster={posterUrl}
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f172a] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
