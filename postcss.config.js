// FIXME: tailwindから読み込むようにする
const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

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
