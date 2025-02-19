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

function customFunctions(customFunctions) {}

customFunctions({
  '--fluid': (
    minSize,
    maxSize,
    minBreakpoint = 'var(--breakpoint-sm)',
    maxBreakpoint = 'var(--breakpoint-xl)',
    ...rest
  ) => {
    if (!minSize || !maxSize) {
      throw new Error('The --fluid(…) function requires 2 arguments, but received none.');
    }

    if (rest.length > 0) {
      throw new Error(
        `The --fluid(…) function only accepts 4 arguments, but received ${rest.length + 1}.`,
      );
    }

    const slope = `calc(tan(atan2(${maxSize} - ${minSize}, 1px)) / tan(atan2(${maxBreakpoint} - ${minBreakpoint}, 1px)))`;
    const intercept = `calc(tan(atan2(${minSize}, 1px)) - ${slope} * tan(atan2(${minBreakpoint}, 1px)))`;

    return `clamp(min(${minSize}, ${maxSize}), ${slope} * 100vi + ${intercept} / 16 * 1rem, max(${minSize}, ${maxSize}))`;
  },
});
