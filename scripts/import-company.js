// Copies an old single-company Design Core repo's public/data into this repo as one company.
// Usage: npm run import-company -- <path-to-old-repo> <slug> "<Display Name>"
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, join, extname } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const [srcArg, slug, ...nameParts] = process.argv.slice(2);
const name = nameParts.join(" ").trim();

if (!srcArg || !slug || !name) {
  console.error('\n  Usage: npm run import-company -- <path-to-old-repo> <slug> "<Display Name>"\n');
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("\n  Slug must be lowercase letters, numbers, and hyphens (e.g. mixedroutes).\n");
  process.exit(1);
}

const srcRoot = resolve(srcArg);
const srcData = existsSync(join(srcRoot, "public", "data")) ? join(srcRoot, "public", "data") : srcRoot;
if (!existsSync(join(srcData, "projects"))) {
  console.error(`\n  Could not find a projects folder under ${srcData}\n`);
  process.exit(1);
}

const companiesDir = join(ROOT, "public", "data", "companies");
const dest = join(companiesDir, slug);
if (existsSync(dest)) {
  console.error(`\n  ${dest} already exists. Remove it first if you want to re-import.\n`);
  process.exit(1);
}

mkdirSync(companiesDir, { recursive: true });
for (const folder of ["projects", "design-system", "captures", "users"]) {
  const from = join(srcData, folder);
  if (existsSync(from)) cpSync(from, join(dest, folder), { recursive: true });
}
mkdirSync(join(dest, "projects"), { recursive: true });
if (!existsSync(join(dest, "projects", "index.json"))) writeFileSync(join(dest, "projects", "index.json"), '{\n  "projects": []\n}\n');

// Every file moved two folders deeper (companies/<slug>/), so fix relative links to tool styles and design-system files.
const TEXT_EXT = new Set([".html", ".htm", ".css", ".js", ".json", ".svg"]);
let rewritten = 0;
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fp = join(dir, entry);
    const st = statSync(fp);
    if (st.isDirectory()) { walk(fp); continue; }
    if (!TEXT_EXT.has(extname(entry).toLowerCase())) continue;
    const before = readFileSync(fp, "utf8");
    // "../../../../data/design-system/x" (root then data) -> "../../../design-system/x" (company root)
    let after = before.replace(/((?:\.\.\/)+)data\/design-system\//g, (m, ups) => {
      const n = ups.length / 3;
      return "../".repeat(Math.max(1, n - 1)) + "design-system/";
    });
    // "../../../../styles/x" or "../../../../scripts/x" (repo root) -> two levels deeper
    after = after.replace(/((?:\.\.\/)+)(styles|scripts)\//g, (m, ups, folder) => "../".repeat(ups.length / 3 + 2) + folder + "/");
    // "../../../design-system/mixedroutes-assets/x" from screens already points inside the company folder; leave it.
    // Fragments loaded by the tool pages use page-relative "data/..." paths; point them into the company folder.
    after = after.replace(/(["'(=\s])data\/(projects|design-system|captures|users)\//g, (m, pre, folder) => pre + "data/companies/" + slug + "/" + folder + "/");
    if (after !== before) { writeFileSync(fp, after, "utf8"); rewritten++; }
  }
}
walk(dest);

const indexPath = join(companiesDir, "index.json");
let idx = { companies: [] };
if (existsSync(indexPath)) {
  try { idx = JSON.parse(readFileSync(indexPath, "utf8")); } catch {}
  if (!Array.isArray(idx.companies)) idx.companies = [];
}
if (!idx.companies.some((c) => c && c.slug === slug)) {
  idx.companies.push({ slug, name, createdAt: new Date().toISOString() });
}
writeFileSync(indexPath, JSON.stringify(idx, null, 2) + "\n");

console.log(`\n  ✓ Imported ${name} into public/data/companies/${slug}/ (${rewritten} files had links fixed)\n`);
