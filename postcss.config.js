import { __unstable__loadDesignSystem } from '@tailwindcss/node';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

async function loadBreakpoints(cssPath) {
  const css = await fsPromises.readFile(cssPath, 'utf8');
  const { theme } = await __unstable__loadDesignSystem(css, {
    base: path.dirname(cssPath),
  });

  const breakpoints = {};

  for (const [key, { value }] of theme.values.entries()) {
    const prefix = '--breakpoint-';
    if (key.startsWith(prefix)) {
      breakpoints[key.replace(prefix, '')] = value;
    }
  }

  return breakpoints;
}

const breakpoints = await loadBreakpoints('./src/styles/global.css');

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-fluid-sizing-function': {
      viewportWidths: {
        ...breakpoints,
        DEFAULT_FROM: breakpoints.sm,
        DEFAULT_TO: breakpoints['2xl'],
      },
    },
  },
};
