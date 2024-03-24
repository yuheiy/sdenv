const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.cjs');

const { screens } = resolveConfig(tailwindConfig).theme;

/** @type {import('postcss-load-config').Config} */
module.exports = {
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
