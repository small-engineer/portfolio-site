import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  server: {
    fs: {
      allow: ['.yarn', 'src', 'node_modules', '.svelte-kit']
    }
  }
});
