import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), tailwind({ nesting: true }), icon()],
  vite: {
    define: {
      'import.meta.vitest': 'undefined',
    },
  },
});
