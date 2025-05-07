import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

// Simular __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.crt')),
    },
    port: 5173,
    host: 'localhost',
  },
});
