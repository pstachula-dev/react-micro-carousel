/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: process.env.LIB_MODE !== 'lib',
  },
  plugins: [],
};
