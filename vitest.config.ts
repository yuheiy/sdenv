/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
  },
});
