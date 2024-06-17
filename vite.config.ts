import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

//dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(
        __dirname,
        "src/simple-headless-carousel/SimpleHeadlessCarousel.tsx"
      ),
      formats: ["es"],
      name: "MyLib",
      fileName: "simple-headless-carousel",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
