import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import neutralino from 'vite-plugin-neutralino';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    neutralino({
      port: 3000,
      viteDevServerUrl: 'http://localhost:3000'
    })
  ],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  }
});