import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({ base: '/insurance-broker-workspace/', build: { sourcemap: false }, plugins: [react()] })
