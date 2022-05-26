/// <reference types="vitest" />
/// <reference types="vite/client" />
import {defineConfig} from 'vite'
import glsl from 'vite-plugin-glsl'

const config = defineConfig({
  plugins: [glsl()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test-setup.ts',
    silent: false,
  },
})
export default config
