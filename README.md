# 🚀 ClaudeSquad

> Complete multi-agent system for Claude Code with 86+ specialized agents (13 complete, 73+ placeholders), dynamic module agents, **Git workflow automation**, and **cross-domain communication via FLAGS**. Transform Claude into an intelligent project orchestrator that delegates tasks directly to specialized agents with persistent memory and automatic coordination.

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-blue)](https://www.anthropic.com/claude)
[![Agents](https://img.shields.io/badge/Agents-86+-green)](./.claude/agents)
[![Complete](https://img.shields.io/badge/Complete-13-yellow)](./.claude/agents/README.md)
[![Memory](https://img.shields.io/badge/Memory-Persistent-red)](./.claude/memory)
[![Setup](https://img.shields.io/badge/Setup-Automated-orange)](./.claude/commands/setup.md)
[![Version](https://img.shields.io/badge/Version-2.1.0-purple)](./CHANGELOG.md)

## 🎯 What is ClaudeSquad?

ClaudeSquad transforms Claude Code from a single AI assistant into a complete development team. Claude becomes the orchestrator, intelligently delegating to 86+ specialized agents (13 complete, 73+ placeholders) AND dynamically creating project-specific module agents, each an expert in their domain.

### 🏗️ System Architecture

```
Claude (Main Conversation) = DIRECT ORCHESTRATOR
    │
    ├── 86+ Global Specialists (~/.claude/agents/)
    │   ├── ✅ Complete: engineer-laravel, context-manager, agent-creator
    │   ├── ✅ Complete: specialist-git, documentation-changelog  
    │   ├── ✅ Complete: coordinators (backend, frontend, database, etc.)
    │   ├── 📝 Placeholders: 73+ domain specialists (react, vue, postgres, etc.)
    │   └── 🚀 Git Workflow: /commit, /pr, /issue, /docs commands
    │
    └── Dynamic Module Agents (.claude/agents/ - per project)
        ├── api-agent (knows your API implementation)
        ├── auth-agent (knows your auth system)
        └── [created based on your project modules]
```

**Key Innovation:**

- **Direct delegation** - No coordinators, Claude delegates directly
- **Git workflow automation** - Professional `/commit`, `/pr`, `/issue`, `/docs` commands
- **Dynamic module agents** - Created by agent-creator for your specific project  
- **Cross-domain FLAGS** - Agents communicate via pending.json for coordination

## ✨ Core Features

### 🎯 Intelligent `/setup` Command

One command configures everything:

```bash
claude /setup
```

**For NEW projects:** Interactive conversation gathering 14 areas of requirements
**For EXISTING projects:** Automatic detection and configuration

### 🚀 Professional Git Workflow Commands

Complete Git automation with multi-agent analysis:

```bash
# Intelligent commit with linting and analysis  
claude /commit

# Automated pull request creation
claude /pr  

# Structured issue creation with templates
claude /issue

# Documentation management
claude /docs
```

**Features:**
- Conventional commits with 20+ standardized types
- Multi-agent code analysis before commits
- Automated PR creation with GitHub CLI
- Issue templates with proper categorization
- Security scanning and linting integration

### 📊 Comprehensive Project Analysis

Four specialized agents analyze your project:

- `setup-context` - Project purpose, architecture, decisions
- `setup-codebase` - Code structure, modules, patterns, quality
- `setup-infrastructure` - Deployment, databases, CI/CD, external services
- `setup-environment` - Tools, versions, system capabilities

### 🔊 TTS Integration & Voice Notifications (NEW!)

**Intelligent Text-to-Speech system** with multi-provider support and Spanish voice configuration:

```bash
# Configure in .env
OPENAI_API_KEY=your_key_here
ENGINEER_NAME=YourName
```

**Features:**
- **OpenAI TTS** with Nova voice (high quality, natural Spanish)
- **Fallback to pyttsx3** with Helena voice (offline Spanish)
- **Smart notifications** when Claude completes tasks
- **Personalized messages** with your name (30% of the time)
- **LLM-generated completion messages** in Spanish

**Based on:** [claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) by @disler

### 🧠 Dual Memory Systems

ClaudeSquad uses **TWO different memory systems** for different purposes:

#### 1. **JSON Memory System** (Project-Local)

Located in `.claude/memory/` within each project. Used by dynamic agents for module-specific knowledge:

```
.claude/memory/
├── agents/              # Per-agent persistent knowledge
│   ├── api-agent/
│   │   ├── knowledge.json    # Module understanding
│   │   ├── patterns.json     # Detected patterns
│   │   ├── index.json        # File index and purposes
│   │   ├── dependencies.json # Dependency mapping
│   │   ├── history.json      # Creation and changes
│   │   └── context.json      # Business context and TODOs
│   └── [agent-name]/
└── flags/              # Cross-domain communication
    ├── pending.json    # Active flags needing resolution
    └── processed.json  # Resolved flags history
```

**Characteristics:**

- ✅ Git-versioned with your project
- ✅ Full control over structure
- ✅ Project-specific data
- ❌ Doesn't persist between Claude sessions
- ❌ Not shared between projects

#### 2. **MCP Memory Server** (Global Knowledge Graph)

A persistent knowledge graph that maintains context across ALL Claude sessions and projects:

```javascript
// Example: Creating project context
mcp__server -
  memory__create_entities([
    {
      name: "MYPROJECT-INIT-CONTEXT",
      entityType: "ProjectContext",
      observations: ["Project setup complete", "Using React + FastAPI"],
    },
  ]);

// Example: Searching for context
mcp__server - memory__search_nodes("MYPROJECT-INIT-CONTEXT");
```

**Characteristics:**

- ✅ Persists between ALL Claude sessions
- ✅ Searchable knowledge graph
- ✅ Project separation (PROJECTNAME-INIT-CONTEXT pattern)
- ✅ Relationships between concepts
- ❌ Not Git-versioned
- ❌ Requires MCP server installation

**How they work together:**

1. **MCP Memory Server** maintains high-level project context and session continuity
2. **JSON Memory** stores detailed module knowledge for dynamic agents
3. **FLAGS system** uses JSON for active coordination
4. **Session saves** update both systems

### 🚩 Cross-Domain FLAGS System

**Automatic coordination** when agents discover issues affecting other modules:

```yaml
Flow:
  1. api-agent discovers database performance issue
  2. Creates flag in pending.json: "DATABASE_INVESTIGATION"
  3. Notifies Claude: "🚩 FLAG CREATED: DATABASE_INVESTIGATION for database"
  4. Claude reads pending.json and delegates directly to database-agent
  5. database-agent resolves issue and moves flag to processed.json
```

**Benefits:**

- Zero information loss across domains
- Automatic coordination without manual intervention
- Complete audit trail of cross-domain discoveries

## 🚀 Quick Start

### Prerequisites

- Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- Git configured
- Your preferred IDE

### Optional: MCP Servers for Enhanced Features

ClaudeSquad works out-of-the-box, but MCP servers add powerful capabilities.

**Currently Configured Servers:**
- **Memory** - Persistent session context across conversations
- **Git** - Advanced Git operations and workflow automation  
- **Fetch** - Web content fetching and API integration
- **Time** - Timezone operations and scheduling
- **Everything** - Comprehensive testing and demonstration server
- **Context7** - Real-time documentation and library reference

**Optional Installation:**
```bash
# Install additional MCP servers as needed
claude mcp add-npm @modelcontextprotocol/server-memory
claude mcp add-npm @modelcontextprotocol/server-git
claude mcp add-npm @modelcontextprotocol/server-fetch
claude mcp add-npm @modelcontextprotocol/server-time
claude mcp add-npm @context7/mcp-server
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/unmasSk/ClaudeSquad.git
cd ClaudeSquad

# 2. Copy to global Claude directory (Windows)
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude" | Out-Null
Copy-Item ".\.claude\*" "$env:USERPROFILE\.claude\" -Recurse -Force

# 3. Configure TTS (optional but recommended)
cp .env.sample .env
# Edit .env and add your OpenAI API key for voice notifications

# 2. Copy to global Claude directory (Mac/Linux)
mkdir -p ~/.claude
cp -r .claude/* ~/.claude/# 3. Navigate to your project
cd /path/to/your/project

# 4. Run setup
claude /setup
```

## 🎮 Usage Examples

### Dynamic Agent Creation + Direct Implementation

```bash
"Build a user authentication system with 2FA"
# Claude automatically:
# → Uses setup agents to analyze project
# → Agent-creator creates auth-agent with complete auth module knowledge
# → Engineer-laravel implements with auth-agent specifications
# → Security-auditor reviews implementation
```

### Direct Agent Invocation

```bash
"@frontend-agent, optimize the UserProfile component performance"
# OR if dynamic agent exists:
"@userprofile-agent, optimize performance using your module knowledge"
```

### Cross-Domain Problem Solving with FLAGS

```bash
"The checkout process is slow"
# Real system flow:
# → api-agent investigates, finds N+1 queries
# → Creates FLAG: "DATABASE_INVESTIGATION for checkout optimization"
# → Claude delegates to database-agent
# → Database-agent optimizes queries, documents solution
# → Solution: 500ms → 15ms (33x improvement)
```

## 📦 Available Agents (86+ Total, 13 Complete)

### 🔧 Setup & Creation Agents (5)

- ✅ `setup-context` - Analyzes project purpose and architecture
- ✅ `setup-codebase` - Analyzes code structure and patterns  
- ✅ `setup-infrastructure` - Analyzes deployment and services
- ✅ `setup-environment` - Analyzes tools and system capabilities
- ✅ `agent-creator` - Creates dynamic agents for project modules

### 🎯 Specialized Engineers (81+)

**Completed (8):**
- ✅ `engineer-laravel` - Laravel 11+ expert with production standards
- ✅ `context-manager` - Project memory and session coordination
- ✅ `specialist-git` - Professional Git workflow automation
- ✅ `documentation-changelog` - Version management and documentation
- ✅ All coordinator agents (backend, frontend, database, devops, etc.)

**Placeholders (73+):**
- 📝 **Backend:** fastapi, nodejs, graphql, python, java engineers  
- 📝 **Frontend:** react, vue, angular, nextjs, ui-ux engineers
- 📝 **Database:** postgres, mysql, redis, sqlite, postgis engineers
- 📝 **DevOps:** docker, kubernetes, logging, observability engineers
- 📝 **Security:** security-auditor, compliance, gdpr engineers
- 📝 **Testing:** test-automation, e2e, performance engineers
- 📝 **Analysis:** discovery, quality, architecture engineers

**+ Dynamic Module Agents:** Created automatically for your specific project modules

[Full agent descriptions in .claude/agents/README.md](./.claude/agents/README.md)

## 🛠️ Setup Process

### Phase 1: Environment Verification

- Checks Git, Node, Docker, permissions
- Identifies missing tools
- Provides installation commands

### Phase 2: Memory Server Project Context

- Creates PROJECTNAME-INIT-CONTEXT automatically
- Enables persistence across sessions
- Prevents cross-project contamination

### Phase 3: Parallel Project Analysis

- Real parallel analysis by 4 setup agents
- Codebase, infrastructure, context analysis

### Phase 4: Language Configuration

- User interaction language preferences
- Documentation and code comment languages

### Phase 5: CLAUDE.md Generation

- Custom CLAUDE.md with FLAGS protocol
- Project-specific agent recommendations
- Git workflow command integration

### Phase 6: Dynamic Agent Creation

- Agent-creator analyzes modules
- Creates project-specific agents in parallel
- Each agent gets complete module knowledge

### Phase 7: FLAGS System Setup

- Creates .claude/memory/flags/ structure
- Initializes pending.json and processed.json

### Phase 8: System Ready

- All agents available for direct invocation
- Cross-domain communication configured

## 📋 What Gets Configured

### For New Projects

- 14 comprehensive requirement areas
- Business domain to deployment strategy
- Security, compliance, monitoring
- Team structure and workflows

### For Existing Projects

- Complete stack detection
- Dependency audit
- Security vulnerability scan
- Performance baseline
- Technical debt assessment

### Generated Files (30+)

- `.env.example`
- `docker-compose.yml`
- `.github/workflows/ci.yml`
- `CONTRIBUTING.md`
- `SECURITY.md`
- And 25+ more...

## 🌍 Language Configuration

Claude adapts to your preferences:

- User communication language
- Documentation language
- Code comments language
- Variable naming conventions
- Commit message language
- Error message languages

## 📈 System Benefits

- **Direct Delegation:** No coordinator overhead, Claude delegates directly
- **Module Expertise:** Dynamic agents know YOUR specific code intimately
- **Cross-Domain Coordination:** FLAGS system prevents information loss
- **Persistent Memory:** Agents build cumulative knowledge over time
- **Real Parallelism:** Up to 10 agents work simultaneously

## 📚 Documentation

- [Project Status](./ESTADO-ACTUAL-PROYECTO.md) - Current implementation status
- [FLAGS System](./.claude/docs/flags-system.md) - Cross-domain communication
- [JSON Memory System](./.claude/docs/memory-system-real.md) - Local agent memory architecture
- [MCP Memory Server](./.claude/docs/memory-server-usage-guide.md) - Global persistent knowledge graph
- [Setup Command](./.claude/commands/setup.md) - Complete setup documentation
- [All 86+ Agents](./.claude/agents/) - Agent catalog (13 complete, 73+ placeholders)
- [Context7 Usage](./.claude/docs/context7-usage-guide.md) - Real-time documentation access

## 🚧 Current Status

```
[██████████░░░░░░░░░░░░░░░░░░] 35% Complete

✅ Architecture Design: 100%
✅ File Structure: 100%  
✅ Setup Command: 100% (8 phases implemented)
✅ FLAGS System: 100% (fully implemented)
✅ Git Workflow: 100% (/commit, /pr, /issue, /docs)
✅ Memory System: 100% (dual JSON + MCP Memory Server)
✅ Agent Templates: 100% (dynamic agent creation)
✅ Core Agents: 15% (13 of 86+ agents complete)
⏳ Agent Development: 15% (73+ placeholders need implementation)
⏳ Testing: 5% (basic validation only)
⏳ Advanced Features: 30% (agent-health, prepare-context specs)
```

## 🎯 Roadmap

**Completed ✅**
- [x] Complete agent architecture (86+ agents defined)
- [x] FLAGS system for cross-domain coordination  
- [x] Dynamic agent creation with agent-creator
- [x] Git workflow automation (/commit, /pr, /issue, /docs)
- [x] Dual memory system (JSON + MCP Memory Server)

**In Progress 🚧**  
- [ ] Agent development: 73+ placeholders need full implementation
- [ ] Testing and validation framework
- [ ] Advanced command implementations (agent-health, prepare-context)

**Future 🔮**
- [ ] Performance metrics dashboard
- [ ] VS Code extension
- [ ] AI-powered agent optimization

## 🤝 Contributing

This project has a solid foundation with core features working. Key areas for contribution:

- **Agent Development:** Complete the 73+ placeholder agents using engineer-laravel as the gold standard
- **Testing Framework:** Comprehensive testing and validation system
- **Advanced Commands:** Implement agent-health and prepare-context commands
- **Performance:** Optimization and monitoring improvements
- **Templates:** Additional language-specific agent templates

## 📜 License

MIT License - Free for commercial and personal use

## 🙏 Acknowledgments

- Anthropic team for Claude Code
- Community feedback and contributions
- Inspired by microservices architecture

## 💬 Support & Contact

- GitHub Issues for bugs and features
- Discussions for questions and ideas
- Star ⭐ if you find this useful!

---

**Transform your Claude Code into a complete development team today!** 🚀

_Solid foundation ready: 86+ agent architecture, Git workflow automation, FLAGS system, dynamic agent creation, and dual memory system all working. 13 agents complete, 73+ need development._
