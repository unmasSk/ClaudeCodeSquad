---
command: save
description: ♾️ Save current session context to Memory Server for persistence between conversations
---

# Save Session Command

This command saves the current session's context, accomplishments, and quality metrics to Memory Server for retrieval in future conversations.

## Usage

```
/save-session [--notes "additional notes"] [--quality N] [--force]
```

## Options

- `--notes`: Add custom notes about the session
- `--quality`: Override automatic quality score (0-10)
- `--force`: Force save even if Memory Server is unavailable

## Implementation

When invoked, perform the following steps:

### 1. Analyze Current Session

Review the conversation to identify:

- **Accomplishments**: Tasks completed, files created/modified, problems solved
- **Research**: What was investigated, documentation reviewed, tools explored
- **Testing**: What was tested, results obtained, validations performed
- **Decisions**: Important choices made, architectural decisions, tool selections
- **Pending**: Tasks left incomplete, next steps identified

### 2. Assess Conversation Quality

Evaluate and score:

- **Accuracy** (0-10): Were responses factual and correct?
- **Helpfulness** (0-10): Did responses address user needs effectively?
- **Hallucinations**: Count any invented information or false claims
- **Errors**: Note any significant mistakes or misunderstandings
- **Overall Effectiveness**: General session productivity

### 3. Prepare Session Data

```javascript
const sessionDate = new Date().toISOString().split("T")[0];
const sessionName = `SESSION-${sessionDate}`;
const timestamp = new Date().toISOString();

const sessionSummary = {
  date: timestamp,
  accomplishments: [
    // List specific tasks completed
  ],
  research: [
    // Topics investigated
  ],
  testing: [
    // Tests performed and results
  ],
  decisions: [
    // Important choices made
  ],
  pending: [
    // Tasks for next session
  ],
  quality: {
    accuracy: 8, // 0-10 scale
    helpfulness: 9, // 0-10 scale
    hallucinations: 0, // count
    errors: [], // list of errors
    effectiveness: "High", // Low/Medium/High
  },
  notes: "", // User-provided notes if any
};
```

### 4. Update Memory Server

```javascript
// First, try to update SESSION-INIT-CONTEXT
try {
  // Search for existing context
  const context =
    (await mcp__server) - memory__search_nodes("SESSION-INIT-CONTEXT");

  if (context.entities.length > 0) {
    // Update existing context
    (await mcp__server) -
      memory__add_observations({
        observations: [
          {
            entityName: "SESSION-INIT-CONTEXT",
            contents: [
              `LAST SESSION: ${timestamp}`,
              `ACCOMPLISHMENTS: ${sessionSummary.accomplishments.join(", ")}`,
              `PENDING: ${sessionSummary.pending.join(", ")}`,
              `QUALITY: Accuracy ${sessionSummary.quality.accuracy}/10, Helpfulness ${sessionSummary.quality.helpfulness}/10`,
              `NEXT STEPS: ${
                sessionSummary.pending[0] || "Continue development"
              }`,
            ],
          },
        ],
      });
  } else {
    // Create new context if doesn't exist
    (await mcp__server) -
      memory__create_entities({
        entities: [
          {
            name: "SESSION-INIT-CONTEXT",
            entityType: "SystemContext",
            observations: [
              "PROJECT: ClaudeSquad - Sistema de 77 agentes especializados",
              `ÚLTIMA SESIÓN: ${timestamp}`,
              `LOGROS: ${sessionSummary.accomplishments.join(", ")}`,
              `PENDIENTE: ${sessionSummary.pending.join(", ")}`,
            ],
          },
        ],
      });
  }

  // Create dated session entity
  (await mcp__server) -
    memory__create_entities({
      entities: [
        {
          name: sessionName,
          entityType: "Session",
          observations: [
            `Date: ${timestamp}`,
            `Tasks completed: ${sessionSummary.accomplishments.join("; ")}`,
            `Research: ${sessionSummary.research.join("; ")}`,
            `Testing: ${sessionSummary.testing.join("; ")}`,
            `Decisions: ${sessionSummary.decisions.join("; ")}`,
            `Pending: ${sessionSummary.pending.join("; ")}`,
            `Quality - Accuracy: ${sessionSummary.quality.accuracy}/10`,
            `Quality - Helpfulness: ${sessionSummary.quality.helpfulness}/10`,
            `Hallucinations: ${sessionSummary.quality.hallucinations}`,
            `Errors: ${sessionSummary.quality.errors.join("; ") || "None"}`,
            `Effectiveness: ${sessionSummary.quality.effectiveness}`,
            `Notes: ${sessionSummary.notes || "No additional notes"}`,
          ],
        },
      ],
    });

  // Create relation to project
  (await mcp__server) -
    memory__create_relations({
      relations: [
        {
          from: "ClaudeSquad Project",
          to: sessionName,
          relationType: "had_session",
        },
      ],
    });

  console.log(`✅ Session saved successfully as ${sessionName}`);
  console.log(
    `📊 Quality Score: Accuracy ${sessionSummary.quality.accuracy}/10, Helpfulness ${sessionSummary.quality.helpfulness}/10`
  );
  console.log(
    `📝 ${sessionSummary.accomplishments.length} accomplishments saved`
  );
  console.log(`⏳ ${sessionSummary.pending.length} pending tasks recorded`);
} catch (error) {
  console.error("⚠️ Memory Server unavailable, saving to file instead");

  // Fallback: Save to SESSIONS directory (relative to project root)
  // Note: Ensure SESSIONS directory exists at project root before writing
  // If directory doesn't exist, use: mkdir -p SESSIONS (bash) or New-Item -ItemType Directory -Force SESSIONS (PowerShell)
  const fallbackDir = `SESSIONS`; // Relative to project root
  const fallbackPath = `${fallbackDir}/${sessionDate}_session-summary.json`;
  await Write(fallbackPath, JSON.stringify(sessionSummary, null, 2));

  console.log(`📁 Session saved to ${fallbackPath}`);
  console.log(
    "💡 To import later: Load this file and create entities manually"
  );
}
```

### 5. Provide User Feedback

After saving, provide clear feedback:

```markdown
## 📊 Session Saved Successfully

**Session ID**: SESSION-2025-08-14
**Quality Score**: 8.5/10 (Accuracy: 8, Helpfulness: 9)

**Accomplishments** (5):

- ✅ Installed and configured 6 MCP servers
- ✅ Created Memory Server documentation
- ✅ Implemented SESSION-INIT-CONTEXT pattern
- ✅ Updated CLAUDE.md with initialization instructions
- ✅ Created /save-session command

**Pending Tasks** (4):

- ⏳ Test Git Server
- ⏳ Test Fetch Server
- ⏳ Test Time Server
- ⏳ Test Everything Server

**Session Quality**:

- No hallucinations detected
- 0 significant errors
- High overall effectiveness

**Next Session**: Start with "Load context from Memory Server" or it should load automatically from SESSION-INIT-CONTEXT.
```

## Error Handling

### Memory Server Unavailable

- Save to `SESSIONS/` directory (relative to project root) as JSON
- Ensure directory exists before writing (mkdir -p SESSIONS or equivalent)
- Provide import instructions for next session
- Warn user about manual recovery needed

### SESSION-INIT-CONTEXT Missing

- Create new entity with current session data
- Initialize with project defaults
- Notify user of new context creation

### Large Session Data

- Truncate observations if exceeding 10,000 characters
- Prioritize most recent and important information
- Save full data to file as backup

## Best Practices

1. **Run at natural break points** - Don't wait until conversation ends
2. **Add custom notes** for important breakthroughs or issues
3. **Review quality scores** to track agent performance over time
4. **Check pending tasks** before starting next session
5. **Verify save success** before closing conversation

## Example Usage

### Basic save

```
/save-session
```

### With custom notes

```
/save-session --notes "Discovered Memory Server limitations with file access. Implemented workaround with SESSION-INIT-CONTEXT pattern."
```

### Override quality score

```
/save-session --quality 9 --notes "Excellent session despite initial confusion about Memory Server persistence"
```

### Force save when Memory Server is down

```
/save-session --force
```

## Integration with ClaudeSquad

This command is essential for maintaining continuity in the ClaudeSquad project:

- Preserves knowledge between Claude Code sessions
- Tracks progress on 77 agents development
- Maintains quality metrics for improvement
- Ensures FLAGS and decisions are not lost
- Creates searchable session history in Memory Server

---

_Command created for ClaudeSquad project_
_Version: 1.0_
_Last updated: August 14, 2025_
