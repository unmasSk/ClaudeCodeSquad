---
command: prepare-context
description: 🫙 Prepares complete context to invoke agents with all necessary information
---

# Prepare Context - Complete Context Preparer

This command analyzes a module and prepares ALL the necessary context to invoke agents correctly.

## Usage

```bash
/prepare-context dream
```

## What it does

1. **Analyzes the complete module** using `module_analyzer.py`
2. **Generates the context** for the dynamic agent
3. **Prepares the instructions** for the engineer
4. **Gives you ready prompts** to copy and paste

## Process

### Step 1: Analyze module

```bash
python .claude/scripts/module_analyzer.py /src/dream
```

This generates a complete analysis in `.claude/memory/modules/dream_analysis.json`

### Step 2: Generate context for dynamic agent

I provide you the complete prompt:

```markdown
@dream-agent, I need [YOUR TASK HERE].

MODULE CONTEXT:

- Path: /src/dream
- Structure:
  [COMPLETE MODULE TREE - 500+ lines if needed]

- Main files:
  [LIST OF ALL FILES WITH THEIR PURPOSE]

- Detected patterns:
  [ALL PATTERNS IN USE]

- Project conventions:
  [ALL CONVENTIONS]

- Dependencies:
  [INTERNAL AND EXTERNAL]

- Communication:
  [ENDPOINTS, EVENTS, TABLES]

- Configuration:
  [ENVIRONMENT VARIABLES]

- Existing tests:
  [TEST STRUCTURE]

- Pending TODOs:
  [TODOS AND FIXMES]

- Recent changes:
  [LAST 20 COMMITS]

SPECIFIC TASK:
[DETAILED DESCRIPTION OF WHAT YOU NEED]

Where and how should I implement this considering all the above context?
```

### Step 3: Prepare context for engineer

After the dynamic agent responds, I prepare the prompt for the engineer:

```markdown
@engineer-laravel, implement the following:

COMPLETE PROJECT CONTEXT:

- Framework: [DETECTED]
- Structure: [ALL]
- NON-NEGOTIABLE Conventions:
  [COMPLETE LIST OF CONVENTIONS]

SPECIFICATIONS FROM dream-agent:
[EVERYTHING IT RESPONDED]

FILES YOU NEED TO KNOW:
[RELEVANT FILES CONTENT]

PROJECT EXAMPLES:
[SIMILAR CODE ALREADY IMPLEMENTED]

CRITICAL WARNINGS:
[EVERYTHING YOU SHOULDN'T DO]

TARGET METRICS:

- Coverage: >80%
- Complejidad: <10
- Performance: <100ms
```

### Step 4: Context for review

For the final review:

```markdown
@dream-agent, review this implementation:

ORIGINAL CONTEXT:
[WHAT YOU INITIALLY REQUESTED]

IMPLEMENTATION PERFORMED:
[COMPLETE DIFF OR SUMMARY]

CHANGED FILES:
[LIST WITH LINES]

ACHIEVED METRICS:
[ALL METRICS]

NECESSARY VALIDATIONS:

- Does it follow module patterns?
- Does it respect conventions?
- Does it not duplicate existing code?
- Are the tests sufficient?
- Is there any FLAG for other modules?
```

## Advantages

1. **Guarantees complete context** - You don't forget anything
2. **Avoids errors** - Agents have all the info
3. **Saves time** - You don't have to write everything manually
4. **Consistency** - Always the same format

## Complete example

```bash
# 1. Prepare context
/prepare-context dream

# 2. Copy the generated prompt and send it to dream-agent
@dream-agent [GENERATED PROMPT]

# 3. Copy the prompt for engineer
@engineer-laravel [GENERATED PROMPT]

# 4. Copy the review prompt
@dream-agent [REVIEW PROMPT]
```

## Important notes

- **Size doesn't matter** - If the context is 20,000 tokens, they are included
- **Better too much than too little** - More context = fewer errors
- **Agents need it** - Without context, they make generic code

---

_This command ensures you ALWAYS give complete context to agents_
