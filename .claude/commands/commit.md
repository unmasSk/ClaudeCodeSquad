---
command: commit
description: 🔄 Professional Git Commit Command
---

Intelligent commit system with integrated linting, multi-agent analysis, and automatic changelog generation.

## Usage

```bash
/commit           # Full process: lint + agents analysis + confirmations
/commit --no      # Fast mode: solo specialist-git, sin lint ni agentes dinámicos
```

## Execution Flow

### Mode 1: Standard (/commit)

#### Phase 1: Lint Check

```yaml
DETECT_LINTER:
  JavaScript/TypeScript:
    - ESLint (.eslintrc*)
    - Biome (biome.json)
  Python:
    - Ruff (ruff.toml, pyproject.toml)
    - Flake8 (.flake8)
    - Black (pyproject.toml)
  PHP:
    - PHP_CodeSniffer (phpcs.xml)
    - PHP-CS-Fixer (.php-cs-fixer.php)
    - Pint (pint.json)
  Ruby:
    - RuboCop (.rubocop.yml)
  Go:
    - golangci-lint (.golangci.yml)

EXECUTE:
  - Run linter check
  - If errors found:
    * Show errors summary
    * Ask: "Fix automatically? (y/n)" (skip if --no)
    * If yes: run with --fix flag
    * Re-check after fix
  - If still errors:
    * Block commit or ask to continue
```

#### Phase 2: Git Diff Analysis

```yaml
GIT_DIFF:
  - Use mcp__server-git__git_diff_staged
  - Identify affected files and modules
  - Detect module boundaries from paths
  - Group changes by module

AGENT_DETECTION:
  - Check CLAUDE.md for "Dynamic Agents to Create" section
  - Look for pattern: ClaudeSquad-*-specialist or [project]-*-agent
  - Map file paths to responsible agents:
    * .claude/agents/ → ClaudeSquad-agents-specialist
    * .claude/commands/ → ClaudeSquad-commands-specialist
    * .claude/docs/ → ClaudeSquad-documentation-specialist
    * src/auth/ → auth-agent (if exists)
```

#### Phase 3: Parallel Agent Analysis

```yaml
PARALLEL_EXECUTION:
  # Invoke in single message with multiple Tasks

  Dynamic Agents (1-N based on affected modules):
    - Analyze code quality
    - Security review
    - Check for secrets/keys
    - Validate business logic
    - Create FLAGS if cross-module impacts detected

  specialist-git:
    - Receive diff analysis
    - Determine if split needed
    - Generate commit message(s)

  changelog-specialist:
    - Analyze changes for version impact
    - Prepare CHANGELOG entry
    - Determine version bump (major/minor/patch)
```

#### Phase 4: Aggregation & Review

```yaml
AGGREGATE_RESULTS:
  Security Issues: [CRITICAL/HIGH/MEDIUM/LOW]
  Code Quality: [Pass/Warning/Fail]
  FLAGS Created: [Count and targets]
  Commit Message: [Generated message]
  Version Impact: [major/minor/patch]
  Changelog Entry: [Prepared text]

DECISION_POINT: (skip if --no flag)
  - Show aggregated results
  - "Proceed with commit? (y/n)"
  - If CRITICAL issues: require explicit override
```

#### Phase 5: Execute Commit

```yaml
COMMIT_EXECUTION:
  Single Commit:
    - mcp__server-git__git_commit with message
    - Update CHANGELOG.md if needed
    - Create version tag if release

  Multiple Commits (if split detected):
    - Execute commits in sequence
    - Each with its specific message
    - Maintain logical order
```

### Mode 2: Fast (/commit --no)

```yaml
FAST_MODE:
  # Skip everything except git operations
  - NO lint check
  - NO dynamic agents analysis
  - NO security review
  - NO confirmations

  Direct Flow:
    1. Git diff to see changes
    2. Send ONLY to specialist-git
    3. Get commit message
    4. Execute commit immediately

  Use Case:
    - When you know code is clean
    - Quick fixes
    - Documentation changes
    - Time-sensitive commits
```

## Command Implementation

```javascript
// Pseudo-code for Claude to execute

async function executeCommit(flags) {
  const fastMode = flags.includes("--no");

  // FAST MODE: Solo specialist-git
  if (fastMode) {
    const diff = (await mcp__server) - git__git_diff_staged();

    // Solo invoca specialist-git
    const result = await Task({
      agent: "specialist-git",
      prompt: "Generate commit message for these changes",
      context: diff,
    });

    // Commit inmediato sin confirmación
    (await mcp__server) - git__git_commit(result.message);
    return success("Fast commit completed");
  }

  // STANDARD MODE: Proceso completo
  // Phase 1: Lint
  const lintResult = await runLintCheck();
  if (lintResult.hasErrors) {
    if (await confirm("Fix lint errors?")) {
      await runLintFix();
    } else {
      return abort("Lint errors must be fixed");
    }
  }

  // Phase 2: Git Diff
  const diff = (await mcp__server) - git__git_diff_staged();
  const modules = detectAffectedModules(diff);

  // Phase 3: Parallel Analysis (agentes dinámicos + specialist-git + changelog)
  const tasks = [
    ...modules.map((m) => `@${m}-agent analyze changes`),
    "@specialist-git generate commit message",
    "@changelog-specialist prepare changelog",
  ];

  const results = await executeParallelTasks(tasks);

  // Phase 4: Review
  const summary = aggregateResults(results);
  showSummary(summary);

  if (!(await confirm("Proceed with commit?"))) {
    return abort("Commit cancelled");
  }

  // Phase 5: Commit
  await executeGitCommit(summary.commitMessage);

  if (summary.changelogEntry) {
    await updateChangelog(summary.changelogEntry);
  }

  return success("Commit completed");
}
```

## Examples

### Standard development flow:

```bash
# Make changes to auth module
/commit
# Output:
✓ Lint check passed
📊 Analyzing changes...
  - auth-agent: Security review complete
  - specialist-git: Message generated
  - changelog-specialist: Minor version bump

Commit message:
  feat(auth): add OAuth2 provider support

Proceed? (y/n): y
✅ Committed successfully
```

### Fast mode flow:

```bash
# Quick documentation change
/commit --no
# Output:
✓ Committed: docs(readme): update installation instructions
```

### Multiple module changes:

```bash
/commit
# Output:
⚠️ Changes affect multiple modules (auth, api, database)
specialist-git recommends splitting into 3 commits:
  1. refactor(database): optimize user queries
  2. feat(auth): add role-based permissions
  3. feat(api): expose new permission endpoints

Proceed with split commits? (y/n): y
```

## Error Handling

```yaml
CRITICAL_ERRORS:
  - Secrets/keys detected → Block commit
  - No staged changes → Show help
  - Merge conflicts → Require resolution
  - Failed tests → Show failures, ask to continue

WARNINGS:
  - Code complexity high → Show metrics, allow continue
  - Missing tests → Suggest adding tests
  - Large commit → Suggest splitting
```

## Integration with Other Commands

```yaml
Related Commands:
  /pr: Create pull request after commits
  /issue: Report bugs found during analysis
  /docs: Update documentation if needed
  /changelog: Manual changelog management
```

## Configuration

```yaml
# Future: .claude/commit.config.yml
commit:
  lint:
    enabled: true
    autoFix: true
    blockOnError: false

  analysis:
    security: true
    quality: true
    complexity: true

  changelog:
    enabled: true
    autoVersion: true

  confirmations:
    always: true
    skipOnHotfix: true
```

## Notes

- **IMPORTANT**: Always check CLAUDE.md for list of dynamic agents created
- Dynamic agents may use different naming patterns:
  - ClaudeSquad project: `ClaudeSquad-*-specialist`
  - Laravel projects: `[module]-agent`
  - Check "Dynamic Agents to Create" section in CLAUDE.md
- Dynamic agents create FLAGS, not specialist-git
- specialist-git focuses only on commit messages
- changelog-specialist handles versioning
- Parallel execution saves time (30s vs 2-3min)
- MCP git server provides structured operations

---

_Command designed for ClaudeSquad professional workflow_
