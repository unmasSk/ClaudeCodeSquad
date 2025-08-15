---
command: tts
description: 🎙️ Instant TTS
execute_immediately: true
---

# 🎙️ TTS - Instant Speech

## 🎯 Usage

```bash
/tts Hello world
/tts ¡Esta noche cenamos en el infierno!
/tts Any text you want to hear spoken
```

## 🔧 Implementation

When invoked with `/tts [text]`:

1. **Parse the text** - Everything after `/tts` becomes the speech text
2. **Call ElevenLabs** - Uses the configured voice (currently Leonidas)
3. **Play audio** - Instantly plays the generated speech
4. **Save audio** - Also saves as `temp_tts_audio.mp3` for replay

## 🎭 Current Voice Configuration

- **Voice**: Leonidas (Epic warrior voice)
- **Model**: eleven_turbo_v2_5 (Fast, high-quality)
- **Language**: Works with any language (Spanish, English, etc.)

## 📝 Examples

```bash
# Epic announcements
/tts ¡Por Esparta!

# Task completions
/tts Tarea completada con éxito

# Notifications
/tts El código está listo para producción

# Fun messages
/tts Houston, tenemos un problema
```

## 🔄 Change Voice

To use a different voice, edit `.claude/hooks/utils/tts/elevenlabs_tts.py` and change the `voice_id`.

## 🛠️ Requirements

- ✅ ElevenLabs API key in `.env`
- ✅ FFmpeg installed
- ✅ Python with elevenlabs package

## 💡 Tips

- Keep messages short for faster generation
- Use punctuation for better speech rhythm
- Add exclamation marks for emphasis
- Use proper accents in Spanish for best pronunciation

---

_Speak your mind with the power of Leonidas!_ ⚔️
