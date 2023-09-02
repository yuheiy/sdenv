module.exports = {
  plugins: [require.resolve('prettier-plugin-astro'), require.resolve('prettier-plugin-css-order')],
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
