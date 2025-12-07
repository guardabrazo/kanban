import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kanban/',
  resolve: {
    alias: {
      'grdbrz-ui/dist/grdbrz-ui.css': path.resolve(__dirname, 'lib/grdbrz-ui/dist/grdbrz-ui.css'),
      'grdbrz-ui': path.resolve(__dirname, 'lib/grdbrz-ui/src/lib/index.ts')
    }
  }
})
