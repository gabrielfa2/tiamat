import React from 'react';

const VideoSection = () => {
  const videoUrl = 'https://pub-61992242d95c4c08a5588448f8a876fc.r2.dev/video.mp4';
  const posterUrl = '/bannertemp.png';

  return (
    <section className="py-16">
      {/* 👇 AQUI ESTÁ A ALTERAÇÃO 👇 */}
      {/* Trocamos 'max-w-screen-xl' por 'max-w-screen-2xl' para aumentar a largura */}
      <div className="max-w-screen-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden">
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
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

