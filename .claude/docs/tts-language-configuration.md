# TTS Language Configuration Guide

> Complete guide for configuring Text-to-Speech in different languages for ClaudeSquad hooks system.

## 📋 Table of Contents

- [Current Configuration (Spanish)](#current-configuration-spanish)
- [Available TTS Providers](#available-tts-providers)
- [Changing to English](#changing-to-english)
- [Configuring Other Languages](#configuring-other-languages)
- [Voice Options](#voice-options)
- [Testing Your Configuration](#testing-your-configuration)
- [Troubleshooting](#troubleshooting)

## 🇪🇸 Current Configuration (Spanish)

The system is currently configured for **Spanish** with:

- **Primary**: OpenAI TTS with Nova voice
- **Fallback**: pyttsx3 with Helena voice (Windows Spanish)
- **Messages**: Generated in Spanish via LLM

## 🔊 Available TTS Providers

### 1. OpenAI TTS (Recommended)

- **Pros**: High quality, natural sounding
- **Cons**: Requires API key, costs per character
- **Languages**: 50+ languages (with American accent)
- **Voices**: alloy, echo, fable, onyx, nova, shimmer

### 2. pyttsx3 (Offline Fallback)

- **Pros**: Free, offline, no API needed
- **Cons**: Robotic sounding
- **Languages**: Depends on OS installed voices
- **Voices**: System dependent

### 3. ElevenLabs (Not configured)

- **Pros**: Best quality, native accents
- **Cons**: Expensive, requires API key
- **Languages**: 29 languages with native voices

## 🇬🇧 Changing to English

### Step 1: Update Notification Messages

Edit `.claude/hooks/notification.py`:

```python
# Line 65-67 - Change from Spanish to English
notification_message = f"{engineer_name}, your agent needs your input"
# Instead of: f"{engineer_name}, Claude necesita tu atencion"
```

### Step 2: Update Stop Hook Messages

Edit `.claude/hooks/stop.py`:

```python
# Line 27-34 - Change to English messages
def get_completion_messages():
    """Return list of friendly completion messages."""
    return [
        "Work complete!",
        "All done!",
        "Task finished!",
        "Job complete!",
        "Ready for next task!",
        "Successfully completed!",
        "Finished!"
    ]
```

### Step 3: Update LLM Prompt for English

Edit `.claude/hooks/utils/llm/oai.py`:

```python
# Line 58-81 - Change prompt to English
if engineer_name:
    name_instruction = f"Sometimes (about 30% of the time) include the engineer's name '{engineer_name}' in a natural way."
    examples = f"""Examples of the style:
- Standard: "Work complete!", "All done!", "Task finished!", "Ready for your next move!"
- Personalized: "{engineer_name}, all set!", "Ready for you, {engineer_name}!", "Complete, {engineer_name}!", "{engineer_name}, we're done!" """
else:
    name_instruction = ""
    examples = """Examples of the style: "Work complete!", "All done!", "Task finished!", "Ready for your next move!" """

prompt = f"""Generate a short, friendly completion message for when an AI coding assistant finishes a task.

Requirements:
- Keep it under 10 words
- Make it positive and future focused
- Use natural, conversational language
- Focus on completion/readiness
- Do NOT include quotes, formatting, or explanations
- Return ONLY the completion message text
{name_instruction}

{examples}

Generate ONE completion message:"""
```

### Step 4: Update pyttsx3 Voice (Optional)

Edit `.claude/hooks/utils/tts/pyttsx3_tts.py`:

```python
# Line 41-44 - Change to English voice
for voice in voices:
    if 'zira' in voice.name.lower():  # Zira for English (Female)
        helena_voice = voice.id
        print(f"Using voice: Zira (English Female)")
        break
```

## 🌍 Configuring Other Languages

### French Configuration

```python
# notification.py
notification_message = f"{engineer_name}, votre agent a besoin de votre attention"

# stop.py messages
"Travail terminé!", "Tout est fait!", "Tâche complétée!"

# oai.py prompt
prompt = f"""Générez un message court et amical en FRANÇAIS..."""
```

### German Configuration

```python
# notification.py
notification_message = f"{engineer_name}, Ihr Agent benötigt Ihre Aufmerksamkeit"

# stop.py messages
"Arbeit abgeschlossen!", "Alles erledigt!", "Aufgabe beendet!"

# oai.py prompt
prompt = f"""Generieren Sie eine kurze, freundliche Nachricht auf DEUTSCH..."""
```

### Italian Configuration

```python
# notification.py
notification_message = f"{engineer_name}, il tuo agente ha bisogno della tua attenzione"

# stop.py messages
"Lavoro completato!", "Tutto fatto!", "Compito terminato!"

# oai.py prompt
prompt = f"""Genera un messaggio breve e amichevole in ITALIANO..."""
```

## 🎤 Voice Options

### OpenAI Voices Performance by Language

| Voice   | English    | Spanish  | French   | German   | Italian  |
| ------- | ---------- | -------- | -------- | -------- | -------- |
| alloy   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐   |
| echo    | ⭐⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐⭐ | ⭐⭐⭐   |
| fable   | ⭐⭐⭐⭐   | ⭐⭐     | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐   |
| onyx    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐   |
| nova    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐⭐ |
| shimmer | ⭐⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐   |

### pyttsx3 System Voices

To list available system voices:

```bash
uv run .claude/hooks/utils/tts/list_voices.py
```

Common voices by OS:

- **Windows**: David (EN-US), Zira (EN-US), Helena (ES-ES), Hortense (FR-FR), Hedda (DE-DE)
- **macOS**: Alex (EN-US), Victoria (EN-US), Monica (ES-ES), Amelie (FR-FR), Anna (DE-DE)
- **Linux**: Varies by installed espeak/festival voices

## 🧪 Testing Your Configuration

### Test Individual TTS Scripts

```bash
# Test OpenAI TTS
uv run .claude/hooks/utils/tts/openai_tts.py "Test message in your language"

# Test pyttsx3
uv run .claude/hooks/utils/tts/pyttsx3_tts.py "Test message in your language"

# Test all OpenAI voices
uv run .claude/hooks/utils/tts/test_all_voices.py
```

### Test LLM Message Generation

```bash
# Test completion message generation
uv run .claude/hooks/utils/llm/oai.py --completion
```

### Test Complete Hook

```bash
# Trigger stop hook manually (requires Claude Code running)
# The hook will activate when Claude finishes a task
```

## 🔧 Troubleshooting

### Issue: Interference/Static in Audio

**Solution**: Already fixed by using pygame instead of LocalAudioPlayer

### Issue: Wrong Language Speaking

**Solution**: Check all 3 locations - notification.py, stop.py, oai.py

### Issue: Accent Problems

**Solution**: OpenAI voices have American accent. Consider ElevenLabs for native accents

### Issue: No Audio Playing

**Solutions**:

1. Check .env file has correct API key
2. Verify with: `echo $OPENAI_API_KEY` (bash) or `echo %OPENAI_API_KEY%` (cmd)
3. Test fallback: `uv run .claude/hooks/utils/tts/pyttsx3_tts.py "test"`

### Issue: Windows Encoding Errors

**Solution**: Remove emojis from print statements (already done)

## 📚 References

- Original inspiration: [claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
- OpenAI TTS Docs: [platform.openai.com/docs/guides/text-to-speech](https://platform.openai.com/docs/guides/text-to-speech)
- pyttsx3 Docs: [pyttsx3.readthedocs.io](https://pyttsx3.readthedocs.io/)

## 🎯 Quick Language Switch Commands

```bash
# For English speakers
sed -i 's/Claude necesita tu atencion/your agent needs your input/g' .claude/hooks/notification.py

# For French speakers
sed -i 's/Claude necesita tu atencion/votre agent a besoin de votre attention/g' .claude/hooks/notification.py

# For German speakers
sed -i 's/Claude necesita tu atencion/Ihr Agent benötigt Ihre Aufmerksamkeit/g' .claude/hooks/notification.py
```

---

_Note: Remember to test after making changes to ensure proper functionality._
