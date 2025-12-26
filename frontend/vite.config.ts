import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Порт по умолчанию для Vite
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api', // Твой Fastify бэкенд
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    allowedHosts: true,
  },
  build: {
    outDir: './dist',
    sourcemap: true,
  },
});
