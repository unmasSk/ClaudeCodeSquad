#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "elevenlabs",
#     "python-dotenv",
# ]
# ///

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

def main():
    """List all available ElevenLabs voices"""
    
    # Load environment variables
    load_dotenv()
    
    # Get API key from environment
    api_key = os.getenv('ELEVENLABS_API_KEY')
    if not api_key:
        print("Error: ELEVENLABS_API_KEY not found in environment variables")
        sys.exit(1)
    
    try:
        from elevenlabs.client import ElevenLabs
        
        # Initialize client
        client = ElevenLabs(api_key=api_key)
        
        print("ElevenLabs Available Voices:")
        print("=" * 50)
        
        # Get all voices
        voices = client.voices.get_all()
        
        for i, voice in enumerate(voices.voices, 1):
            print(f"{i}. Name: {voice.name}")
            print(f"   ID: {voice.voice_id}")
            print(f"   Category: {voice.category}")
            if hasattr(voice, 'description') and voice.description:
                print(f"   Description: {voice.description}")
            print("-" * 30)
            
    except ImportError:
        print("Error: elevenlabs package not installed")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()