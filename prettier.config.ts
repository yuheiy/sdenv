import { type Config } from 'prettier';

const config: Config = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
  ],
  printWidth: 100,
  singleQuote: true,

  overrides: [
    // prettier-plugin-astro
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

export default config;
