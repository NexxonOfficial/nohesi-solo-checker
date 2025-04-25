import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile  } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    target: 'esnext',
  },
  plugins: [svelte(), viteSingleFile()],
})
