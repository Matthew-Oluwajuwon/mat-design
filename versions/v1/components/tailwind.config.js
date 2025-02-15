const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { default: tailwindPlugin } = require('../tailwind-plugin/src/plugins/matd-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,ts,tsx}',
    "../../**/.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    ...createGlobPatternsForDependencies(__dirname),

  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindPlugin],
};
 