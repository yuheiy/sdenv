import type { Config } from 'postcss-load-config';

function fluid() {
  const inputPattern = /^([+-]?[0-9]*\.?[0-9]+)(px|rem)$/;

  function parseAsRem(input: string) {
    const match = input.match(inputPattern);

    if (!match) {
      throw new Error(`${input} is an invalid input.`);
    }

    const [, value, unit] = match;
    const divider = unit === 'px' ? 16 : 1;

    return Number(value) / divider;
  }

  function round(n: number) {
    return Math.round((n + Number.EPSILON) * 10000) / 10000;
  }

  return function fluidImpl(
    minSize: string,
    maxSize: string,
    minBreakpoint = '40rem',
    maxBreakpoint = '96rem',
    ...rest: unknown[]
  ) {
    if (!minSize || !maxSize) {
      throw new Error(
        'The --fluid(…) function requires at least 2 arguments, but received insufficient arguments.',
      );
    }

    if (rest.length > 0) {
      throw new Error(
        `The --fluid(…) function only accepts 4 arguments, but received ${rest.length + 1}.`,
      );
    }

    const minSizeRem = parseAsRem(minSize);
    const maxSizeRem = parseAsRem(maxSize);
    const minBreakpointRem = parseAsRem(minBreakpoint);
    const maxBreakpointRem = parseAsRem(maxBreakpoint);

    const slope = (maxSizeRem - minSizeRem) / (maxBreakpointRem - minBreakpointRem);
    const intersection = -1 * minBreakpointRem * slope + minSizeRem;

    return `clamp(${[
      `${Math.min(minSizeRem, maxSizeRem)}rem`,
      `${round(intersection)}rem + ${round(slope * 100)}svw`,
      `${Math.max(minSizeRem, maxSizeRem)}rem`,
    ].join(', ')})`;
  };
}

const config: Config = {
  plugins: {
    '@yuheiy/postcss-custom-functions': {
      functions: {
        '--fluid': fluid(),
      },
    },
  },
};

export default config;
