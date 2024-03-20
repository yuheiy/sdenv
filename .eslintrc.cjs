module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/base',
    'plugin:astro/jsx-a11y-strict',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    // use prettier-plugin-tailwindcss for class sorting
    'tailwindcss/classnames-order': 'off',
  },
  reportUnusedDisableDirectives: true,
};
