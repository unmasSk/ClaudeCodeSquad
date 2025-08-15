# 🪄 Magic MCP Setup Guide for ClaudeSquad

## Overview
Magic MCP (by 21st.dev) enables instant UI component generation through natural language descriptions directly in Claude Code.

## 🚀 Installation Steps

### Step 1: Get API Key
1. Visit https://21st.dev/magic/console
2. Sign up/Login
3. Generate a new API key
4. Save it securely

### Step 2: Install Magic MCP

#### Option A: Automatic Installation (Recommended)
```bash
npx @21st-dev/cli@latest install claude --api-key YOUR_API_KEY_HERE
```

#### Option B: Manual Configuration
Create or update `~/.claude/mcp_config.json`:

```json
{
  "mcpServers": {
    "@21st-dev/magic": {
      "command": "npx",
      "args": [
        "-y",
        "@21st-dev/magic@latest",
        "API_KEY=\"YOUR_API_KEY_HERE\""
      ]
    }
  }
}
```

### Step 3: Restart Claude Code
After configuration, restart Claude Code to load the new MCP server.

### Step 4: Verify Installation
```bash
# In Claude Code
/mcp

# Or from terminal
claude mcp list
```

## 🎨 Usage Examples

### Basic Component Generation
```
"Create a modern dashboard with dark mode support"
"Generate a user profile card with avatar and stats"
"Build a responsive navigation menu with dropdown"
```

### Advanced Features
- TypeScript support
- Real-time preview
- SVGL integration for logos/assets
- Modern component library

## 🔧 Configuration for ClaudeSquad Agents

### Frontend Agents Enhanced with Magic
Update frontend-related agents to include magic capabilities:

```yaml
---
name: frontend-developer
description: UI specialist with magic component generation
model: sonnet
color: blue
---

# Frontend Developer with Magic MCP

## Special Capabilities
- Use magic MCP to generate UI components instantly
- Example: "Create a [component description]"
- Components are TypeScript-ready and follow best practices
```

## 📋 Integration Checklist

- [ ] Obtain API key from https://21st.dev/magic/console
- [ ] Install magic MCP using preferred method
- [ ] Restart Claude Code
- [ ] Verify MCP server is connected
- [ ] Test with simple component generation
- [ ] Update frontend agents to leverage magic
- [ ] Document usage patterns in CLAUDE.md

## 🚨 Important Notes

1. **API Key Security**: Never commit your API key to version control
2. **Beta Period**: Currently all features are free during beta
3. **IDE Support**: Works with Claude Code, Cursor, Windsurf, VSCode
4. **Component Library**: Access to modern, customizable components

## 💡 Best Practices

1. **Descriptive Prompts**: Be specific about component requirements
2. **Iteration**: Generate base component then refine
3. **TypeScript**: Always request TypeScript versions for type safety
4. **Accessibility**: Ask for accessible components with ARIA labels
5. **Responsive**: Request responsive designs for mobile compatibility

## 🎯 ClaudeSquad Integration Benefits

With magic-mcp integrated into ClaudeSquad:
- **10x faster** UI component creation
- **Consistent** design patterns across project
- **Modern** components following best practices
- **Accessible** and responsive by default
- **TypeScript** support out of the box

## 📚 Resources

- [21st.dev Console](https://21st.dev/magic/console)
- [Magic MCP GitHub](https://github.com/21st-dev/magic-mcp)
- [MCP Documentation](https://modelcontextprotocol.io)

---

*Note: Replace YOUR_API_KEY_HERE with your actual API key from 21st.dev*