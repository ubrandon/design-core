// Small shared helpers for the Node CLIs and the dev server.
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Repo root (this file lives in scripts/lib/).
export const root = resolve(__dirname, "../..");

// Runs a command, returns trimmed stdout, or null on any failure.
export function sh(cmd, opts = {}) {
  try {
    return execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...opts }).trim();
  } catch {
    return null;
  }
}

// Parses a GitHub remote URL (SSH or HTTPS) into { owner, repo }, else null.
export function parseGithubRemote(raw) {
  if (!raw) return null;
  const url = raw.trim().replace(/\.git$/i, "");
  let m = url.match(/^git@github\.com:([^/]+)\/([^/]+)$/i);
  if (m) return { owner: m[1], repo: m[2] };
  m = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)/i);
  if (m) return { owner: m[1], repo: m[2] };
  return null;
}

// Normalizes a site root to `origin/path/` (adds https:// and a trailing slash), else null.
export function normalizePublicBaseUrl(input) {
  if (input == null) return null;
  const s = String(input).trim();
  if (!s) return null;
  try {
    const raw = /^https?:\/\//i.test(s) ? s : `https://${s.replace(/^\/+/, "")}`;
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    let path = u.pathname || "/";
    if (!path.endsWith("/")) path += "/";
    return `${u.origin}${path}`;
  } catch {
    return null;
  }
}

// GitHub project Pages root (https://<owner>.github.io/<repo>/) for a remote URL, else null.
export function githubPagesRootFromRemote(remoteUrl) {
  const p = parseGithubRemote(remoteUrl);
  if (!p) return null;
  return `https://${p.owner.toLowerCase()}.github.io/${p.repo}/`;
}

// Reads and parses a JSON file, reporting failure instead of throwing.
export function readJsonSafe(absPath) {
  if (!existsSync(absPath)) return { ok: false, error: "missing" };
  try {
    return { ok: true, data: JSON.parse(readFileSync(absPath, "utf8")) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
