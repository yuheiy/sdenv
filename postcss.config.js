import resolveConfig from 'tailwindcss/resolveConfig.js';
import tailwindConfig from './tailwind.config.js';

const {
  theme: { screens },
} = resolveConfig(tailwindConfig);

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-fluid-sizing-function': {
      viewportWidths: {
        ...screens,
        DEFAULT_FROM: screens.sm,
        DEFAULT_TO: screens['2xl'],
      },
    },
  },
};
