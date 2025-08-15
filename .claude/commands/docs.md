---
command: docs
description: 📖 Module Documentation Update Command
---

# 📖 Module Documentation Update Command

Professional documentation generation and update command that leverages module-specific agents for accurate, comprehensive documentation.

## Usage

```bash
/docs [module]    # Update documentation for specific module
/docs all         # Update documentation for all modules (sequential)
```

## Execution Flow

### Phase 1: Module Identification

```yaml
MODULE_DETECTION:
  From argument:
    - Extract module name from command
    - Validate module exists
    - Identify corresponding agent

  Special cases:
    - "all": Process all detected modules
    - No argument: Show available modules
```

### Phase 2: Agent Invocation

```yaml
AGENT_EXECUTION:
  Single Module:
    - Invoke [module]-agent with documentation task
    - Agent analyzes current documentation state
    - Generates comprehensive updates

  All Modules:
    - Detect all project modules
    - Invoke agents sequentially (not parallel)
    - Each agent updates its own documentation
```

### Phase 3: Documentation Generation

```yaml
DOCUMENTATION_SCOPE:
  Per Module:
    README.md:
      - Module overview
      - Installation instructions
      - Configuration options
      - Usage examples
      - API reference

    API Documentation:
      - Endpoint descriptions
      - Request/response schemas
      - Authentication details
      - Error codes
      - Rate limiting

    Code Documentation:
      - Inline comments (JSDoc/PHPDoc)
      - Function descriptions
      - Parameter explanations
      - Return values
      - Usage examples

    Architecture:
      - System design
      - Data flow
      - Integration points
      - Dependencies
      - Performance notes
```

### Phase 4: Quality Validation

```yaml
QUALITY_CHECKS:
  Automated:
    - Code examples syntax check
    - Link validation
    - Format consistency
    - Completeness check

  Content:
    - Technical accuracy
    - Clear language
    - Progressive complexity
    - Troubleshooting coverage
```

## Command Implementation

```javascript
async function updateDocumentation(moduleName) {
  // Phase 1: Module identification
  if (!moduleName) {
    return showAvailableModules();
  }

  if (moduleName === "all") {
    return updateAllModules();
  }

  // Validate module exists
  const agentName = `${moduleName}-agent`;
  if (!agentExists(agentName)) {
    return error(
      `Module '${moduleName}' not found. Use /docs to see available modules.`
    );
  }

  // Phase 2: Invoke module agent
  console.log(`📚 Updating documentation for ${moduleName} module...`);

  const task = {
    agent: agentName,
    prompt: `Update all documentation for the ${moduleName} module following professional standards:
    
    1. Analyze current documentation state
    2. Identify outdated or missing sections
    3. Generate/update:
       - README.md with overview, setup, usage
       - API documentation if applicable
       - Code comments and annotations
       - Configuration references
       - Troubleshooting guide
    4. Ensure all examples are tested and working
    5. Follow markdown best practices
    6. Keep language clear and concise
    
    Focus on practical, developer-friendly documentation that helps users quickly understand and use the module.`,
    context: {
      module: moduleName,
      files: await getModuleFiles(moduleName),
      existing_docs: await getExistingDocs(moduleName),
    },
  };

  const result = await Task(task);

  // Phase 3: Report results
  console.log(`✅ Documentation updated for ${moduleName}`);
  console.log(`Files modified:`);
  result.files_updated.forEach((file) => {
    console.log(`  - ${file}`);
  });

  return success("Documentation update complete");
}

async function updateAllModules() {
  const modules = await detectProjectModules();
  console.log(`📚 Updating documentation for ${modules.length} modules...`);

  for (const module of modules) {
    console.log(`\n▶ Processing ${module}...`);
    await updateDocumentation(module);
  }

  return success("All module documentation updated");
}

async function showAvailableModules() {
  const modules = await detectProjectModules();

  console.log("📚 Available modules for documentation:");
  modules.forEach((module) => {
    console.log(`  - ${module}`);
  });

  console.log("\nUsage:");
  console.log("  /docs [module]  - Update specific module");
  console.log("  /docs all       - Update all modules");

  return success("Module list displayed");
}
```

## Examples

### Update single module:

```bash
/docs auth
# Output:
📚 Updating documentation for auth module...
  ✓ Analyzing current documentation
  ✓ Updating README.md
  ✓ Generating API documentation
  ✓ Updating code comments
  ✓ Creating troubleshooting guide

✅ Documentation updated for auth
Files modified:
  - modules/auth/README.md
  - modules/auth/API.md
  - modules/auth/TROUBLESHOOTING.md
  - src/auth/services/AuthService.php (comments)
```

### Update all modules:

```bash
/docs all
# Output:
📚 Updating documentation for 5 modules...

▶ Processing auth...
  ✓ Documentation updated

▶ Processing api...
  ✓ Documentation updated

▶ Processing database...
  ✓ Documentation updated

▶ Processing cache...
  ✓ Documentation updated

▶ Processing queue...
  ✓ Documentation updated

✅ All module documentation updated
```

### Show available modules:

```bash
/docs
# Output:
📚 Available modules for documentation:
  - auth
  - api
  - database
  - cache
  - queue
  - notifications
  - payments

Usage:
  /docs [module]  - Update specific module
  /docs all       - Update all modules
```

## Documentation Standards

### Generated Documentation Structure

```yaml
module_folder/
  README.md:          # Module overview
  API.md:            # API documentation
  CONFIGURATION.md:  # Config options
  TROUBLESHOOTING.md: # Common issues
  CHANGELOG.md:      # Module-specific changes
  examples/:         # Usage examples
    basic.php
    advanced.php
```

### Documentation Quality Criteria

```yaml
quality_standards:
  completeness:
    - All public methods documented
    - All config options explained
    - Common use cases covered
    - Error scenarios documented

  clarity:
    - Simple language preferred
    - Technical terms explained
    - Progressive complexity
    - Visual aids where helpful

  accuracy:
    - Code examples tested
    - Version-specific notes
    - Dependencies listed
    - Performance implications noted

  maintainability:
    - Clear update timestamps
    - Version compatibility notes
    - Deprecation warnings
    - Migration guides
```

## Integration with Other Commands

```yaml
Workflow:
  1. Make code changes
  2. /commit            # Commit changes
  3. /docs [module]     # Update documentation
  4. /commit            # Commit documentation
  5. /pr               # Create pull request
```

## Agent Capabilities Required

Each module agent must have:

- Deep knowledge of its module structure
- Ability to analyze existing documentation
- Understanding of documentation best practices
- Code parsing capabilities for auto-generation
- Markdown formatting expertise

## Error Handling

```yaml
COMMON_ERRORS:
  Module not found:
    - Show available modules
    - Suggest similar names

  No documentation folder:
    - Create structure automatically
    - Follow project conventions

  Agent not available:
    - Check if module has dynamic agent
    - Suggest running /setup first
```

---

_Command designed for ClaudeSquad professional documentation workflow_
