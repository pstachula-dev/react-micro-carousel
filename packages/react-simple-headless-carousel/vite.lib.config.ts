import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: true,
    copyPublicDir: false,
    lib: {
      name: 'react-micro-carousel',
      entry: resolve(__dirname, 'src/lib/simple-headless-carousel/index.ts'),
      formats: ['es', 'umd'],
      fileName: 'react-micro-carousel',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      include: ['src/lib'],
      rollupTypes: true,
    }),
  ],
});
