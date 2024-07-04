import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

//dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["src/lib"] })],
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, "src/lib/simple-headless-carousel/index.ts"),
      formats: ["es", "cjs"],
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
