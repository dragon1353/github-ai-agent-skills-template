---
name: pr-review
description: Review GitHub pull requests, branches, patches, or local diffs for actionable correctness, security, compatibility, performance, operability, and test risks. Use when Codex is asked to review code changes, prepare review findings, assess merge risk, or perform a pre-merge audit. Do not use for implementing fixes unless the user also asks for changes.
---

# Review a pull request

Produce a high-signal, evidence-based review. Prefer no finding over a speculative finding.

## 1. Establish scope

- Identify the base and head refs, pull request intent, changed files, and applicable `AGENTS.md` instructions.
- If the intended behavior is unclear, infer it from the issue, PR description, tests, documentation, and surrounding code. State material uncertainty.
- Keep the review read-only. Do not post comments, approve, request changes, or modify code unless the user explicitly asks for that action.

## 2. Inspect the change in context

- Read the complete diff and inspect affected callers, tests, types, configuration, migrations, dependency files, and public interfaces.
- Trace changed inputs through side effects and outputs. Check error paths, boundary values, authorization, secret handling, concurrency, cleanup, retries, and backward compatibility when relevant.
- Compare new behavior with existing tests and repository conventions.
- Run focused, non-mutating checks when they materially increase confidence.

## 3. Qualify findings

Report a finding only when all are true:

1. The changed code introduces or exposes the problem.
2. A realistic failure scenario can be explained.
3. The impact is consequential.
4. The finding points to a precise changed line or the smallest relevant range.
5. A concrete safe path or correction exists.

Use these priorities:

- `P0` — immediate catastrophic impact or broad compromise.
- `P1` — likely serious regression, security issue, data loss, or release blocker.
- `P2` — real functional defect with limited impact or a meaningful missing guard.
- `P3` — low-impact defect worth fixing; omit preferences and optional cleanup.

Do not report style, formatting, naming, or lint issues already enforced by CI. Do not request tests without naming the untested behavior and regression path.

## 4. Return the review

List findings first, ordered by priority and then file location. Use this format:

```text
[P1] Short imperative title — path/to/file.ext:line
Failure scenario and impact. Explain why the diff causes it and give the safe path.
```

Then include:

- `Verification`: checks run and relevant results.
- `Open questions`: only questions that materially affect merge safety.
- `Residual risk`: important areas not verified because logs, services, credentials, or environments were unavailable.

If there are no findings, say `No actionable findings.` Do not invent filler findings. Still report verification and residual risk.
