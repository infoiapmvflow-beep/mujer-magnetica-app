import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages publishes a project at /<repository>/; the Actions workflow
// sets VITE_BASE_PATH to that path at build time.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()]
});
