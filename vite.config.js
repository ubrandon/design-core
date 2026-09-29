import { defineConfig, loadEnv } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { designCorePlugins } from "./scripts/dev-server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Per-deploy id so prototype iframes skip the 10 minute GitHub Pages cache after a push
const BUILD_ID = (process.env.GITHUB_SHA || "").slice(0, 12) || Date.now().toString(36);
const buildIdPlugin = {
  name: "design-core-build-id",
  apply: "build",
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "build.json", source: JSON.stringify({ id: BUILD_ID }) });
  },
};

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, __dirname, "");

  return {
    appType: "mpa",
    base: "./",
    server: { port: 3000, strictPort: true },
    plugins: [...designCorePlugins(viteEnv), buildIdPlugin],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          project: resolve(__dirname, "project.html"),
          canvas: resolve(__dirname, "canvas.html"),
          captures: resolve(__dirname, "captures.html"),
          prototype: resolve(__dirname, "prototype.html"),
          "design-system": resolve(__dirname, "design-system.html"),
        },
      },
    },
  };
});
