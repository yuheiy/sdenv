/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error Type error caused by different Vite versions used by Vitest and Astro dependencies
  test: {
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
  },
});
