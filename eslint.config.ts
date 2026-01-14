import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from './prettier.config';

export default defineConfig(
  globalIgnores(['.astro/', 'dist/']),

  js.configs.recommended,

  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    rules: {
      // TypeScript already catches unused variables
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  astro.configs['flat/jsx-a11y-recommended'],

  {
    extends: [betterTailwindcss.configs.recommended as never],
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        {
          printWidth: prettierConfig.printWidth,
        },
      ],
      'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
      'better-tailwindcss/no-unknown-classes': [
        'error',
        {
          detectComponentClasses: true,
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
);
