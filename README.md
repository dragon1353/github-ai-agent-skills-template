# GitHub AI Agent Skills Template

這是一套可直接放進 GitHub repository 的 AI 工作流模板，讓 **OpenAI Codex / Codex CLI / Codex Cloud** 與 **GitHub Copilot** 共用三個任務型 Skills：

- `pr-review`：審查 PR、branch、patch 或 local diff。
- `fix-ci`：診斷並最小化修復 GitHub Actions、test、lint、type-check、build 失敗。
- `release`：準備版本、release notes、readiness 檢查，並在明確授權後發布。

## 檔案結構

```text
.
├── AGENTS.md
├── README.md
├── .agents/skills/              # Codex 自動載入；Skill 唯一來源
│   ├── pr-review/SKILL.md
│   ├── fix-ci/SKILL.md
│   └── release/SKILL.md
├── .github/
│   ├── copilot-instructions.md
│   ├── skills/                  # 給 GitHub Copilot 的同步鏡像
│   │   ├── pr-review/SKILL.md
│   │   ├── fix-ci/SKILL.md
│   │   └── release/SKILL.md
│   └── workflows/validate-skills.yml
└── scripts/
    ├── sync-skills.mjs
    └── validate-skills.mjs
```

目前 Codex 會從 repo 的 `.agents/skills` 掃描 Skill；GitHub Copilot 支援 `.github/skills`、`.agents/skills` 等專案路徑。模板保留兩份相同內容，以符合兩邊最直覺的使用方式；請只修改 `.agents/skills`，再執行同步。

## 1. 套用到你的 repository

新專案可以直接用這個 repo 當起點。既有專案則複製下列內容到專案根目錄：

```text
AGENTS.md
.agents/skills/
.github/copilot-instructions.md
.github/skills/
scripts/sync-skills.mjs
scripts/validate-skills.mjs
```

如果既有 repo 已有 `AGENTS.md` 或 `.github/copilot-instructions.md`，請合併規則，不要直接覆蓋。接著把實際指令補進 `AGENTS.md`，例如：

```markdown
## Repository commands

- Install: `pnpm install --frozen-lockfile`
- Test: `pnpm test`
- Lint: `pnpm lint`
- Type-check: `pnpm typecheck`
- Build: `pnpm build`
```

## 2. Codex Desktop / IDE / CLI 使用方式

從目標 repo 根目錄啟動 Codex。Codex 會讀取根目錄 `AGENTS.md`，並發現 `.agents/skills` 下的 Skills。

在 Codex CLI 或 IDE extension 中，可輸入 `/skills` 查看 Skill，或直接用 `$skill-name` 明確指定：

```text
$pr-review review PR #123 against main. Focus on regressions, security, and missing behavior tests.
```

```text
$fix-ci inspect the failing checks on PR #123, reproduce the first actionable failure, apply the smallest safe fix, and verify it.
```

```text
$release prepare the next release from main. Determine the version from repository policy, draft release notes, run readiness gates, but do not tag or publish.
```

也可以用自然語言讓 Codex 依照 `description` 自動選擇 Skill；重要流程建議明確寫出 `$pr-review`、`$fix-ci` 或 `$release`。

## 3. Codex Cloud / GitHub PR 使用方式

先在 Codex 設定中連接目標 GitHub repository，並讓 repo 內包含本模板的 `AGENTS.md` 與 `.agents/skills`。

- 在 Codex Cloud 建立 task 時，直接使用上面的 `$skill-name` prompts。
- 在 GitHub PR 留言 `@codex review` 可要求 Codex code review。
- 可用 `@codex review for issues in the database migration` 指定一次性焦點。
- `AGENTS.md` 的 `## Code Review Rules` 會提供 repo 級 review 規則。
- Review 發現問題後，可另開 Codex task 使用 `$fix-ci` 或要求實作修正。

`@codex review` 是 GitHub 上的 Code Review 入口；`$pr-review` 則是 Codex task、Desktop、IDE、CLI 內可重複使用的完整審查流程。兩者共用 `AGENTS.md` 的長期規則。

## 4. GitHub Copilot 使用方式

Copilot 會依 prompt 與 Skill 的 `description` 判斷是否載入 `.github/skills`。你也可以明確指定：

```text
Use the pr-review skill to review the current pull request.
```

在 GitHub Copilot CLI 可使用 `/skills list` 查看技能，並用 `/pr-review`、`/fix-ci`、`/release` 明確呼叫。VS Code Agent Mode 也可以在 prompt 寫出 Skill 名稱與任務範圍。

## 5. 建議的三段式工作流

1. **PR Review**：先以 `$pr-review` 做唯讀審查，確認 findings 有明確檔案、行號、失敗情境與影響。
2. **Fix CI**：針對 review 或 Actions 失敗使用 `$fix-ci`，先看 log、再重現、最小修復、分層驗證。
3. **Release**：CI 全綠後使用 `$release` 準備版本與 release notes；tag、push、publish、deploy 各自需要明確授權。

## 6. 維護與驗證

修改 `.agents/skills/*/SKILL.md` 後執行：

```bash
node scripts/sync-skills.mjs
node scripts/validate-skills.mjs
```

GitHub Actions 也會在 push 與 pull request 時檢查 Skill frontmatter、未完成的 TODO，以及兩個路徑是否同步。

## 官方參考

- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI：Review GitHub pull requests with Codex](https://learn.chatgpt.com/docs/third-party/github)
- [GitHub：Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
