#!/bin/bash

# A curl utility that caches responses to avoid repeated network calls.

show_help() {
    echo "Usage: cached-fetch.sh --url <URL> [--cache-name <NAME>] [--ttl <SECONDS>]"
    echo
    echo "Options:"
    echo "  --url           The URL to fetch."
    echo "  --cache-name    Optional. A unique name for the cache file. Defaults to the URL's domain."
    echo "  --ttl           Optional. The cache's Time To Live in seconds. Defaults to 10800 (3 hours)."
    echo "  --help          Show this help message."
}

# Parse named arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --url)
            URL="$2"
            shift 2
            ;;
        --cache-name)
            CACHE_NAME="$2"
            shift 2
            ;;
        --ttl)
            TTL="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "Invalid argument: $1"
            show_help
            exit 1
            ;;
    esac
done

if [ -z "$URL" ]; then
    echo "Error: --url is a required argument."
    show_help
    exit 1
fi

# Set defaults if not provided
if [ -z "$TTL" ]; then
    TTL=10800 # Default to 3 hours
fi

# Determine cache directory
CACHE_DIR="/tmp/hypr-fetch-cache"
mkdir -p "$CACHE_DIR"

# Determine cache name from URL domain if not provided
if [ -z "$CACHE_NAME" ]; then
    CACHE_NAME=$(echo "$URL" | sed -E 's/https?:\/\///' | cut -d'/' -f1)
fi

CACHE_FILE="$CACHE_DIR/$CACHE_NAME"

# If cache file exists, check its age
if [ -f "$CACHE_FILE" ]; then
    FILE_AGE=$(($(date +%s) - $(date -r "$CACHE_FILE" +%s)))
    if [ "$FILE_AGE" -lt "$TTL" ]; then
        cat "$CACHE_FILE"
        exit 0
    fi
fi

# If cache is invalid or doesn't exist, fetch new content
TMP_OUTPUT=$(mktemp)
if curl -sS --fail -o "$TMP_OUTPUT" "$URL"; then
    mv "$TMP_OUTPUT" "$CACHE_FILE"
    
    # Log the update time
    LOG_FILE="/tmp/cache_fetch_last_update"
    touch "$LOG_FILE"
    # Remove old entry and append new one
    sed -i "/^$CACHE_NAME:/d" "$LOG_FILE"
    echo "$CACHE_NAME:$(date +%Y-%m-%dT%H:%M:%S)" >> "$LOG_FILE"

    cat "$CACHE_FILE"
else
    rm -f "$TMP_OUTPUT"
    if [ -f "$CACHE_FILE" ]; then
        echo "Warning: Using stale cache for '$CACHE_NAME' as fetch failed." >&2
        cat "$CACHE_FILE" # Return stale cache on failure
        exit 0
    fi
    echo "Error: Failed to fetch URL and no cache was available." >&2
    exit 1
fi