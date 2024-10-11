import containerQueries from '@tailwindcss/container-queries';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads CSS files through Tailwind’s plugin system to enable IntelliSense support.
 *
 * This plugin scans CSS files from `src/styles/{base,components,utilities}` and appends them to
 * their respective layers.
 */
const cssFiles = plugin(({ addBase, addComponents, addUtilities }) => {
  const layers = ['base', 'components', 'utilities'];
  const stylesDir = path.join(__dirname, 'src/styles');
  const addStylesMap = {
    base: addBase,
    components: addComponents,
    utilities: addUtilities,
  };

  for (const layer of layers) {
    const layerDir = path.join(stylesDir, layer);
    const fileNames = fs.readdirSync(layerDir);
    const addStyles = addStylesMap[layer];

    for (const fileName of fileNames) {
      if (path.extname(fileName) === '.css') {
        const filePath = path.join(layerDir, fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        const styles = postcss.parse(content);
        addStyles(styles.nodes);
      }
    }
  }
});

/**
 * Create a responsive grid layout without media queries using CSS Grid.
 *
 * This plugin is based on a method provided by Andy Bell on piccalil.li.
 * See: https://piccalil.li/tutorial/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/
 */
const autoGrid = plugin(
  ({ addComponents, matchComponents, theme }) => {
    const values = theme('autoGrid');

    matchComponents(
      {
        'auto-grid': (value) => ({
          display: 'grid',
          'grid-template-columns': `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values },
    );

    addComponents({
      '.auto-grid-none': {
        display: 'revert',
        'grid-template-columns': 'revert',
      },
    });
  },
  {
    theme: {
      autoGrid: ({ theme }) => ({
        ...theme('spacing'),
      }),
    },
  },
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif'],
      },
    },
  },
  plugins: [containerQueries, animate, cssFiles, autoGrid],
};
