import type { Config } from 'postcss-load-config';

function createFluid() {
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

  function fluidImpl(min: number, max: number, minViewport: number, maxViewport: number) {
    const slope = (max - min) / (maxViewport - minViewport);
    const intercept = min - slope * minViewport;

    return `clamp(${[
      `${Math.min(min, max)}rem`,
      `${round(intercept)}rem + ${round(slope * 100)}lvw`,
      `${Math.max(min, max)}rem`,
    ].join(', ')})`;
  }

  return function fluid(
    min: string,
    max: string,
    minViewport = '40rem',
    maxViewport = '80rem',
    ...rest: unknown[]
  ) {
    if (!min || !max) {
      throw new Error(
        'The --fluid(…) function requires at least 2 arguments, but received insufficient arguments.',
      );
    }

    if (rest.length > 0) {
      throw new Error(
        `The --fluid(…) function only accepts 4 arguments, but received ${rest.length + 1}.`,
      );
    }

    const minAsRem = parseAsRem(min);
    const maxAsRem = parseAsRem(max);
    const minViewportAsRem = parseAsRem(minViewport);
    const maxViewportAsRem = parseAsRem(maxViewport);

    return fluidImpl(minAsRem, maxAsRem, minViewportAsRem, maxViewportAsRem);
  };
}

const config: Config = {
  plugins: {
    '@yuheiy/postcss-custom-functions': {
      functions: {
        '--fluid': createFluid(),
      },
    },
  },
};

export default config;
