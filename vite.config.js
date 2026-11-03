import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em desenvolvimento, chamadas para /api/* são encaminhadas ao FastAPI (porta 8000).
// Assim o navegador enxerga tudo como a mesma origem e não precisa de CORS no dev.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
