import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/arknights-gall-info/',  // GitHub Pages에서 호스팅할 때 경로 설정
  plugins: [react()],
})
