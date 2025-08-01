function fluid() {
  const inputPattern = /^([+-]?[0-9]*\.?[0-9]+)(px|rem)$/;

  function parseAsRem(input: string): number {
    const match = input.match(inputPattern);

    if (!match) {
      throw new Error(`${input} is an invalid input.`);
    }

    const [, value, unit] = match;
    const divider = unit === 'px' ? 16 : 1;

    return Number(value) / divider;
  }

  function round(n: number): number {
    return Math.round((n + Number.EPSILON) * 10000) / 10000;
  }

  return function fluidImpl(
    minSize: string,
    maxSize: string,
    minBreakpoint = '40rem',
    maxBreakpoint = '96rem',
    ...rest: unknown[]
  ): string {
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
      `${minSizeRem > maxSizeRem ? maxSizeRem : minSizeRem}rem`,
      `${round(intersection)}rem + ${round(slope * 100)}svw`,
      `${minSizeRem > maxSizeRem ? minSizeRem : maxSizeRem}rem`,
    ].join(', ')})`;
  };
}

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@yuheiy/postcss-custom-functions': {
      functions: {
        '--fluid': fluid(),
      },
    },
  },
};
