import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), tailwind()],
  vite: {
    define: {
      'import.meta.vitest': 'undefined',
    },
    plugins: [visualizer()],
  },
});
