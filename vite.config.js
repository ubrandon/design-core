import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  server: { port: 3000 },
  plugins: [
    {
      name: "reload-on-data-change",
      handleHotUpdate({ file, server }) {
        if (file.includes("public/data/design-system/") || file.includes("public/styles/")) {
          return [];
        }
        if (file.includes("public/data/") || file.includes("data/projects/")) {
          server.ws.send({ type: "full-reload", path: "*" });
        }
      },
    },
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
