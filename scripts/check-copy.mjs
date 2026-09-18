#!/usr/bin/env node
/**
 * Copy lint, phase 6 of the build brief.
 *
 * Fails the build on the two house rules that are easy to break by accident and
 * hard to spot in review: em dashes, and the banned marketing words.
 *
 * Scope is the copy and code that ships on the site. content/resources/files is
 * skipped because it holds the lead magnet deliverables: the PDFs themselves,
 * which are binary, and the HTML they were rendered from. Those are designed
 * artefacts rather than site copy, and they are checked by eye when rebuilt.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN = ["content", "app", "components", "lib"];
const SKIP = new Set(["node_modules", ".next", ".git", "files"]);
const EXTENSIONS = new Set([".json", ".mdx", ".md", ".ts", ".tsx", ".css"]);

const EM_DASH = "—";
const BANNED = ["unlock", "empower", "elevate", "solutions", "leverage"];

/** Whole word, case insensitive, so "resolutions" never trips "solutions". */
const BANNED_PATTERN = new RegExp(`\\b(${BANNED.join("|")})\\b`, "gi");

function walk(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      entries.push(...walk(path));
    } else if (EXTENSIONS.has(extname(name))) {
      entries.push(path);
    }
  }
  return entries;
}

const failures = [];

for (const target of SCAN) {
  const dir = join(ROOT, target);
  let files;
  try {
    files = walk(dir);
  } catch {
    continue;
  }

  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      const where = `${relative(ROOT, file)}:${index + 1}`;

      if (line.includes(EM_DASH)) {
        failures.push({ where, rule: "em dash", line: line.trim() });
      }

      for (const match of line.matchAll(BANNED_PATTERN)) {
        failures.push({
          where,
          rule: `banned word "${match[1].toLowerCase()}"`,
          line: line.trim(),
        });
      }
    });
  }
}

/**
 * The social card sets a resource title in Anton at 92px once it passes 18
 * characters. Past 25 it wraps to a third line the card cannot fit, so the cap
 * is enforced here rather than discovered on LinkedIn.
 */
const RESOURCE_TITLE_LIMIT = 25;
const resourceDir = join(ROOT, "content", "resources");

try {
  for (const name of readdirSync(resourceDir)) {
    if (extname(name) !== ".json") continue;
    const file = join(resourceDir, name);
    const { title } = JSON.parse(readFileSync(file, "utf8"));
    const length = title.replace(/\.$/, "").length;
    if (length > RESOURCE_TITLE_LIMIT) {
      failures.push({
        where: relative(ROOT, file),
        rule: `resource title is ${length} characters, the social card fits ${RESOURCE_TITLE_LIMIT}`,
        line: title,
      });
    }
  }
} catch {
  // No resources directory yet, nothing to check.
}

if (failures.length === 0) {
  console.log("Copy lint passed. No em dashes, no banned words.");
  process.exit(0);
}

console.error(`Copy lint failed with ${failures.length} problem(s):\n`);
for (const { where, rule, line } of failures) {
  const excerpt = line.length > 110 ? `${line.slice(0, 110)}...` : line;
  console.error(`  ${where}\n    ${rule}\n    ${excerpt}\n`);
}
if (failures.some(({ rule }) => rule === "em dash")) {
  console.error("Use a comma, a full stop or a colon instead of an em dash.");
}
process.exit(1);
