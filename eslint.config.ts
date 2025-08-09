import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['.astro/', 'dist/']),

  eslint.configs.recommended,

  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    rules: {
      // TypeScript already catches unused variables
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  astro.configs['flat/jsx-a11y-recommended'],
);
