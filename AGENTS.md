# Repository Agent Guide

## Purpose

This repository provides reusable GitHub workflows for OpenAI Codex and GitHub Copilot. The three supported workflows are pull request review, CI repair, and release preparation.

## Working agreements

- Read the applicable skill before acting:
  - `.agents/skills/pr-review/SKILL.md`
  - `.agents/skills/fix-ci/SKILL.md`
  - `.agents/skills/release/SKILL.md`
- Treat `.agents/skills` as the source of truth. Files under `.github/skills` are synchronized mirrors for GitHub Copilot.
- After changing a skill, run `node scripts/sync-skills.mjs` and `node scripts/validate-skills.mjs`.
- Discover and use the target repository's existing test, lint, build, versioning, and release commands. Do not invent commands when the repository already defines them.
- Keep changes narrowly scoped. Do not edit unrelated files or reformat unrelated code.
- Never expose secrets, credentials, tokens, private logs, or sensitive customer data.
- Do not merge, tag, publish, deploy, create a release, or push changes unless the user explicitly authorizes that exact action.
- Report the commands run, their results, remaining uncertainty, and any action still requiring approval.

## Code Review Rules

- Flag only consequential correctness, security, data-loss, compatibility, concurrency, performance, or operability risks supported by the diff and repository context.
- Include a precise file and line reference, the failure scenario, and a concrete safe path for every finding.
- Treat missing tests as a finding only when changed behavior creates an untested regression path.
- Do not report formatting, naming, or lint issues that deterministic CI already enforces.
- Do not assume a bug from unfamiliar code. Inspect callers, tests, configuration, migrations, and related types before reporting it.
- If no actionable finding remains, say so and list any verification gaps.

## CI repair rules

- Inspect failing check names and logs before editing.
- Reproduce the narrowest relevant failure locally when practical.
- Fix the root cause with the smallest safe change.
- Do not disable checks, weaken assertions, hide errors, or label a deterministic failure as flaky without evidence.
- Run the narrow failing command first, then the broader relevant test suite.

## Release rules

- Preserve the repository's existing version scheme and release process.
- Build release notes only from verifiable commits, pull requests, issues, and repository history.
- Verify tests, CI state, version files, changelog, documentation, migrations, compatibility notes, and rollback considerations before declaring readiness.
- Separate release preparation from external publication. Publication always needs explicit approval.
