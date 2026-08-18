#!/usr/bin/env node
// Health check for Design Core. Run with: npm run doctor
// Checks Node, dependencies, and every company's data files, then explains any problems in plain language.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { root, readJsonSafe } from "./lib/repo-info.js";

const COMPANIES_DIR = resolve(root, "public/data/companies");
const oks = [];
const notes = [];
const problems = [];
const ok = (msg) => oks.push(msg);
const note = (msg) => notes.push(msg);
const problem = (msg, fix) => problems.push({ msg, fix });

function checkNode() {
  const major = parseInt(process.versions.node.split(".")[0], 10);
  if (major >= 18) ok(`Node ${major} is new enough`);
  else problem(`Node ${process.versions.node} is too old for the dev server`, "Install the current Node from nodejs.org, then reopen your editor.");
  if (existsSync(resolve(root, "node_modules/vite"))) ok("Dependencies are installed");
  else problem("Dependencies are not installed, so the tool cannot start", "Run: npm install");
}

function listCompanies() {
  const idxPath = resolve(COMPANIES_DIR, "index.json");
  if (!existsSync(idxPath)) {
    note("No companies yet (public/data/companies/index.json is missing). Create one from the home page or run: npm run import-company");
    return [];
  }
  const r = readJsonSafe(idxPath);
  if (!r.ok || !Array.isArray(r.data.companies)) {
    problem("public/data/companies/index.json has broken JSON, so no company can load", "Ask the AI to fix the JSON (usually a missing or extra comma).");
    return [];
  }
  const listed = r.data.companies.map((c) => c && c.slug).filter(Boolean);
  const onDisk = existsSync(COMPANIES_DIR)
    ? readdirSync(COMPANIES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : [];
  for (const slug of onDisk) {
    if (!listed.includes(slug)) note(`Company folder "${slug}" exists on disk but is not in companies/index.json, so it does not show in the switcher.`);
  }
  for (const slug of listed) {
    if (!existsSync(resolve(COMPANIES_DIR, slug))) problem(`Company "${slug}" is listed but its folder is missing`, `Ask the AI to remove it from companies/index.json or recreate public/data/companies/${slug}/.`);
  }
  if (listed.length) ok(`${listed.length} compan${listed.length === 1 ? "y" : "ies"}: ${listed.join(", ")}`);
  return listed;
}

function listedProjects(base) {
  const r = readJsonSafe(resolve(base, "projects/index.json"));
  if (!r.ok || !Array.isArray(r.data.projects)) return [];
  return r.data.projects.map((p) => p.id).filter(Boolean);
}

function checkCompanyData(slug) {
  const base = resolve(COMPANIES_DIR, slug);
  const rel = (p) => `public/data/companies/${slug}/${p}`;
  const targets = [{ rel: "projects/index.json", required: true }, { rel: "design-system/registry.json", required: false }, { rel: "captures/config.json", required: false }];
  const projects = listedProjects(base);
  for (const id of projects) {
    targets.push({ rel: `projects/${id}/project.json`, required: true });
    targets.push({ rel: `projects/${id}/canvas.json`, required: true });
    targets.push({ rel: `projects/${id}/prototypes/index.json`, required: false });
  }
  const projectsDir = resolve(base, "projects");
  const onDisk = existsSync(projectsDir) ? readdirSync(projectsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];
  for (const id of onDisk) {
    if (!projects.includes(id)) note(`${slug}: project folder "${id}" is on disk but not in projects/index.json, so it is invisible in the tool.`);
  }
  let checked = 0;
  let bad = 0;
  for (const t of targets) {
    const abs = resolve(base, t.rel);
    if (!existsSync(abs)) {
      if (t.required) problem(`${rel(t.rel)} is missing, so part of the tool will show nothing`, "Ask the AI to recreate it from the folder contents.");
      continue;
    }
    checked++;
    const r = readJsonSafe(abs);
    if (!r.ok) {
      bad++;
      problem(`${rel(t.rel)} has broken JSON (${r.error})`, "Ask the AI to fix the JSON (usually a missing or extra comma).");
    }
  }
  if (checked && !bad) ok(`${slug}: all ${checked} data files are valid JSON`);

  let missing = 0;
  let orphans = 0;
  let total = 0;
  for (const id of projects) {
    const r = readJsonSafe(resolve(base, `projects/${id}/canvas.json`));
    if (!r.ok || !Array.isArray(r.data.screens)) continue;
    const screensDir = resolve(base, `projects/${id}/screens`);
    const files = existsSync(screensDir) ? readdirSync(screensDir).filter((f) => f.endsWith(".html")) : [];
    const inCanvas = new Set(r.data.screens.map((s) => s.file));
    total += inCanvas.size;
    for (const s of r.data.screens) {
      if (!s.file || !files.includes(s.file)) {
        missing++;
        problem(`${slug}/${id}: canvas.json lists "${s.file}" but that screen file does not exist`, "Ask the AI to create the screen file or remove its canvas.json entry.");
      }
    }
    for (const f of files) if (!inCanvas.has(f)) orphans++;
  }
  if (total && !missing) ok(`${slug}: all canvas screens point to files that exist`);
  if (orphans) note(`${slug}: ${orphans} screen file(s) exist on disk but are not on any canvas.`);

  checkStylesheetDepth(slug, base);
}

// Screens and prototypes link to the tool's CSS with relative paths; a wrong depth means unstyled pages.
function checkStylesheetDepth(slug, base) {
  let wrong = 0;
  const walk = (dir, depth) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fp = resolve(dir, entry.name);
      if (entry.isDirectory()) { walk(fp, depth + 1); continue; }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(fp, "utf8");
      const m = html.match(/href="((?:\.\.\/)+)styles\/(?:shared|ds)\.css"/);
      if (m && m[1].length / 3 !== depth) {
        wrong++;
        if (wrong <= 5) problem(`${slug}: ${fp.replace(root + "/", "")} links the tool CSS with the wrong number of ../ (has ${m[1].length / 3}, needs ${depth})`, "Ask the AI to fix the stylesheet links so the page is styled.");
      }
    }
  };
  // public/data/companies/<slug>/projects is 4 levels below public/, so a file directly in projects/ needs 4 ../
  walk(resolve(base, "projects"), 4);
  if (wrong > 5) note(`${slug}: ${wrong - 5} more files have the same stylesheet depth problem.`);
  if (!wrong) ok(`${slug}: screens and prototypes link the tool CSS correctly`);
}

function main() {
  console.log("Design Core doctor\n");
  checkNode();
  for (const slug of listCompanies()) checkCompanyData(slug);
  for (const m of oks) console.log(`[ok] ${m}`);
  for (const m of notes) console.log(`[note] ${m}`);
  for (const p of problems) {
    console.log(`\n[problem] ${p.msg}`);
    console.log(`   Fix: ${p.fix}`);
  }
  console.log("");
  if (problems.length) {
    console.log(`${problems.length} problem(s) found. Your AI assistant can apply the fixes above.`);
    process.exit(1);
  }
  console.log("Everything looks good.");
}

main();
