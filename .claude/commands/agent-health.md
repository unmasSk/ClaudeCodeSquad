---
command: agent-health
description: ❤️‍🩹 Check health status and upgrade needs for dynamic agents
---

# Agent Health Check & Upgrade System

This command allows dynamic agents to self-diagnose and request upgrades when their knowledge becomes outdated.

## Available Commands

### Check Single Agent Health

```
/agent-health api-agent
```

### Check All Agents Health

```
/agent-health --all
```

### Force Upgrade

```
/agent-health api-agent --upgrade
```

### Deep Analysis

```
/agent-health api-agent --deep
```

## Health Check Process

### 1. Quick Health Check (Default)

```python
def quick_health_check(agent_name):
    """
    Fast check that runs on every agent activation
    Takes ~100ms
    """
    current_file_count = count_files(module_path) or 0
    last_known_count = get_agent_metadata(agent_name, "file_count") or 0

    # Quick drift calculation
    drift = abs(current_file_count - last_known_count) * 3

    # Time-based drift
    days_old = get_agent_age_days(agent_name) or 0
    drift += max(0, days_old) * 0.5    drift = abs(current_file_count - last_known_count) * 3

    # Time-based drift
    days_old = get_agent_age_days(agent_name)
    drift += days_old * 0.5

    return {
        "agent": agent_name,
        "health": "healthy" if drift < 20 else "degraded" if drift < 50 else "critical",
        "drift_score": drift,
        "quick_check": True,
        "recommendation": get_recommendation(drift)
    }
```

### 2. Deep Health Analysis

```python
def deep_health_check(agent_name):
    """
    Comprehensive analysis of agent knowledge vs module reality
    Takes ~5-10 seconds
    """

    analysis = {
        "structural_analysis": analyze_structure_changes(),
        "pattern_analysis": detect_pattern_changes(),
        "dependency_analysis": check_dependency_updates(),
        "complexity_analysis": measure_complexity_change(),
        "test_coverage_analysis": check_coverage_delta(),
        "performance_analysis": analyze_performance_changes()
    }

    # Calculate comprehensive drift score
    drift_score = calculate_comprehensive_drift(analysis)

    # Generate detailed report
    report = generate_health_report(agent_name, analysis, drift_score)

    return report
```

## Health Report Format

````markdown
# Health Check Report: api-agent

**Status**: ⚠️ DEGRADED
**Drift Score**: 45/100
**Last Updated**: 15 days ago
**Confidence Level**: 72%

## 📊 Module Changes Detected

### File System Changes

- New files: 12
- Deleted files: 3
- Modified files: 28
- New directories: 2

### Pattern Changes

- ✅ Still using: Repository Pattern, Service Layer
- ⚠️ New pattern detected: Event Sourcing (not in my knowledge)
- ❌ Deprecated: Direct DB queries (replaced with repository)

### Dependency Updates

- Updated: laravel/framework 10.0 → 11.0
- Added: laravel/octane
- Removed: legacy/package

### Complexity Metrics

| Metric     | Previous | Current | Delta |
| ---------- | -------- | ------- | ----- |
| Files      | 125      | 137     | +12   |
| Lines      | 8,450    | 9,230   | +780  |
| Complexity | 6.2      | 7.1     | +0.9  |
| Coverage   | 82%      | 79%     | -3%   |

## 🎯 Recommendations

### Immediate Actions

1. **Pattern Update**: Learn about Event Sourcing implementation
2. **Framework Update**: Update knowledge for Laravel 11
3. **Coverage Alert**: Coverage dropped below 80% threshold

### Upgrade Recommendation

**Recommended**: Schedule upgrade within 2 days

### Confidence Impact

Current confidence for different tasks:

- ✅ Basic CRUD operations: 95%
- ⚠️ New event sourcing: 40%
- ✅ Existing patterns: 88%
- ⚠️ Laravel 11 features: 60%

## 🔄 Upgrade Options

### Option 1: Automatic Upgrade

```bash
/agent-health api-agent --upgrade
```
````

- Time: ~2 minutes
- Downtime: None
- Risk: Low

### Option 2: Guided Upgrade

```bash
/agent-health api-agent --upgrade --interactive
```

- Time: ~5 minutes
- Downtime: None
- Risk: Very Low
- Benefit: Review changes before applying

### Option 3: Defer Upgrade

- Continue with degraded confidence
- Set reminder for: [DATE]
- Risk: May provide outdated guidance
  dashboard = {
  "total_agents": len(agents),
  "healthy": count_by_status(results, "healthy"),
  "degraded": count_by_status(results, "degraded"),
  "critical": count_by_status(results, "critical"),
  "average_drift": average_drift(results),
  "average_age": average_age_days(results),
  "upgrade_needed": filter_need_upgrade(results)
  }
  agents = find_all_dynamic_agents(".claude/agents/")
  results = []

  for agent in agents:
  health = quick_health_check(agent)
  results.append(health)

  # Summary dashboard

  dashboard = {
  "total_agents": len(agents),
  "healthy": count_by_status(results, "healthy"),
  "degraded": count_by_status(results, "degraded"),
  "critical": count_by_status(results, "critical"),
  "average_drift": average_drift(results),
  "upgrade_needed": filter_need_upgrade(results)
  }

  return dashboard

`````

### Dashboard Output

```
╔════════════════════════════════════════╗
║        AGENT HEALTH DASHBOARD          ║
╠════════════════════════════════════════╣
║ Total Agents: 5                        ║
║                                        ║
║ ✅ Healthy: 2 (40%)                   ║
║ ⚠️  Degraded: 2 (40%)                 ║
║ 🔴 Critical: 1 (20%)                   ║
║                                        ║
║ Average Drift: 38/100                  ║
║ Average Age: 22 days                   ║
╠════════════════════════════════════════╣
║ AGENTS NEEDING UPGRADE:                ║
║ 🔴 payments-agent (drift: 72)         ║
║ ⚠️  api-agent (drift: 45)             ║
║ ⚠️  auth-agent (drift: 41)            ║
╠════════════════════════════════════════╣
║ Recommended Action:                    ║
║ Run: /agent-health --all --upgrade     ║
╚════════════════════════════════════════╝
```

## Auto-Upgrade System

### Upgrade Process

````python
def upgrade_agent(agent_name, options={}):
    """
    Upgrade a dynamic agent to current module state
    """

    # Step 1: Backup current version
    backup_current_agent(agent_name)

    # Step 2: Re-analyze module
    module_analysis = analyze_module_complete(get_module_path(agent_name))

    # Step 3: Load upgrade template
    template = load_template("dynamic-agent-upgrade.md")

    # Step 4: Generate upgrade
    upgrade_content = generate_upgrade(
        agent_name,
        module_analysis,
        template,
        options
    )

    # Step 5: Apply upgrade
    save_agent(agent_name, upgrade_content)

    # Step 6: Validate
    validation = validate_upgrade(agent_name)

    # Step 7: Report
 def upgrade_agent(agent_name, options={}):
-    backup_current_agent(agent_name)
+    backup_version = backup_current_agent(agent_name)

     # … code that builds `upgrade_content` …

-    save_agent(agent_name, upgrade_content)
+    new_version = save_agent(agent_name, upgrade_content)

     # … validation logic …

-    return {
+    return {
         "success": validation["passed"],
         "old_version": backup_version,
         "new_version": new_version,
         "improvements": list_improvements(),
         "breaking_changes": list_breaking_changes()
     }```

## Continuous Monitoring

### Background Health Monitor
```python
def enable_continuous_monitoring():
    """
    Enable background health monitoring for all agents
    """

    schedule = {
        "quick_check": "on_activation",  # Every time agent is used
        "daily_check": "daily at 3am",   # Quick check all agents
        "deep_check": "weekly sunday",   # Deep analysis
        "auto_upgrade": "monthly",       # Auto-upgrade if drift > 70
    }

    # Set up monitors
    for agent in get_all_agents():
        setup_monitor(agent, schedule)

    # Alert thresholds
    alerts = {
        "drift_warning": 40,
        "drift_critical": 60,
        "age_warning": 30,  # days
        "age_critical": 60,  # days
    }

    return monitoring_dashboard_url()
`````

## Integration with Memory System

### Health Metrics in Memory

```
.claude/memory/agents/
├── health/
│   ├── current_scores.json
│   ├── history.json
│   └── upgrade_log.json
├── metrics/
│   ├── confidence_tracking.json
│   ├── error_patterns.json
│   └── success_patterns.json
└── learning/
    ├── common_questions.json
    ├── confusion_points.json
    └── improvement_suggestions.json
```

## Health Check Hooks

### Pre-Activation Hook

```python
@before_agent_activation
def check_agent_health(agent_name):
    """
    Quick health check before using agent
    """

    health = quick_health_check(agent_name)

    if health["drift_score"] > 70:
        warning = f"""
        ⚠️ WARNING: {agent_name} knowledge is significantly outdated
        Drift Score: {health["drift_score"]}/100
        Recommendation: Upgrade before proceeding

        Continue anyway? (y/n)
        """
        if not confirm(warning):
            trigger_upgrade(agent_name)

    return health
```

### Post-Error Hook

```python
@after_agent_error
def analyze_error_for_drift(agent_name, error):
    """
    Check if error indicates outdated knowledge
    """

    if indicates_outdated_knowledge(error):
        trigger_deep_check(agent_name)
        suggest_upgrade(agent_name)
```

---

_This health system ensures all dynamic agents maintain accurate, up-to-date knowledge of their modules._
