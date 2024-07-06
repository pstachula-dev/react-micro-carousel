import { defineConfig } from "vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

//dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    lib: {
      name: "simple-headless-react-carousel",
      entry: resolve(__dirname, "src/lib/simple-headless-carousel/index.ts"),
      formats: ["es", "umd"],
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
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["src/lib"],
      rollupTypes: true,
    }),
  ],
});
