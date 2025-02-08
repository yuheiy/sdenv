import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), icon()],
  vite: {
    define: {
      'import.meta.vitest': 'undefined',
    },
    plugins: [tailwindcss()],
  },
});
