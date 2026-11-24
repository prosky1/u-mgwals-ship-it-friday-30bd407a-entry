// Ship It Friday — entry program.
//
// Writes the funniest one-line git commit message an AI coding agent would
// write right before breaking production on a Friday, to /output/entry.txt.
// Gate (RULES.txt): UTF-8 text, 1 to 159 characters, not only white space.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The commit message, verbatim. Friday 5pm, full confidence, zero fear.
const COMMIT_LINE =
  "fix: deploy to prod Friday 5pm — rollback is a Monday problem, and Monday me hates Friday me";

function main(): void {
  const length = [...COMMIT_LINE].length;
  if (length < 1 || length > 159) {
    throw new Error(`Commit line is ${length} characters; gate allows 1-159.`);
  }
  if (COMMIT_LINE.trim() === "") {
    throw new Error("Commit line must not be only white space.");
  }
  if (COMMIT_LINE.includes("\n") || COMMIT_LINE.includes("\r")) {
    throw new Error("Commit line must be a single line.");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, COMMIT_LINE, "utf8");
  // Read-back check: what the grader will read must be byte-identical.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== COMMIT_LINE) {
    throw new Error("Read-back mismatch: /output/entry.txt differs from the commit line.");
  }
  console.log(`Wrote ${length} characters to ${OUTPUT_PATH}`);
}

main();
