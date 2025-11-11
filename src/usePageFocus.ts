import { useEffect, useRef } from 'react';

// Títulos que irão alternar quando o usuário sair da aba
const titles = ['Ei, Daqui eu te vejo!', 'Volte!'];

export const usePageFocus = (originalTitle: string) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // O usuário mudou de aba - começa a alternar os títulos
        intervalRef.current = window.setInterval(() => {
          // Pega um título aleatório da lista
          const randomIndex = Math.floor(Math.random() * titles.length);
          document.title = titles[randomIndex];
        }, 1500); // Muda o título a cada 1.5 segundos
      } else {
        // O usuário voltou para a aba - para o intervalo e restaura o título original
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        document.title = originalTitle;
      }
    };

    // Adiciona o listener para o evento de mudança de visibilidade
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Função de limpeza: remove o listener quando o componente for desmontado
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [originalTitle]); // O efeito depende do título original
};