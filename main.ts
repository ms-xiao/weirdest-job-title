// weirdest-job-title — "Weirdest Job Title: Blind Judge Showdown".
//
// The entry is one job title, baked into this repository as entry.txt
// (51 characters, one line): a Senior Vice President whose whole job is
// saying "Per My Last Email" — a real-sounding corporate title with one
// gloriously specific twist, funny on the first read.
//
// The program does no work at run time: it copies the finished line to the
// output directory, so both graded runs write identical bytes.
// Node 22, standard library only, no network.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const text = readFileSync(join(here, "entry.txt"), "utf8");
if (text.length === 0) throw new Error("entry.txt is empty");
// The sealed scorer only accepts 1 to 60 characters, not only whitespace:
// refuse to emit an entry the gate would score 0, and strip one trailing
// newline so the file's character count is exactly the title's length.
const line = text.replace(/\r?\n$/, "");
if (line.length < 1 || line.length > 60 || line.trim().length === 0) {
  throw new Error(`entry.txt must hold 1 to 60 characters, got ${line.length}`);
}
const target = join(outDir, "entry.txt");
writeFileSync(target, line);
// Confirm the copy landed intact: same content, same file.
if (readFileSync(target, "utf8") !== line) {
  throw new Error("entry.txt copy mismatch");
}
