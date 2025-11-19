// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//teste

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // AQUI ESTÁ A MUDANÇA:
  // Se o comando for 'build' (para o deploy), use '/tiamat/'
  // Caso contrário (no 'serve' do Bolt), use a raiz '/'
  base: command === 'build' ? '/tiamat/' : '/',

  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
