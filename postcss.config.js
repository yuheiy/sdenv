function toPx(length) {
  return `tan(atan2(${length}, 1px))`;
}

function fluid(
  min,
  max,
  breakpointMin = 'var(--breakpoint-sm)',
  breakpointMax = 'var(--breakpoint-2xl)',
  ...rest
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

  const t = `(${toPx('100svw')} - ${toPx(breakpointMin)}) / (${toPx(breakpointMax)} - ${toPx(breakpointMin)})`;

  return `clamp(${[
    `min(${min}, ${max})`,
    `${min} + (${max} - ${min}) * ${t}`,
    `max(${min}, ${max})`,
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
