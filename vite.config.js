import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  server: { port: 3000 },
  plugins: [
    // Do NOT auto-reload on data/style changes. Canvas and design-system pages
    // stay put; users press Refresh to see edits. This avoids losing pan/zoom.
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        project: resolve(__dirname, "project.html"),
        canvas: resolve(__dirname, "canvas.html"),
        prototype: resolve(__dirname, "prototype.html"),
        "design-system": resolve(__dirname, "design-system.html"),
      },
    },
  },
});
