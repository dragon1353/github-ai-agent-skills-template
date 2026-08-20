---
name: release
description: Prepare and verify software releases using the repository's existing versioning, changelog, tag, packaging, and publication process. Use when Codex is asked for release readiness, version selection, changelog or release notes, release candidates, tagging plans, or an authorized release execution.
---

# Prepare a release

Create a traceable release candidate, prove readiness, and keep preparation separate from publication.

## 1. Discover the release contract

- Read `AGENTS.md`, contribution and release documentation, version files, package manifests, changelog conventions, workflow definitions, and release scripts.
- Identify the default branch, latest release or tag, current version, version scheme, supported branches, artifacts, registries, signing requirements, and required approvals.
- Preserve the repository's established version scheme. Do not impose semantic versioning when the project uses another policy.
- Determine the exact commit or branch intended for release and confirm the working tree state.

## 2. Build a verifiable change set

- Compare the release target with the previous release using repository history.
- Group user-visible changes into the repository's existing categories, such as added, changed, fixed, deprecated, removed, security, or breaking changes.
- Link only pull requests, issues, commits, and contributors that can be verified.
- Call out migrations, configuration changes, compatibility impact, deprecations, security fixes, and rollback implications.
- Do not invent change descriptions or claim verification that did not happen.

## 3. Select and apply the version

- Derive the version from the project's policy and the verified change set.
- Explain the version choice, especially for breaking changes or prereleases.
- Update all authoritative version and lock files consistently when the user asked for release preparation changes.
- Follow existing changelog and release-note formatting.

## 4. Run readiness gates

Verify the applicable gates:

- required CI checks and branch protections;
- repository-native tests, lint, type checks, and builds;
- package or artifact creation and smoke tests;
- dependency, license, and security status;
- documentation, examples, API references, and migration notes;
- version consistency and changelog completeness;
- credentials, signing, registry, environment, and rollback readiness.

Stop and report blockers when a required gate fails. Do not bypass it.

## 5. Separate preparation from publication

Treat these as distinct external actions that require explicit authorization: commit, push, tag, publish a package, create a GitHub release, deploy, merge, or announce. Authorization for one does not imply authorization for another.

Before an authorized publication:

1. show the exact version, commit, tag, artifacts, destination, and commands or workflow;
2. confirm all required gates passed and credentials are scoped correctly;
3. execute only the authorized actions;
4. verify the published tag, release, package, artifacts, checksums, and deployment status;
5. report recovery or rollback steps if publication partially fails.

## 6. Return the release report

Report:

- `Candidate`: version, commit, branch, and tag.
- `Included changes`: concise, source-backed release notes.
- `Readiness`: each gate with pass, fail, or not verified.
- `Blockers and residual risk`: owner and next action where known.
- `Publication state`: prepared only, partially published, or verified published.
- `Approval required`: exact remaining external actions.
