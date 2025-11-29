import type { Config } from 'postcss-load-config';


/**
 * Creates responsive grid columns.
 * (https://every-layout.dev/layouts/grid/)
 *
 * @example grid-template-columns: --auto-grid(250px);
 * @output grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
 */
function autoGrid(minWidth: string, ...rest: string[]) {
  if (!minWidth) {
    throw new Error(
      'The --auto-grid(…) function requires 1 argument, but none was provided.',
    );
  }

  if (rest.length > 0) {
    throw new Error(
      `The --auto-grid(…) function only accepts 1 argument, but received ${rest.length + 1}.`,
    );
  }

  return `repeat(auto-fill, minmax(min(${minWidth}, 100%), 1fr))`;
}

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

  /**
   * Creates fluid typography that scales with viewport.
   * (https://github.com/sindresorhus/css-extras/blob/v0.4.0/index.css#L295-L311)
   *
   * @example font-size: --fluid(16px, 24px, 320px, 1280px);
   * @output Scales from 16px at 320px viewport to 24px at 1280px viewport
   */
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
        `The --fluid(…) function only accepts 4 arguments, but received ${rest.length + 4}.`,
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
        '--auto-grid': autoGrid,
        '--fluid': createFluid(),
      },
    },
  },
};

export default config;
