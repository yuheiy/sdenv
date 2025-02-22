function fluid(
  minSize,
  maxSize,
  minBreakpoint = 'var(--breakpoint-sm)',
  maxBreakpoint = 'var(--breakpoint-2xl)',
  ...rest
) {
  if (!minSize || !maxSize) {
    throw new Error('The --fluid(…) function requires 2–4 arguments, but received none.');
  }

  if (rest.length > 0) {
    throw new Error(
      `The --fluid(…) function only accepts 4 arguments, but received ${rest.length + 1}.`,
    );
  }

  const slope = `calc(tan(atan2(${maxSize} - ${minSize}, 1px)) / tan(atan2(${maxBreakpoint} - ${minBreakpoint}, 1px)))`;
  const intercept = `calc(tan(atan2(${minSize}, 1px)) - ${slope} * tan(atan2(${minBreakpoint}, 1px)))`;

  return `clamp(${[
    `min(${minSize}, ${maxSize})`,
    `${slope} * 100lvi + ${intercept} / 16 * 1rem`,
    `max(${minSize}, ${maxSize})`,
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
