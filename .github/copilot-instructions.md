# GitHub Copilot repository instructions

This repository is a reusable workflow template for PR review, CI repair, and release preparation.

- Follow the root `AGENTS.md` for shared safety, review, CI, and release rules.
- Use the matching task skill under `.github/skills`:
  - `pr-review` for pull requests, branches, patches, and diffs.
  - `fix-ci` for failing GitHub Actions or local test, lint, type-check, and build jobs.
  - `release` for release readiness, changelog, version, tag, and release-note work.
- Read the selected `SKILL.md` completely before acting.
- Prefer repository-native commands and existing automation.
- Keep changes minimal and avoid unrelated cleanup.
- Cite files and lines for review findings and attach command evidence for CI or release conclusions.
- Do not merge, push, publish, tag, deploy, or create a GitHub release unless the user explicitly requests that exact action.

The canonical skill files are under `.agents/skills`. The `.github/skills` copies are synchronized for Copilot compatibility; do not edit the mirrors directly.
