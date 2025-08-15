---
command: todo
description: 📅 Advanced todo management with persistent markdown file, due dates, and priority sorting
---

# 📝 Advanced Todo Manager for ClaudeSquad

Manage project todos in a persistent `todos.md` file with due dates, priorities, and smart sorting.

## 🎯 Usage Examples

```bash
# Add tasks
/todo add "Implement OAuth login"
/todo add "Review PR #45" tomorrow
/todo add "Deploy to production" next week
/todo add "Fix critical bug" today 3pm
/todo add "Update documentation" 12-25-2024

# Manage tasks
/todo complete 1          # Mark task 1 as done
/todo remove 2            # Delete task 2
/todo undo 1              # Reopen completed task
/todo due 3 tomorrow      # Set due date for task 3

# View tasks
/todo                     # List all tasks
/todo list                # Same as above
/todo list 5              # Show only 5 tasks
/todo next                # Show next task to work on
/todo past due            # Show overdue tasks
/todo today               # Show tasks due today
/todo week                # Show tasks for this week
```

## 📋 Command Reference

### Adding Tasks

- `add "description"` - Add a new task
- `add "description" [date/time]` - Add with due date
  - Supports: "tomorrow", "next week", "in 2 days", "June 9", "12-24-2024", "3pm", etc.

### Managing Tasks

- `complete N` - Mark task N as completed
- `remove N` - Delete task N permanently
- `undo N` - Reopen completed task N
- `due N [date/time]` - Set/update due date for task N
- `priority N [high/medium/low]` - Set priority for task N

### Viewing Tasks

- `list [N]` - Show all or N tasks
- `next` - Show next task (respects priorities and due dates)
- `past due` - Show overdue tasks
- `today` - Tasks due today
- `week` - Tasks for this week
- `completed` - Show completed tasks

## 🔧 Implementation

When this command is invoked:

### Simple Text Input Support

The command now accepts simple text input that gets automatically formatted:

```bash
# Simple text input - automatically formatted by Claude
/todo claude-context investigation
/todo fix critical bug in auth
/todo update documentation tomorrow

# Claude will detect keywords and auto-format as:
# - Priority: high/medium/low (based on keywords like "critical", "bug", "urgent")
# - Due dates: "tomorrow", "next week", "urgent" etc.
# - Proper task ID assignment
```

### Auto-Formatting Rules

Claude will analyze simple text input and:
- **Detect priority** from keywords (critical/urgent/bug = high, feature/improvement = medium, docs/cleanup = low)
- **Parse dates** from natural language ("tomorrow", "next week", "urgent")
- **Assign unique task ID** by finding next available number
- **Format properly** for todos.md structure

1. **Locate Project Root**

   - Look for: `.git`, `package.json`, `Cargo.toml`, `pyproject.toml`, etc.
   - Default to current directory if no markers found

2. **File Management**

   - Create/locate `todos.md` in project root
   - Ensure proper markdown structure
   - Maintain backup in `.claude/backups/todos.md.backup`

3. **Task Format**

   ```markdown
   # Project Todos

   ## 🔥 High Priority

   - [ ] Critical bug fix | Due: 12-18-2024 3:00 PM | #1
   - [ ] Security patch | Due: 12-18-2024 | #2

   ## 🟡 Medium Priority

   - [ ] Implement new feature | Due: 12-20-2024 | #3
   - [ ] Code review | #4

   ## 🟢 Low Priority

   - [ ] Update documentation | Due: 12-25-2024 | #5
   - [ ] Refactor old code | #6

   ## ✅ Completed

   - [x] Setup project | Done: 12-15-2024 | #7
   - [x] Create API | Due: 12-14-2024 | Done: 12-14-2024 | #8
   ```

4. **Smart Sorting**

   - Within each priority level, sort by due date
   - Tasks with due dates appear before those without
   - Overdue tasks highlighted with 🚨

5. **Date Parsing**

   - Natural language: "tomorrow", "next week", "in 3 days"
   - Specific dates: "12-25-2024", "Dec 25", "Christmas"
   - Times: "3pm", "15:00", "tomorrow 2pm"
   - Relative: "in 2 hours", "+3d", "next Monday"

6. **Display Format**
   When listing tasks, show:

   ```
   📝 Active Tasks (6)

   🔥 HIGH PRIORITY
   1. [🚨 OVERDUE] Critical bug fix - Due: Yesterday 3:00 PM
   2. Security patch - Due: Today

   🟡 MEDIUM PRIORITY
   3. Implement new feature - Due: Tomorrow
   4. Code review - No due date

   🟢 LOW PRIORITY
   5. Update documentation - Due: Dec 25
   6. Refactor old code - No due date

   ✅ Recently Completed (last 3)
   7. Setup project - Done: Dec 15
   8. Create API - Done: Dec 14
   ```

## 🎨 Features

### Priority Levels

- 🔥 **High**: Critical tasks, bugs, blockers
- 🟡 **Medium**: Features, improvements
- 🟢 **Low**: Nice-to-have, documentation

### Due Date Intelligence

- Automatic sorting by urgency
- Overdue detection with 🚨 alerts
- Today's tasks highlighted
- Smart "next task" selection

### Persistence

- Markdown file in repo (version controlled)
- Survives between Claude sessions
- Team shareable
- Human readable

### Error Handling

- Graceful handling of invalid task numbers
- Date parsing validation
- File permission checks
- Automatic backup before modifications

## 💡 Advanced Features

### Bulk Operations

```bash
/todo complete 1,3,5          # Complete multiple tasks
/todo remove all completed    # Clean up completed tasks
/todo archive                 # Move completed to archive file
```

### Filtering

```bash
/todo filter "bug"            # Show tasks containing "bug"
/todo filter @john            # Tasks assigned to @john
/todo filter #urgent          # Tasks with #urgent tag
```

### Statistics

```bash
/todo stats                   # Show productivity statistics
/todo burndown               # Show burndown chart (ASCII)
```

## 📊 Integration with ClaudeSquad

### Sync with Trello (if configured)

- Tasks can optionally sync with Trello board
- Bidirectional sync available

### FLAGS System Integration

- High priority todos can create FLAGS
- Automatic delegation to relevant agents

### Git Integration

- Can create todos from git issues
- Link todos to commits/PRs

## 🚀 Benefits Over Standard TodoWrite

| Feature              | TodoWrite    | /todo Command   |
| -------------------- | ------------ | --------------- |
| **Persistence**      | Session only | File-based      |
| **Due Dates**        | ❌           | ✅ Full support |
| **Priorities**       | Manual       | Auto-sorted     |
| **Team Share**       | ❌           | ✅ Via Git      |
| **Overdue**          | ❌           | ✅ Detection    |
| **Natural Language** | ❌           | ✅ "tomorrow"   |
| **Bulk Ops**         | ❌           | ✅ Multiple     |
| **Search**           | ❌           | ✅ Filter       |
| **Archive**          | ❌           | ✅ Completed    |
| **Backup**           | ❌           | ✅ Automatic    |

## 🔒 Best Practices

1. **Use priorities** to organize work
2. **Set due dates** for time-sensitive tasks
3. **Complete tasks** instead of removing them
4. **Review overdue** tasks daily
5. **Archive completed** tasks monthly
6. **Use tags** like #bug, #feature, @person
7. **Keep descriptions** concise but clear

## 📝 Example Workflow

```bash
# Monday morning
/todo past due              # Check overdue
/todo today                 # Plan the day
/todo add "Team standup" today 10am

# During work
/todo next                  # Get next task
/todo complete 1            # Mark as done
/todo add "Fix found bug" high

# End of day
/todo complete 2,3,4        # Finish tasks
/todo add "Continue tomorrow" tomorrow
/todo stats                 # Review progress
```

## 🎯 Coming Soon

- Integration with calendar apps
- Recurring tasks support
- Time tracking per task
- Pomodoro timer integration
- Team assignment (@mentions)
- Dependencies between tasks

---

_This advanced todo system keeps you organized, productive, and never loses your tasks!_
