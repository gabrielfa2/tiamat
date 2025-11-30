import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTE DO BOTÃO ---
const SparkleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledButtonWrapper>
      <div className="sp">
        <button className="sparkle-button" onClick={onClick}>
          <span className="spark" />
          <span className="backdrop" />
          <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text">ADD TO CART</span>
        </button>
      </div>
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  .sparkle-button {
    --active: 0.8;
    --bg: radial-gradient(
        40% 50% at center 100%,
        hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
        transparent
      ),
      radial-gradient(
        80% 100% at center 120%,
        hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
        transparent
      ),
      hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
    background: var(--bg);
    font-size: 1.1rem;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    padding: 0.8em 1.5em;
    display: flex;
    align-items: center;
    gap: 0.25em;
    white-space: nowrap;
    border-radius: 100px;
    position: relative;
    box-shadow: 0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
      0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
      0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
    transition: box-shadow 0.3s, scale 0.3s, background 0.3s;
    scale: calc(1 + (var(--active) * 0.1));
  }
  .sparkle-button:active {
    scale: 1;
  }
  .sparkle path {
    color: hsl(0 0% calc((var(--active, 0) * 70%) + 90%));
    transform-box: fill-box;
    transform-origin: center;
    fill: currentColor;
    stroke: currentColor;
    animation-delay: calc(0.3s * 1.5 + (var(--delay) * 1s));
    animation-duration: 0.6s;
    transition: color 0.3s;
  }
  .sparkle-button:is(:hover, :focus-visible) {
    --active: 1;
  }
  .sparkle-button:is(:hover, :focus-visible) path {
    animation-name: bounce;
  }
  @keyframes bounce {
    35%, 65% {
      scale: var(--scale);
    }
  }
  .sparkle path:nth-of-type(1) { --scale: 0.5; --delay: 0.1; }
  .sparkle path:nth-of-type(2) { --scale: 1.5; --delay: 0.2; }
  .sparkle path:nth-of-type(3) { --scale: 2.5; --delay: 0.35; }
  .sparkle-button:before {
    content: "";
    position: absolute;
    inset: -0.2em;
    z-index: -1;
    border: 0.25em solid hsl(260 97% 50% / 0.5);
    border-radius: 100px;
    opacity: var(--active, 0);
    transition: opacity 0.3s;
  }
  .spark {
    position: absolute;
    inset: 0;
    border-radius: 100px;
    rotate: 0deg;
    overflow: hidden;
    mask: linear-gradient(white, transparent 50%);
    animation: flip 2s infinite steps(2, end);
  }
  @keyframes flip { to { rotate: 360deg; } }
  .spark:before {
    content: "";
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 0%;
    left: 50%;
    z-index: -1;
    translate: -50% -15%;
    rotate: 0;
    transform: rotate(-90deg);
    opacity: calc((var(--active)) + 0.4);
    background: conic-gradient(from 0deg, transparent 0 340deg, white 360deg);
    transition: opacity 0.3s;
    animation: rotate 1s linear infinite both;
  }
  .backdrop {
    position: absolute;
    inset: 2px;
    background: var(--bg);
    border-radius: 100px;
    transition: background 0.3s;
  }
  @keyframes rotate { to { transform: rotate(90deg); } }
  .text {
    translate: 2% -6%;
    letter-spacing: 0.05em;
    background: linear-gradient(90deg, hsl(0 0% calc((var(--active) * 100%) + 100%)), hsl(0 0% calc((var(--active) * 100%) + 100%)));
    -webkit-background-clip: text;
    color: transparent;
    transition: background 0.3s;
  }
  .sparkle-button svg {
    inline-size: 1.25em;
    translate: -25% -5%;
  }
`;

// --- COMPONENTE PRINCIPAL DA SEÇÃO ---
const ProductsSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sliderElement = sliderRef.current;
      if (!sliderElement) return;

      const { top, height } = sliderElement.getBoundingClientRect();
      const screenHeight = window.innerHeight;

      const start = screenHeight;
      const end = screenHeight / 2 - height / 2;

      const progress = Math.max(0, Math.min(1, (top - end) / (start - end)));
      const translateX = 50 * progress;

      sliderElement.style.transform = `translateX(${translateX}%)`;
      sliderElement.style.opacity = `${1 - progress}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 h-[100vh] overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 h-full sticky top-0 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          <div className="text-white text-center lg:text-left">
            <span className="text-purple-400 font-bold tracking-wider">NOVO LANÇAMENTO</span>
            <h2 className="text-4xl md:text-5xl font-bold my-4">TIAMAT JERSEY 1.2025</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              A nova era da performance chegou. Nosso mais novo uniforme oficial,
              desenhado para máximo conforto e estilo dentro e fora de jogo. Arraste para ver os detalhes.
            </p>
            <div className="flex justify-center lg:justify-start">
              <SparkleButton onClick={() => navigate('/products/1')} />
            </div>
          </div>

          <div
            ref={sliderRef}
            // ALTERAÇÃO 1: Trocado 'w-full' por 'w-fit' e adicionado 'lg:mx-0'
            className="w-fit max-w-lg mx-auto lg:mx-0 lg:max-w-none transition-transform duration-100 ease-out lg:col-span-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700">
              {/* ALTERAÇÃO 2: Adicionada a propriedade value="30" */}
              <ImgComparisonSlider value="30">
                <img slot="first" src={`${import.meta.env.BASE_URL}dps.png`} alt="Frente da camisa" />
                <img slot="second" src={`${import.meta.env.BASE_URL}antes.png`} alt="Costas da camisa" />
              </ImgComparisonSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;