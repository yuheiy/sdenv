/* eslint-env node */
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const plugin = require('tailwindcss/plugin');

// load CSS files via tailwind plugin to activate modifiers, tree-shaking, and IntelliSense
const cssFiles = plugin(({ addBase, addComponents, addUtilities }) => {
  const dirname = path.join(__dirname, './src/styles');
  const files = fs.readdirSync(dirname);

  for (const file of files) {
    const matched = /^(base|components|utilities)\..+\.css$/.exec(file);

    if (matched) {
      const layer = matched[1];
      const addStyles = {
        base: addBase,
        components: addComponents,
        utilities: addUtilities,
      }[layer];
      const content = fs.readFileSync(path.join(dirname, file), 'utf8');
      const styles = postcss.parse(content);

      addStyles(styles.nodes);
    }
  }
});

// https://piccalil.li/tutorial/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/
const autoGrid = plugin(
  ({ addComponents, matchComponents, theme }) => {
    const values = theme('autoGrid');

    matchComponents(
      {
        'auto-grid': (value) => ({
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values },
    );

    addComponents({
      '.auto-grid-none': {
        display: 'revert',
        gridTemplateColumns: 'revert',
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

// https://every-layout.dev/layouts/center/
const center = plugin(({ addComponents }) => {
  addComponents({
    '.center': {
      boxSizing: 'content-box',
      maxWidth: '60rem',
      marginInline: 'auto',
      paddingInline: 'max(5vw, 1rem)',
    },
  });
});

// https://github.com/w3c/csswg-drafts/issues/6723#issuecomment-1411487571
const kerning = plugin(({ addUtilities }) => {
  addUtilities({
    '.kerning-none': {
      fontKerning: 'none',
      fontFeatureSettings: 'normal',
    },
    '.kerning-normal': {
      fontKerning: 'normal',
      fontFeatureSettings: 'normal',
    },
    '.kerning-all': {
      fontKerning: 'normal',
      fontFeatureSettings: "'palt'",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    cssFiles,
    autoGrid,
    center,
    kerning,
  ],
};
