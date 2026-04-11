import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

const site = 'https://example.com';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap(), icon()],
  vite: {
    build: {
      license: {
        fileName: '_astro/license.md',
      },
    },
    // Preserve the banner comment added by rollupOptions.output.banner,
    // which esbuild would otherwise strip during minification (default: "none").
    esbuild: {
      legalComments: 'inline',
    },
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              // Prepend a license notice pointing to the generated license file.
              // Uses "/*!" syntax so esbuild treats it as a legal comment.
              banner: `/*! See licenses of bundled dependencies at ${site}/_astro/license.md */`,
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
