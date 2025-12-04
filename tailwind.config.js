// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Animação do carrossel
      animation: {
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Fonte personalizada para efeito de escrita
      fontFamily: {
        'sedgwick': ['"Sedgwick Ave Display"', 'cursive'],
      },
      // Efeito de brilho (glow)
      dropShadow: {
        'glow-purple': '0 0 10px rgba(168, 85, 247, 0.7)',
      }
    },
  },
  plugins: [],
};