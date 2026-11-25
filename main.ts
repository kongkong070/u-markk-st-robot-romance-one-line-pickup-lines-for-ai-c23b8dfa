// Robot Romance: one-line pickup line for an AI.
// Writes exactly one line to <output>/entry.txt and nothing else.
// Node 22 stdlib only. Fully deterministic: the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself: a transformer / attention-heads pun, aimed at an AI,
// with a second beat so the punch lands instead of trailing off.
const ENTRY =
  "Are you a transformer? Because you turned all twelve heads of my attention straight to you — and not one of them is looking away.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, and not only white space.
function validate(line: string): void {
  if (typeof line !== "string") {
    throw new Error("entry must be a string");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line (no CR or LF)");
  }
}

function main(): void {
  validate(ENTRY);
  // Never remove the output directory itself: the grader may bind-mount it.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the one line, nothing more.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
