import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: process.env.LIB_MODE !== 'lib',
  },
  plugins: [],
} satisfies Config;
