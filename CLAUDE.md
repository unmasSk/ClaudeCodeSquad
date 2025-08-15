# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 MANDATORY SESSION INITIALIZATION

**CRITICAL**: At the start of EVERY conversation about this project, you MUST:

1. **Load project context from Memory Server:**
   ```javascript
   // First, load global user preferences
   mcp__server-memory__search_nodes("GLOBAL-USER-CONTEXT")
   
   // Then, load specific project context
   mcp__server-memory__search_nodes("CLAUDESQUAD-INIT-CONTEXT")
   ```
   This contains all essential project information, user preferences, and current state.

2. **If the search returns empty or Memory Server is not available:**
   - This is the ClaudeSquad project with 77 specialized agents
   - User prefers Spanish interaction with English documentation
   - Check /SESSIONS/ folder for previous work context

3. **Why this is important:**
   - Memory Server persists information between conversations
   - You start each conversation with NO memory of previous interactions
   - The SESSION-INIT-CONTEXT entity contains everything you need to know

## Language Configuration
- **User interaction**: Spanish (Español)
- **Private documentation**: English
- **Public documentation**: English
- **Code comments**: English

## Project Overview

ClaudeSquad is a comprehensive knowledge base and multi-agent system that transforms Claude Code into an intelligent project orchestrator with 77 specialized agents. This is NOT a traditional programming project but rather an advanced agent architecture and tooling ecosystem for Claude Code enhancement.

## Session History

**IMPORTANT**: Session history is stored in `/SESSIONS/` directory at project root (not in .claude/memory/sessions).
- Sessions are markdown files with timestamp format: `YYYY-MM-DD_HH-MM-SS.md`
- Each session documents accomplishments, decisions, issues resolved, and next steps
- Always check SESSIONS folder for context on previous work

## High-Level Architecture

### Core Components

1. **Agent System** (`.claude/agents/`)
   - 77 specialized global agents covering all development domains
   - Dynamic module agents created per-project via `agent-creator`
   - Direct delegation model - Claude delegates directly without coordinators
   - Each agent is an expert with specific domain knowledge

2. **FLAGS System** (`.claude/memory/flags/`)
   - Cross-domain communication protocol
   - Agents create flags in `pending.json` when they detect issues affecting other modules
   - Claude reads flags and delegates directly to appropriate agents
   - Processed flags move to `processed.json` for audit trail

3. **Memory System** (`.claude/memory/`)
   - Persistent JSON-based memory for each agent
   - Stores module knowledge, patterns, dependencies, history
   - Maintains context between Claude sessions
   - Enables cumulative learning

4. **Setup System** (`.claude/commands/setup.md`)
   - Automated 6-phase setup process
   - Four specialized setup agents analyze projects in parallel
   - Generates project-specific CLAUDE.md
   - Creates dynamic agents based on detected modules

## Common Development Commands

### Task Management (NEW!)
```bash
# Advanced todo management with due dates and priorities
/todo add "Implement new feature" tomorrow
/todo add "Fix critical bug" high
/todo complete 1
/todo list
/todo past due
/todo next

# Check persistent todos file
cat todos.md
```

### Python Scripts Development
```bash
# Use uv for Python execution
uv run python script.py

# Install dependencies with uv
uv pip install package-name

# Run Python scripts in the project
uv run python .claude/scripts/script-name.py
```

### PowerShell/Bash Scripts
```bash
# PowerShell execution
powershell -File script.ps1

# Bash execution (Git Bash on Windows)
bash script.sh

# Make commands for awesome-claude-code
make validate
make add_resource
make submit
make generate
```

### Agent Management
```bash
# Initial setup
claude /setup

# Invoke specific agent
claude "Use @ClaudeSquad-agents-specialist to analyze agent structure"

# Check FLAGS
cat .claude/memory/flags/pending.json
```

### UI Generation with Magic MCP (NEW!)
```bash
# Generate UI components instantly
"Create a modern dashboard with dark mode"
"Generate a user profile card with avatar"
"Build a responsive navigation menu"

# Verify Magic MCP is connected
/mcp
```

## Key Workflows

### Using the Agent System

1. **Initial Setup**: Run `claude /setup` to configure the entire system
2. **Direct Agent Invocation**: Use `@agent-name` to invoke specific agents
3. **Dynamic Agents**: Created automatically for project modules during setup
4. **FLAGS Handling**: When agents create flags, Claude automatically delegates to appropriate specialists

### FLAGS Protocol

When an agent discovers an issue affecting another module:
1. Agent creates flag in `.claude/memory/flags/pending.json`
2. Agent notifies: "🚩 FLAG CREATED: [TYPE] for [module]"
3. Claude reads the flag details and delegates directly
4. Target agent resolves issue and moves flag to `processed.json`

### Memory Management

Agents maintain persistent memory in:
- `.claude/memory/agents/[agent-name]/` - Per-agent knowledge
- Memory persists between sessions
- Agents update their own memory after tasks

## Project-Specific Context

### Core Agent System Status
- **13 agents completed** (18%): engineer-laravel (gold standard), context-manager, agent-creator, coordinators
- **61 agents placeholders** (82%): Need development following engineer-laravel model
- **Python tooling**: Mature CSV-first workflow in awesome-claude-code
- **FLAGS system**: Fully implemented for cross-domain coordination

### ClaudeSquad Resources Collections

1. **MEJORAS-INVESTIGACION**: Research and investigations for improvements
2. **awesome-claude-code**: Curated list with Python automation tools
3. **awesome-claude-code-subagents**: 100+ categorized specialized agents
4. **wshobson-agents**: 61 additional agent definitions
5. **claude_code_sub_agents**: Legal analysis examples and specifications

### Dynamic Agents to Create

For this knowledge base project, the following ClaudeSquad-* agents will be created:
- **ClaudeSquad-agents-specialist**: Expert on all 77 agents, uses engineer-laravel as model
- **ClaudeSquad-commands-specialist**: Expert on Claude Code commands and conventions
- **ClaudeSquad-scripts-specialist**: Expert on Python/Bash/PowerShell scripting
- **ClaudeSquad-mcp-specialist**: Expert on Model Context Protocol
- **ClaudeSquad-hooks-specialist**: Expert on Claude Code hooks system
- **ClaudeSquad-documentation-specialist**: Project documentation expert
- **ClaudeSquad-knowledge-base**: Living database of MEJORAS-INVESTIGACION content

## Important Implementation Notes

1. **Never create files unless necessary** - Always prefer editing existing files
2. **Direct delegation model** - No coordinator overhead, Claude delegates directly
3. **FLAGS for cross-domain issues** - Automatic coordination without information loss
4. **Dynamic agents know everything** - Created with complete module knowledge
5. **Memory persists** - Agents build cumulative knowledge over time

## Testing Approach

For Python components (awesome-claude-code):
- Run tests with `python tests/test_*.py`
- Validate links with `make validate`
- Use `make validate-single URL=<url>` for single resource validation

## Security and Best Practices

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Follow existing code patterns and conventions
- Maintain high test coverage (>90% for critical paths)
- Keep methods under 30 lines, files under 300 lines
- Apply SOLID, DRY, and YAGNI principles