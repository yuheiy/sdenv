const inputPattern = /^([+-]?[0-9]*\.?[0-9]+)(px|rem)$/;

function parseAsRem(input) {
  const match = input.match(inputPattern);

  if (!match) {
    throw new Error(`${input} is an invalid input.`);
  }

  const [, value, unit] = match;
  const divider = unit === 'px' ? 16 : 1;

  return Number(value) / divider;
}

function round(n) {
  return Math.round((n + Number.EPSILON) * 10000) / 10000;
}

function fluid(minSize, maxSize, minBreakpoint = '40rem', maxBreakpoint = '96rem', ...rest) {
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

  minSize = parseAsRem(minSize);
  maxSize = parseAsRem(maxSize);
  minBreakpoint = parseAsRem(minBreakpoint);
  maxBreakpoint = parseAsRem(maxBreakpoint);

  const slope = (maxSize - minSize) / (maxBreakpoint - minBreakpoint);
  const intersection = -1 * minBreakpoint * slope + minSize;

  return `clamp(${[
    `${minSize > maxSize ? maxSize : minSize}rem`,
    `${round(intersection)}rem + ${round(slope * 100)}svw`,
    `${minSize > maxSize ? minSize : maxSize}rem`,
  ].join(', ')})`;
}

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@yuheiy/postcss-custom-functions': {
      functions: {
        '--fluid': fluid,
      },
    },
  },
};
