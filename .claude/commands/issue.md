---
command: issue
description: 🪲 GitHub Issues Management Command
---

List existing issues or create new ones with intelligent categorization and error analysis.

## Usage

```bash
/issue                    # List all open issues
/issue "error message"    # Create new issue with error/bug description
```

## Mode 1: List Issues (/issue)

### Execution Flow

```yaml
LIST_ISSUES:
  # Use GitHub CLI to get issues
  gh issue list --state open --limit 30

  # Format output
  Display:
    - Issue number
    - Title
    - Labels
    - Assignee
    - Created date
    - Comments count

  # Categorize by type
  Groups:
    🐛 Bugs: label:bug
    ✨ Features: label:enhancement
    📝 Documentation: label:documentation
    🔧 Maintenance: label:chore
    ❓ Questions: label:question
```

## Mode 2: Create Issue (/issue "description")

### Phase 1: Error Analysis

```yaml
ERROR_DETECTION:
  # Analyze the provided error/description
  Parse:
    - Error messages
    - Stack traces
    - File references
    - Module affected

  Context:
    - Recent changes (git log)
    - Related files
    - Similar past issues
```

### Phase 2: Agent Analysis

```yaml
PARALLEL_ANALYSIS:
  error-detective (if exists) or quality-engineer:
    - Analyze error type
    - Identify root cause
    - Suggest fixes

  affected-module-agent:
    - Module-specific context
    - Impact assessment
    - Related components

  security-auditor (if security-related):
    - Security implications
    - Vulnerability assessment
```

### Phase 3: Issue Creation

````yaml
ISSUE_STRUCTURE:
  Title:
    - Format: "[Module] Clear error description"
    - Example: "[Auth] OAuth2 token refresh fails with 401"

  Body:
    ## Description
    Clear description of the issue

    ## Error Details
    ```
    Error message or stack trace
    ```

    ## Steps to Reproduce
    1. Step one
    2. Step two
    3. Error occurs

    ## Expected Behavior
    What should happen instead

    ## Environment
    - OS: Windows/Mac/Linux
    - Node version: x.x.x
    - Project version: x.x.x

    ## Possible Solution
    (From agent analysis)

    ## Related Issues
    - #123 (if found)

  Labels:
    Auto-detect:
      - bug (for errors)
      - enhancement (for features)
      - documentation
      - security (if security-related)
      - priority: high/medium/low
      - module: auth/api/database/etc
````

### Phase 4: GitHub Operations

```yaml
CREATE_ISSUE:
  # Create with gh CLI
  gh issue create \
  --title "<title>" \
  --body "<body>" \
  --label "<labels>"

  # Return issue URL for reference
```

## Command Implementation

```javascript
async function handleIssue(args) {
  // Mode 1: List issues
  if (!args || args.length === 0) {
    const issues = await bash("gh issue list --state open --limit 30");

    // Group by type
    const grouped = groupIssuesByLabel(issues);

    // Display formatted
    console.log("📋 Open Issues:");
    console.log("🐛 Bugs:", grouped.bugs);
    console.log("✨ Features:", grouped.features);
    console.log("📝 Docs:", grouped.docs);

    return success("Issues listed");
  }

  // Mode 2: Create issue
  const description = args.join(" ");

  // Phase 1: Analyze error
  const context = {
    description: description,
    recentCommits: (await mcp__server) - git__git_log({ max_count: 5 }),
    currentBranch: await getCurrentBranch(),
  };

  // Phase 2: Agent analysis
  const tasks = [
    "@quality-engineer analyze error",
    "@security-auditor check security implications",
  ];

  // Add module agent if detected
  const module = detectModuleFromError(description);
  if (module) {
    tasks.push(`@${module}-agent provide context`);
  }

  const results = await executeParallelTasks(tasks, context);

  // Phase 3: Build issue
  const issue = {
    title: generateIssueTitle(description, module),
    body: buildIssueBody(description, results, context),
    labels: detectLabels(description, results),
  };

  // Show preview
  console.log("📝 Issue Preview:");
  console.log("Title:", issue.title);
  console.log("Labels:", issue.labels);

  if (!(await confirm("Create this issue?"))) {
    return abort("Issue creation cancelled");
  }

  // Phase 4: Create issue
  const issueUrl = await bash(`
    gh issue create \
      --title "${issue.title}" \
      --body "${issue.body}" \
      --label "${issue.labels.join(",")}"
  `);

  return success(`Issue created: ${issueUrl}`);
}
```

## Examples

### List issues:

```bash
/issue
# Output:
📋 Open Issues:

🐛 Bugs (3):
  #45 [Auth] Login fails after session timeout
  #42 [API] Memory leak in user endpoint
  #38 [Database] Migration fails on PostgreSQL 15

✨ Features (2):
  #44 Add dark mode support
  #40 Export data to CSV

📝 Documentation (1):
  #41 Update API documentation
```

### Create bug issue:

```bash
/issue "OAuth2 callback returns 404 error after Google login"
# Output:
📊 Analyzing error...
  - Module detected: auth
  - Type: bug
  - Priority: high

📝 Issue Preview:
Title: [Auth] OAuth2 callback returns 404 after Google login
Labels: bug, auth, priority-high

Create issue? (y/n): y
✅ Issue created: https://github.com/user/repo/issues/46
```

### Create with stack trace:

```bash
/issue "TypeError: Cannot read property 'id' of undefined at UserService.js:45"
# Output:
📊 Analyzing error...
  - Error type: TypeError
  - File: UserService.js:45
  - Module: services

🔍 Agent analysis:
  - quality-engineer: Null check missing
  - services-agent: User object not validated

📝 Issue Preview:
Title: [Services] TypeError in UserService.js line 45
Labels: bug, services, type-error

Create issue? (y/n): y
✅ Issue created: https://github.com/user/repo/issues/47
```

## Error Handling

```yaml
COMMON_ERRORS:
  Not authenticated:
    - Message: "GitHub CLI not authenticated"
    - Suggest: Run 'gh auth login'

  No repository:
    - Message: "Not in a git repository"
    - Suggest: Initialize repo first

  Duplicate issue:
    - Check for similar titles
    - Show existing issue if found
    - Ask to create anyway
```

## Smart Features

```yaml
INTELLIGENCE:
  Duplicate Detection:
    - Search existing issues for similar errors
    - Suggest linking instead of creating new

  Auto-labeling:
    - Detect module from file paths
    - Detect priority from keywords (critical, urgent, etc.)
    - Detect type (bug, feature, question)

  Error Patterns:
    - Recognize common error types
    - Suggest known solutions
    - Link to documentation

  FLAGS Integration:
    - If FLAGS exist for the module
    - Include them in issue context
```

## Integration with Other Commands

```yaml
Workflow:
  1. Error occurs during development
  2. /issue "error description"    # Report it
  3. Fix the issue
  4. /commit                        # Commit fix
  5. /pr                           # Create PR
  6. Reference issue in PR: "Fixes #46"
```

---

_Command designed for ClaudeSquad professional workflow_
