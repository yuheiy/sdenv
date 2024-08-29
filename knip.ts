import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'postcss.config.js',
    'tailwind.config.js',
    'src/scripts/main.ts',
    'src/scripts/components/*',
    'src/scripts/stores/*',
  ],
  ignoreDependencies: ['eslint-plugin-jsx-a11y', 'postcss-fluid-sizing-function'],
};

export default config;
