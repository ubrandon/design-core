import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from "fs";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

function dataFilesPlugin() {
  return {
    name: "data-files",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split("?")[0];
        if (!url.startsWith("/data/")) return next();

        if (req.method === "PUT" && url.endsWith(".json")) {
          const filePath = resolve(__dirname, "public" + url);
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", () => {
            try {
              JSON.parse(body);
              writeFileSync(filePath, body, "utf-8");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end('{"ok":true}');
            } catch (e) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end('{"error":"Invalid JSON"}');
            }
          });
          return;
        }

        if (req.method === "DELETE") {
          const filePath = resolve(__dirname, "public" + url);
          if (!filePath.startsWith(resolve(__dirname, "public/data/"))) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end('{"error":"Forbidden"}');
            return;
          }
          try {
            if (existsSync(filePath)) unlinkSync(filePath);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end('{"ok":true}');
          } catch (e) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end('{"error":"' + e.message + '"}');
          }
          return;
        }

        next();
      });
    },
  };
}

function captureApiPlugin() {
  let activeCapture = null;

  return {
    name: "capture-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/capture" && req.method === "POST") {
          if (activeCapture) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end('{"error":"A capture is already running"}');
            return;
          }

          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", () => {
            let params;
            try { params = JSON.parse(body); }
            catch { res.writeHead(400); res.end('{"error":"Bad JSON"}'); return; }

            const appUrl = params.url;
            if (!appUrl) { res.writeHead(400); res.end('{"error":"url required"}'); return; }

            const capturesDir = resolve(__dirname, "public", "data", "captures");
            mkdirSync(capturesDir, { recursive: true });
            const configPath = resolve(capturesDir, "config.json");
            const config = {
              appUrl,
              viewport: { width: 390, height: 844 },
              discover: true,
              dismissSelectors: [],
            };
            writeFileSync(configPath, JSON.stringify(config, null, 2));

            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            });

            const send = (event, data) => {
              res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
            };

            send("status", { message: "Starting capture..." });

            const child = spawn("node", ["scripts/capture-screens.js"], {
              cwd: __dirname,
              stdio: ["ignore", "pipe", "pipe"],
            });

            activeCapture = child;

            child.stdout.on("data", chunk => {
              const lines = chunk.toString().split("\n").filter(Boolean);
              for (const line of lines) {
                send("log", { text: line.replace(/^\s+/, "") });
              }
            });

            child.stderr.on("data", chunk => {
              const lines = chunk.toString().split("\n").filter(Boolean);
              for (const line of lines) {
                send("log", { text: line.replace(/^\s+/, "") });
              }
            });

            child.on("close", code => {
              activeCapture = null;
              if (code === 0) {
                send("done", { success: true });
              } else {
                send("error", { message: `Capture exited with code ${code}` });
              }
              res.end();
            });

            child.on("error", err => {
              activeCapture = null;
              send("error", { message: err.message });
              res.end();
            });

            req.on("close", () => {
              if (activeCapture === child) {
                child.kill();
                activeCapture = null;
              }
            });
          });
          return;
        }

        if (req.url === "/api/capture/status" && req.method === "GET") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ running: !!activeCapture }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  base: "./",
  server: { port: 3000 },
  plugins: [
    {
      name: "suppress-public-reload",
      handleHotUpdate({ file }) {
        if (file.includes("/public/")) return [];
      },
    },
    dataFilesPlugin(),
    captureApiPlugin(),
  ],
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
});
