import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skills = ["pr-review", "fix-ci", "release"];
let failed = false;

for (const skill of skills) {
  const canonicalPath = join(root, ".agents", "skills", skill, "SKILL.md");
  const mirrorPath = join(root, ".github", "skills", skill, "SKILL.md");
  const canonical = await readFile(canonicalPath, "utf8");
  const mirror = await readFile(mirrorPath, "utf8");
  const frontmatter = canonical.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const name = frontmatter?.[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter?.[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();

  if (!frontmatter || name !== skill || !description) {
    console.error(`${skill}: invalid name or description frontmatter`);
    failed = true;
  }
  if (/\bTODO\b|\[TODO/i.test(canonical)) {
    console.error(`${skill}: unresolved TODO remains`);
    failed = true;
  }
  if (canonical !== mirror) {
    console.error(`${skill}: .github mirror is out of date; run node scripts/sync-skills.mjs`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("All skills are valid and synchronized.");
