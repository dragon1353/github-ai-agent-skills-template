---
name: fix-ci
description: Diagnose and repair failing GitHub Actions, CI pipelines, tests, lint, type checks, builds, packaging, and related automation with the smallest safe change. Use when Codex is asked to investigate a failed check, fix CI, reproduce a pipeline failure, or verify that a CI repair is complete.
---

# Fix a CI failure

Find the first actionable root cause, make the smallest safe repair, and prove the relevant checks pass.

## 1. Collect evidence

- Identify every failed check, its workflow and job, the failing command, the first relevant error, and the commit or environment where it failed.
- Read the workflow file and the repository's setup, test, lint, type-check, build, and package configuration before editing.
- Separate primary failures from cascading failures.
- Redact secrets, tokens, private URLs, and sensitive log content from outputs.

Classify the failure as one of:

- product-code regression;
- test regression;
- dependency or lockfile mismatch;
- CI configuration or permissions;
- environment or toolchain drift;
- external service or infrastructure;
- flaky behavior supported by repeated evidence.

## 2. Reproduce narrowly

- Start with the exact failing command or the narrowest local equivalent.
- Match the CI runtime, dependency manager, lockfile mode, environment variables, working directory, and generated steps when practical.
- If local reproduction is impossible, use the logs and workflow definition as evidence and state the gap.
- Do not repeatedly rerun a failing workflow without a reasoned hypothesis.

## 3. Apply the smallest safe fix

- Fix the root cause and preserve intended coverage and behavior.
- Follow existing repository patterns and avoid unrelated upgrades or refactors.
- Update tests when behavior intentionally changes; do not rewrite a correct assertion merely to make it pass.
- Keep dependency and workflow permission changes minimal and explain why each is required.

Never make CI green by:

- disabling or deleting a required check;
- adding unconditional success or ignoring exit codes;
- weakening assertions or coverage thresholds without an approved behavior change;
- exposing secrets or broadening permissions without necessity;
- declaring a failure flaky without repeatable evidence.

## 4. Verify in layers

Run, in order:

1. the narrow failing test or command;
2. the affected package or component suite;
3. the repository's relevant lint, type-check, build, and test gates;
4. the remote check, only when the user authorized the push or rerun needed to trigger it.

Inspect the final diff for unrelated edits and generated-file noise.

## 5. Return the repair report

Report:

- `Root cause`: the first actionable cause and evidence.
- `Change`: files changed and why.
- `Verification`: exact commands or checks and their results.
- `Remote status`: whether GitHub Actions has confirmed the repair.
- `Remaining risk`: unverified platforms, jobs, services, or flaky behavior.
- `Next action`: only actions still needed, especially any push or rerun requiring approval.
