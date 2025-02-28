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

# Show top contributor by commit count (FAST)
if [ "$SHOW_TOP_CONTRIBUTOR" -eq 1 ]; then
    echo "Finding the top contributor..."
    git shortlog -s -n | head -1
    exit 0
fi

# If author is set, fetch faster stats
if [ -n "$AUTHOR" ]; then
    echo "Fetching stats for author: $AUTHOR"

    # Get total commit count (FAST)
    total_commits=$(git rev-list --count --since=1.year --author="$AUTHOR" HEAD)

    # Get lines added and deleted (FASTER than --numstat)
    stats=$(git log --shortstat --since=1.year --author="$AUTHOR" --pretty=tformat: | awk '
        /files changed/ { added += $4; deleted += $6 }
        END { print added, deleted }
    ')

    # Extract numbers safely
    total_added=$(echo "$stats" | awk '{print $1+0}')
    total_deleted=$(echo "$stats" | awk '{print $2+0}')

    # Output results
    echo "📊 Here are the stats for $AUTHOR"
    echo "➕ Lines added: +$total_added"
    echo "➖ Lines deleted: -$total_deleted"
    echo "✅ Total commits: $total_commits"

    exit 0
fi
