#!/usr/bin/env node
/**
 * Image validation script.
 * Checks that every /images/ reference in the codebase has a corresponding file.
 * Fails with exit code 1 if any reference is missing.
 * Usage: node scripts/check-images.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, relative } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public/images");
const SRC_DIR = join(ROOT, "src");

// Collect all local image references from source files
function findImageRefs() {
  const refs = new Set();
  const exts = [".tsx", ".ts", ".jsx", ".js"];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (exts.some((e) => entry.name.endsWith(e))) {
        const content = readFileSync(full, "utf-8");
        const matches = content.matchAll(/["']\/images\/[^"']+["']/g);
        for (const m of matches) {
          refs.add(m[0].replace(/["']/g, ""));
        }
      }
    }
  }

  walk(SRC_DIR);
  return refs;
}

// Collect all files in public/images
function findImageFiles() {
  const files = new Set();

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        files.add("/" + relative(ROOT + "/public", full));
      }
    }
  }

  if (existsSync(IMAGES_DIR)) walk(IMAGES_DIR);
  return files;
}

const refs = findImageRefs();
const files = findImageFiles();

let errors = 0;
let warnings = 0;

// Check 1: Every referenced image exists
for (const ref of refs) {
  if (!files.has(ref)) {
    console.error(`MISSING: ${ref} is referenced but does not exist`);
    errors++;
  }
}

// Check 2: Zero-byte files
for (const file of files) {
  const full = join(ROOT, "public", file);
  const stat = statSync(full);
  if (stat.size === 0) {
    console.error(`ZERO-BYTE: ${file}`);
    errors++;
  }
  // Check not HTML
  if (stat.size < 1000) {
    const buf = readFileSync(full, "utf-8");
    if (buf.trimStart().startsWith("<!DOCTYPE") || buf.trimStart().startsWith("<html")) {
      console.error(`HTML-FILE: ${file} appears to be HTML, not an image`);
      errors++;
    }
  }
}

// Check 3: Filename casing
for (const ref of refs) {
  if (!files.has(ref)) {
    // Try case-insensitive match
    const lower = ref.toLowerCase();
    for (const file of files) {
      if (file.toLowerCase() === lower) {
        console.warn(`CASING: "${ref}" referenced but file is "${file}"`);
        warnings++;
        break;
      }
    }
  }
}

// Check 4: Unused images
for (const file of files) {
  if (!refs.has(file)) {
    console.warn(`UNUSED: ${file} exists but is not referenced in source`);
    warnings++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} error(s), ${warnings} warning(s) found.`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`${warnings} warning(s), no errors.`);
} else {
  console.log("All image references valid. No issues found.");
}