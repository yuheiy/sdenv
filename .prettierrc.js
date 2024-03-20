/** @type {import('prettier').Config} */
export default {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
  ],
  printWidth: 100,
  singleQuote: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
