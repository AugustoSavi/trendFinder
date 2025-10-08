#!/bin/bash
set -e

echo "Starting Ollama with model: ${OLLAMA_MODEL:-default}"
ollama serve &
sleep 3

if [ -n "$OLLAMA_MODEL" ]; then
  echo "Pulling model: $OLLAMA_MODEL"
  ollama pull "$OLLAMA_MODEL"
fi

echo "✅ Ollama server ready"
wait
