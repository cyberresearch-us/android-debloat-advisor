/**
 * Offline test: classifies every package in docs/test-packages.txt against
 * data/rules.json and prints a summary + any "remove" suggestions.
 * Run from repo root: node scripts/test-rules.mjs
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const rules = JSON.parse(readFileSync(join(root, "data", "rules.json"), "utf8"));
const raw   = readFileSync(join(root, "docs", "test-packages.txt"), "utf8");

// --- parse (package name is always after the LAST '=' — data paths contain '==' hashes) ---
const pkgs = [];
for (const line of raw.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("package:")) continue;
  const lastEq = trimmed.lastIndexOf("=");
  if (lastEq < 0) continue;
  const pkg  = trimmed.slice(lastEq + 1).trim();
  const path = trimmed.slice("package:".length, lastEq).trim();
  if (pkg) pkgs.push({ path, pkg });
}

// --- classify ---
function classify(pkg) {
  if (rules.criticalPackages.includes(pkg))
    return { action: "keep", cat: "Critical (core)", reason: "Core system or Play Services." };
  for (const cat of rules.categories) {
    if (cat.packages.includes(pkg) || cat.prefixes.some(p => pkg === p || pkg.startsWith(p)))
      return { action: cat.defaultAction, cat: cat.label, reason: cat.reason };
  }
  return { action: "review", cat: "Unlisted", reason: "No rule matched." };
}

const results = pkgs.map(({ path, pkg }) => ({ path, pkg, ...classify(pkg) }));

// --- summary ---
const counts = { remove: 0, keep: 0, review: 0 };
for (const r of results) counts[r.action] = (counts[r.action] || 0) + 1;

console.log(`\n=== Android Package Advisor — offline test ===`);
console.log(`Total packages : ${pkgs.length}`);
console.log(`  remove       : ${counts.remove}`);
console.log(`  keep         : ${counts.keep}`);
console.log(`  review       : ${counts.review}`);

console.log(`\n--- Suggested REMOVE (${counts.remove} packages) ---`);
for (const r of results.filter(r => r.action === "remove"))
  console.log(`  [${r.cat}]\n    ${r.pkg}`);

console.log(`\n--- Suggested KEEP (matched rules, ${counts.keep} packages) ---`);
for (const r of results.filter(r => r.action === "keep" && r.cat !== "Critical (core)"))
  console.log(`  [${r.cat}]  ${r.pkg}`);

console.log(`\n--- Review (no specific rule, ${counts.review} packages) ---`);
console.log("  (too many to list — these are 'unlisted' system/vendor packages, review manually in the UI)\n");
