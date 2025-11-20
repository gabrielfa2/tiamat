import React from 'react';

const TeamBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/imagemteam.png"
            alt="Tiamat Team"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Gradient Overlay para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>

        {/* Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-xl">
            {/* Main Title */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              OUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                TEAM
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md">
              The Champs
            </p>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = '/games'}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              MEET OUR TEAMS
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative Element - Optional */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
    </section>
  );
};

export default TeamBanner;
