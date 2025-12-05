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
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      ...betterTailwindcss.configs.recommended.rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        {
          printWidth: prettierConfig.printWidth,
        },
      ],
      'better-tailwindcss/no-unregistered-classes': [
        'warn',
        {
          // detectComponentClassesでは `@import '...' layer(components);` で指定したファイルが読み込めないため、ignoreに指定する
          // https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/171#issuecomment-3075495146
          ignore: ['^prose$', '^wrapper$'],
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
