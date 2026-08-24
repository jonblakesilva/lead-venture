#!/usr/bin/env node
/**
 * check-placeholders.js
 * Run after `npm run build`. Scans dist/*.html for unreplaced template
 * placeholders and exits non-zero if any are found, failing CI before deploy.
 */

import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");

// Plain string patterns — case-sensitive
const STRING_CHECKS = [
  {
    label: "Business name",
    strings: ["Your Business Name"],
  },
  {
    label: "City placeholder",
    strings: ["Your City", "Nearby City", "Another City", "Third City"],
  },
  {
    // comma-space-ST is the rendered form of the "ST" state placeholder
    label: "State placeholder",
    strings: [", ST"],
  },
  {
    label: "ZIP placeholder",
    strings: ["00000"],
  },
  {
    label: "Domain placeholder",
    strings: ["yourbusiness.com", "yourdomain.com"],
  },
  {
    label: "Email placeholder",
    strings: ["hello@yourbusiness.com"],
  },
  {
    label: "Phone placeholder",
    strings: ["(555) 555-5555", "5555555555"],
  },
  {
    label: "Token placeholder",
    strings: ["REPLACE_WITH"],
  },
  {
    label: "License placeholder",
    strings: ["LIC-000000"],
  },
  {
    label: "Default testimonial name",
    strings: ["Sarah M.", "David R.", "Jennifer L."],
  },
  {
    label: "Default service name",
    strings: [
      "Service One",
      "Service Two",
      "Service Three",
      "Service Four",
      "Service Five",
    ],
  },
];

// Regex patterns (global flag required — lastIndex is reset per file)
const REGEX_CHECKS = [
  {
    label: "Bracketed placeholder",
    // Matches [OWNER NAME], [Service One], [X days], etc.
    regex: /\[[A-Z][A-Za-z\s/]+\]/g,
  },
];

function walkHtml(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtml(full));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function snippet(content, idx, matchLen) {
  const CONTEXT = 70;
  const start = Math.max(0, idx - CONTEXT);
  const end = Math.min(content.length, idx + matchLen + CONTEXT);
  const raw = content.slice(start, end).replace(/\s+/g, " ").trim();
  return (start > 0 ? "…" : "") + raw + (end < content.length ? "…" : "");
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  // Deduplicate per (label, matched) — show count + first occurrence snippet
  const seen = new Map();

  function record(label, matched, idx) {
    const key = `${label}|${matched}`;
    if (seen.has(key)) {
      seen.get(key).count++;
    } else {
      seen.set(key, {
        label,
        matched,
        snip: snippet(content, idx, matched.length),
        count: 1,
      });
    }
  }

  for (const { label, strings } of STRING_CHECKS) {
    for (const str of strings) {
      let i = 0;
      while ((i = content.indexOf(str, i)) !== -1) {
        record(label, str, i);
        i += str.length;
      }
    }
  }

  for (const { label, regex } of REGEX_CHECKS) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(content)) !== null) {
      record(label, m[0], m.index);
    }
  }

  return {
    relPath: path.relative(DIST_DIR, filePath),
    hits: [...seen.values()],
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!fs.existsSync(DIST_DIR)) {
  console.error(`ERROR: ${DIST_DIR} not found — run "npm run build" first.`);
  process.exit(1);
}

const htmlFiles = walkHtml(DIST_DIR);
const results = htmlFiles
  .map(checkFile)
  .filter((r) => r.hits.length > 0)
  .sort((a, b) => a.relPath.localeCompare(b.relPath));

if (results.length === 0) {
  console.log("✅  No placeholders detected — safe to deploy.");
  process.exit(0);
}

let totalHits = 0;

for (const { relPath, hits } of results) {
  console.log(`\n📄  ${relPath}`);
  for (const { label, matched, snip, count } of hits) {
    const times = count > 1 ? ` (×${count})` : "";
    console.log(`   [${label}]${times}  "${matched}"`);
    console.log(`   ↳  ${snip}`);
  }
  totalHits += hits.length;
}

const fileWord = results.length === 1 ? "file" : "files";
console.log(
  `\n❌  ${totalHits} placeholder type(s) across ${results.length} ${fileWord}. Fix before deploying.`
);
process.exit(1);
