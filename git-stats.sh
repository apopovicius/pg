#!/bin/sh

# Function to display help
show_help() {
    echo "Usage: bash git-stats.sh [-a \"Author Name\"] [-t] [-h]"
    echo ""
    echo "Options:"
    echo "  -a, --author    Specify the author name (e.g., \"Andrei Popovici\")."
    echo "  -t, --top       Show the top contributor by commit count."
    echo "  -h, --help      Show this help message."
    exit 0
}

# If no arguments are provided, show help
if [ $# -eq 0 ]; then
    show_help
fi

# Default values
AUTHOR=""
SHOW_TOP_CONTRIBUTOR=0

# Parse command-line arguments
while [ $# -gt 0 ]; do
    case "$1" in
        -a|--author)
            AUTHOR="$2"
            shift 2
            ;;
        -t|--top)
            SHOW_TOP_CONTRIBUTOR=1
            shift
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            ;;
    esac
done

# Show top contributor by commit count
if [ "$SHOW_TOP_CONTRIBUTOR" -eq 1 ]; then
    echo "Finding the top contributor..."
    git shortlog -s -n | head -1
    exit 0
fi

# Initialize counters
total_added=0
total_deleted=0
total_commits=0

# Build Git log command
GIT_CMD="git log --all --numstat --pretty=\"%H\" --since=1.year"
if [ -n "$AUTHOR" ]; then
    GIT_CMD="$GIT_CMD --author=\"$AUTHOR\""
fi

# Store git log output to avoid subshell issues
git_log_output=$(eval "$GIT_CMD")

# Process each line
while IFS= read -r line; do
    if echo "$line" | grep -qE "^[a-f0-9]{40}$"; then
        total_commits=$((total_commits + 1))
    elif echo "$line" | grep -qE "^[0-9]+[[:space:]][0-9]+"; then
        added=$(echo "$line" | awk '{print $1}')
        deleted=$(echo "$line" | awk '{print $2}')
        total_added=$((total_added + added))
        total_deleted=$((total_deleted + deleted))
    fi
done <<< "$git_log_output"

# Output results
echo "📊 Here are the stats for $AUTHOR"
echo "➕ Lines added: +$total_added"
echo "➖ Lines deleted: -$total_deleted"
echo "✅ Total commits: $total_commits"
