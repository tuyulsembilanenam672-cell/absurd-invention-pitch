// absurd-invention-pitch — one-sentence absurd invention pitch.
// Writes a single sentence pitching a ridiculous invention that fixes a
// tiny everyday annoyance, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SENTENCE =
  "The Haiku Doorbell makes every visitor state their business in seventeen syllables before it rings, so salespeople leave in verse.";

const MAX_CODE_POINTS = 220;

function codePoints(text: string): number {
  return [...text].length;
}

function main(): void {
  const count = codePoints(SENTENCE);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(
      `sentence must be 1-${MAX_CODE_POINTS} code points, got ${count}`,
    );
  }
  // single line: no newline characters allowed anywhere in the sentence
  if (SENTENCE.includes("\n") || SENTENCE.includes("\r")) {
    throw new Error("sentence must be a single line");
  }
  if (SENTENCE.trim().length === 0) {
    throw new Error("sentence must not be only whitespace");
  }

  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, SENTENCE, "utf8");
  console.log(`Wrote ${count} code points to ${outPath}`);
}

main();
