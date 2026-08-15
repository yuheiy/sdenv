import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const site = 'https://example.com';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    build: {
      license: {
        fileName: '_astro/license.md',
      },
    },
    environments: {
      client: {
        build: {
          rolldownOptions: {
            output: {
              postBanner: `/*! See licenses of bundled dependencies at ${site}/_astro/license.md */`,
            },
          },
        },
      },
    },
    define: {
      'import.meta.vitest': 'undefined',
    },
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
