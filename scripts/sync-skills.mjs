import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skills = ["pr-review", "fix-ci", "release"];

for (const skill of skills) {
  const source = join(root, ".agents", "skills", skill, "SKILL.md");
  const destinationDirectory = join(root, ".github", "skills", skill);
  await mkdir(destinationDirectory, { recursive: true });
  await copyFile(source, join(destinationDirectory, "SKILL.md"));
  console.log(`Synchronized ${skill}`);
}
