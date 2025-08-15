---
command: setup
description: 🚀 Setup command for ClaudeSquad
---

## ⚡ MANDATORY COMMAND FLOW

This hybrid version merges the **technical depth and safeguards** of the original specification with the **clarity and structure** of the newer documentation, while retaining all _immutable rules_ and best practices from Claude Code.

---

### ⚠️ **IMMUTABLE RULES – NO EXCEPTIONS**

1. **NEVER** analyze without creating agents
2. **ALWAYS** invoke 4 setup agents in REAL PARALLEL (multiple Task calls)
3. **ALWAYS** create ALL required files and memory
4. **NEVER** ask whether to create — just create (exception: explicit language preference prompts in Phase 5)
5. **ALWAYS** use multiple Task calls for agent creation

---

### 1️⃣ **PHASE 1: ENVIRONMENT VERIFICATION**

Before any project analysis begins, the system validates your development environment.

```yaml
Checking prerequisites:
  - Git version and configuration
  - Node.js/npm/yarn versions
  - PHP/Composer (if applicable)
  - Python/pip (if applicable)
  - Docker/Docker Compose
  - IDE/Editor configuration
  - Operating system details
  - File permissions
  - Network connectivity

If missing:
  - List missing tools
  - Provide installation commands
  - Suggest alternative solutions
```

---

### 2️⃣ **PHASE 2: MEMORY SERVER PROJECT CONTEXT**

Automatically create project-specific context in Memory Server for persistence across sessions.

```yaml
EXECUTION:
  # PSEUDOCODE - adapt to your shell (examples below)

  # Get project name from current directory
  PROJECT_NAME=$(basename "$(pwd)")           # Bash/Zsh
  CONTEXT_NAME="${PROJECT_NAME}-INIT-CONTEXT" # Bash/Zsh

  # PowerShell equivalent:
  # $PROJECT_NAME = Split-Path -Leaf (Get-Location)
  # $CONTEXT_NAME = "$PROJECT_NAME-INIT-CONTEXT"

  # Try to load global user context
  GLOBAL_CONTEXT=$(mcp__server-memory__search_nodes("GLOBAL-USER-CONTEXT"))

  # Create or update project-specific context
  mcp__server-memory__create_entities([{
    "name": "${CONTEXT_NAME}",
    "entityType": "ProjectContext",
    "observations": [
      "PROJECT: ${PROJECT_NAME}",
      "LOCATION: $(pwd)",                # Bash/Zsh
      "SETUP_DATE: $(date -Iseconds)",   # Bash/Zsh
      # PowerShell equivalents:
      # "LOCATION: $(Get-Location)",
      # "SETUP_DATE: $(Get-Date -Format o)",
      "STATUS: Initializing with /setup command",
      "NEXT_STEP: Parallel agent analysis in Phase 3"
    ]
  }])

  # Create relation to global context if it exists
  # Bash/Zsh:
  if [ "$GLOBAL_CONTEXT" != "empty" ]; then
    mcp__server-memory__create_relations([{
      "from": "GLOBAL-USER-CONTEXT",
      "to": "${CONTEXT_NAME}",
      "relationType": "has_project"
    }])
  fi

  # PowerShell equivalent:
  # if ($GLOBAL_CONTEXT -ne "empty") {
  #   mcp__server-memory__create_relations([{
  #     "from": "GLOBAL-USER-CONTEXT",
  #     "to": $CONTEXT_NAME,
  #     "relationType": "has_project"
  #   }])
  # }

Benefits:
  - Each project gets unique context (no cross-contamination)
  - Persistent across all Claude sessions
  - Automatic project name detection
  - No user intervention required
  - Projects remain completely separate

Examples:
  - ClaudeSquad/ → CLAUDESQUAD-INIT-CONTEXT
  - my-app/ → MY-APP-INIT-CONTEXT
  - api-gateway/ → API-GATEWAY-INIT-CONTEXT
```

**Why this phase:**

- Ensures each project has its own Memory Server context
- Prevents mixing data between different projects
- Enables persistence of project-specific information
- Allows future sessions to load project context with: `mcp__server-memory__search_nodes("PROJECTNAME-INIT-CONTEXT")`

---

### 3️⃣ **PHASE 3: PARALLEL ANALYSIS**

Execute **REAL PARALLEL** analysis using **4 specialized agents**:

```yaml
INVOCATION:
  mode: REAL PARALLEL
  agents:
    - setup-context
    - setup-codebase
    - setup-infrastructure
    - setup-environment
  execution: MULTIPLE TASK CALLS IN ONE MESSAGE
  instruction: "Analyze this project IN PARALLEL using 4 specialized agents"
```

**Agents and Purpose:**

| Agent                | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| setup-context        | Project purpose, architecture, decisions        |
| setup-codebase       | Code structure, modules, patterns, quality      |
| setup-infrastructure | Deployment, databases, CI/CD, external services |
| setup-environment    | Tools, versions, system capabilities            |

✅ **Always** run these in parallel — never sequentially.  
⚠️ Limit: 10 simultaneous Task calls.

---

### 4️⃣ **PHASE 4: LANGUAGE CONFIGURATION**

**ALWAYS ASK USER BEFORE CREATING CLAUDE.MD:**

- User interaction language
- Private documentation language
- Public documentation language
- Comments and docstrings language

### 5️⃣ **PHASE 5: CLAUDE.MD CREATION**

```yaml
CLAUDE:
  - Receives information from the 4 agents
  - Creates CLAUDE.md with all intelligence and language preferences
  - Maps detected modules to specialized agents
  - Prepares agent list for agent-creator
```

`CLAUDE.md` includes:

- Complete tech stack mapping
- Module dependency structure
- Detected patterns and conventions
- Recommended agent creation plan

---

### 6️⃣ **PHASE 6: AGENT CREATION**

```yaml
INVOCATION:
  agent: agent-creator
  mode: REAL PARALLEL – MULTIPLE TASK CALLS
  tasks:
    - [Task 1] agent-creator → module-X-agent
    - [Task 2] agent-creator → module-Y-agent
    - [Task 3] agent-creator → module-Z-agent
```

**Best Practice:**

- Each agent gets **its own context** and memory store.
- All agents created in a **single message** with multiple Task calls.

Example:

```bash
"Create these agents in parallel:
[Task 1] agent-creator → api-agent (REST/GraphQL)
[Task 2] agent-creator → database-agent (schemas, queries)
[Task 3] agent-creator → frontend-agent (UI components, state)
[Task 4] agent-creator → auth-agent (authentication, permissions)"
```

---

### 7️⃣ **PHASE 7: FLAGS SYSTEM CONFIGURATION**

```yaml
FLAGS_SYSTEM:
  - Create .claude/memory/flags/ directory
  - Initialize pending.json and processed.json
  - Configure cross-domain communication protocol
  - Update CLAUDE.md with flags instructions
```

### 8️⃣ **PHASE 8: FINALIZATION**

```yaml
CLAUDE:
  - Confirms all agents created
  - Confirms flags system configured
  - Presents system summary to user
  - Lists available agents
  - Shows current system state
```

---

## 📁 **STRUCTURE CREATED BY /setup**

```
[PROJECT_ROOT]/
├── .claude/                      # IN THE ANALYZED PROJECT
│   ├── CLAUDE.md                 # Project instructions with FLAGS protocol
│   ├── agents/                   # Dynamic agents
│   │   ├── calculator-agent.md
│   │   ├── emissions-agent.md
│   │   └── ...
│   ├── memory/                   # Persistent memory
│   │   ├── agents/
│   │   │   ├── calculator_agent/
│   │   │   │   └── knowledge.json
│   │   │   └── emissions_agent/
│   │   │       └── knowledge.json
│   │   └── flags/                # Cross-domain communication
│   │       ├── pending.json      # Active flags needing resolution
│   │       └── processed.json    # Resolved flags history
│   └── commands/                 # Custom project commands
```

---

## ❓ **ARCHITECTURE DECISIONS**

### **OPTION A: Single agent-creator invocation**

```bash
agent-creator → create all agents in one task
# ❌ Problem: Large context size in one window
```

### **OPTION B: Parallel agent creation** ✅ Recommended

```bash
# Multiple Task calls in one message
"Create these agents IN PARALLEL:
[Task 1] agent-creator → calculator-agent
[Task 2] agent-creator → emissions-agent
[Task 3] agent-creator → ui-agent"
```

---

## FOR NEW/EMPTY PROJECTS

### **Phase 1: Requirements Interview**

Interactive Q&A covering **14 comprehensive areas**:

**1. Business & Domain**

- What problem does this solve?
- Who are the users/stakeholders?
- Business model and revenue streams
- Success metrics and KPIs

**2. Technical Architecture**

- Technology stack selection and rationale
- Monolith vs microservices vs serverless
- API design (REST/GraphQL/gRPC)
- Real-time requirements

**3. Database & Data**

- Database choice and rationale
- Data volume expectations
- ACID vs eventual consistency
- Data retention and privacy policies

**4. Security & Compliance**

- Authentication method (JWT/OAuth/SAML)
- Authorization model (RBAC/ABAC)
- Compliance requirements (GDPR/HIPAA/SOC2)
- Encryption and secrets management

**5. Infrastructure & Deployment**

- Cloud provider and services
- Container orchestration strategy
- Multi-region requirements
- Disaster recovery planning

**6. CI/CD & DevOps**

- Version control and branching strategy
- CI/CD platform and pipeline design
- Environment management
- Deployment strategies

**7. Monitoring & Observability**

- APM and error tracking tools
- Log aggregation strategy
- Alerting rules and SLA definitions
- Performance monitoring

**8. Testing Strategy**

- Coverage targets and test types
- Testing framework selection
- Performance and security testing
- Quality gates and automation

**9. Documentation & Knowledge**

- API and code documentation standards
- Architecture diagram requirements
- Knowledge sharing and onboarding
- Public vs internal documentation

**10. Accessibility & I18N**

- WCAG compliance requirements
- Supported languages and locales
- RTL language support
- Accessibility testing strategy

**11. Team & Collaboration**

- Team size, roles, and structure
- Communication and project management tools
- Code review and development processes
- Remote/hybrid work considerations

**12. Development Environment**

- Local development setup requirements
- Docker development environment
- Development tools and IDE configurations
- Onboarding time targets

**13. Language & Communication**

- Primary development languages
- Documentation languages
- Code comment standards
- International communication needs

**14. User Experience Level**

- Programming experience assessment
- Stack familiarity evaluation
- Learning preferences and mentorship needs
- Knowledge gaps identification

### **Phase 2: Architecture Generation**

- Generate scaffolding
- Create templates (env, CI/CD, Docker)
- Configure dev environment

### **Phase 3: Language Configuration**

**ALWAYS ASK USER:**

- User interaction language
- Private documentation language
- Public documentation language
- Comments and docstrings language

### **Phase 4: CLAUDE.MD Creation**

- Create with language preferences and architecture

### **Phase 5: Dynamic Agent Creation**

- Create project-specific agents (NOT base specialists - they exist in ~/.claude/agents)

---

## FOR EXISTING PROJECTS

### Phase 1: Comprehensive Parallel Analysis

- setup-context
- setup-codebase
- setup-infrastructure
- setup-environment

### Phase 2: Language Configuration

**ALWAYS ASK USER:**

- User interaction language
- Private documentation language
- Public documentation language
- Comments and docstrings language

### Phase 3: CLAUDE.MD Creation

- Process 4 analyses + language preferences

### Phase 4: Dynamic Agent Generation

- Detect main modules
- Create project-specific agents in parallel

### Phase 5: Configuration Review

- Present system summary, issues, improvements

---

## 📊 /init VS /setup COMPARISON

| Feature             | Claude Code /init      | ClaudeSquad /setup               |
| ------------------- | ---------------------- | -------------------------------- |
| Analysis            | Sequential single scan | 4 specialized agents in parallel |
| Agent Creation      | ❌ None                | ✅ Dynamic per module            |
| Memory System       | Static CLAUDE.md       | Persistent per agent             |
| Customization       | Limited                | Full specialist ecosystem        |
| Parallel Processing | No                     | Yes (10 concurrent)              |
| Error Prevention    | ❌ None                | ✅ Immutable rules               |

---

## 🚀 **REAL PARALLELISM IN CLAUDE CODE**

### **CONFIRMED TECHNICAL CAPABILITIES:**

```yaml
parallel_tasks:
  limit: "10 simultaneous subagents"
  batching: "Claude Code executes in batches"
  context: "Each Task has its own window"
  queue: "Automatic queue if > 10 tasks"
  syntax: "Multiple Task calls in ONE message"
```

### **CORRECT INVOCATION:**

```bash
# ✅ CORRECT - Real parallel:
"Execute these tasks IN PARALLEL:
[Task 1] agent-creator → docs-agent
[Task 2] agent-creator → api-agent
[Task 3] agent-creator → frontend-agent
[Task 4] agent-creator → database-agent"

# ❌ INCORRECT - Sequential:
Task → agent-creator → docs-agent
Task → agent-creator → api-agent
Task → agent-creator → frontend-agent
```

---

## 🔧 **HOOKS AND COMMANDS LOCATION**

### **DEFINITIVE ANSWER:**

```yaml
HOOKS:
  global: ~/.claude/settings.json
  project_shared: .claude/settings.json (committed to repo)
  project_local: .claude/settings.local.json (not committed, personal)
  reason: "Configured in settings files, not separate hooks.json file"

COMMANDS:
  location: .claude/commands/
  reason: "Customized per project"

MEMORY:
  created_by: "agent-creator automatically"
  location: ".claude/memory/agents/[agent-name]/"
  structure: "knowledge.json, patterns.json, index.json, dependencies.json, history.json, context.json"

GLOBAL_VS_LOCAL:
  - .claude/: "In the analyzed project"
  - NOT in ClaudeSquad: "It's template, not destination"
```

---

## ❌ **COMMON ERRORS**

- ❌ Running setup agents sequentially
- ❌ Only analyzing without creating anything
- ❌ Asking user what to create
- ❌ Not creating agent memory
- ❌ Creating in ClaudeSquad instead of target project

---

## 🎯 **EXAMPLE EXECUTION**

```bash
User: /setup C:\project\example

Claude:
1. [Phase 1] Environment verification ✅

2. [Phase 2] Memory Server project context created/updated (EXAMPLE-INIT-CONTEXT) ✅

3. [Phase 3 - REAL PARALLEL] "Analyze this project IN PARALLEL using 4 specialized agents:
   [Task 1] setup-context
   [Task 2] setup-codebase
   [Task 3] setup-infrastructure
   [Task 4] setup-environment"

4. [Phase 4] Language Configuration:
   "What language preferences:
   - User interaction: English/Spanish?
   - Private documentation: English/Spanish?
   - Public documentation: English?
   - Comments/docstrings: English/Spanish?"

5. [Phase 5] Creates complete CLAUDE.md with language preferences + aggregated analysis

6. [Phase 6 - REAL PARALLEL] "Create these agents IN PARALLEL:
   [Task 1] agent-creator → api-agent (creates .claude/memory/agents/api-agent/)
   [Task 2] agent-creator → database-agent (creates .claude/memory/agents/database-agent/)
   [Task 3] agent-creator → frontend-agent (creates .claude/memory/agents/frontend-agent/)"

7. [Phase 7] Configure flags system: Creates .claude/memory/flags/ structure

8. [Phase 8] Confirms: "✅ Setup complete: 3 agents created with full memory systems + flags communication"
```

---

**THIS IS THE OFFICIAL FLOW. NO INTERPRETATIONS.**
