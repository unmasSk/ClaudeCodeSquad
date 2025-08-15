#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "openai",
#     "python-dotenv",
#     "pygame",
# ]
# ///

import os
import sys
import tempfile
import time
from pathlib import Path
from dotenv import load_dotenv


def main():
    """
    OpenAI TTS Script

    Uses OpenAI's latest TTS model for high-quality text-to-speech.
    Accepts optional text prompt as command-line argument.

    Usage:
    - ./openai_tts.py                    # Uses default text
    - ./openai_tts.py "Your custom text" # Uses provided text

    Features:
    - OpenAI tts-1-hd model (high quality for Spanish)
    - Nova voice (best for Spanish according to Bex!)
    - Saves to temporary MP3 file
    - Playback using pygame mixer (reliable on Windows)
    """

    # Load environment variables
    load_dotenv()

    # Get API key from environment
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY not found in environment variables")
        print("Please add your OpenAI API key to .env file:")
        print("OPENAI_API_KEY=your_api_key_here")
        sys.exit(1)

    try:
        from openai import OpenAI
        import pygame

        # Initialize OpenAI client
        client = OpenAI(api_key=api_key)

        print("OpenAI TTS")
        print("=" * 20)

        # Get text from command line argument or use default
        if len(sys.argv) > 1:
            text = " ".join(sys.argv[1:])  # Join all arguments as text
        else:
            text = "Today is a wonderful day to build something people love!"

        print(f"Text: {text}")
        print("Generating audio...")

        try:
            # Generate audio using OpenAI TTS
            response = client.audio.speech.create(
                model="tts-1-hd",  # tts-1-hd para mejor calidad con español
                voice="nova",       # Nova - la voz elegida por Bex!
                input=text,
            )

            # Save to temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
                # Write the audio content to the file
                for chunk in response.iter_bytes(chunk_size=1024):
                    temp_file.write(chunk)
                temp_path = temp_file.name

            print("Playing audio...")
            
            # Initialize pygame mixer
            pygame.mixer.init()
            
            # Load and play the audio file
            pygame.mixer.music.load(temp_path)
            pygame.mixer.music.play()
            
            # Wait for playback to complete
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)

            print("Playback complete!")
            
            # Clean up - quit pygame mixer first, then delete file
            pygame.mixer.quit()
            
            # Small delay to ensure file is released
            time.sleep(0.1)
            
            try:
                os.unlink(temp_path)
            except:
                pass  # Sometimes Windows keeps the file locked briefly

        except Exception as e:
            print(f"Error: {e}")

    except ImportError as e:
        print("Error: Required package not installed")
        print("This script uses UV to auto-install dependencies.")
        print("Make sure UV is installed: https://docs.astral.sh/uv/")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
