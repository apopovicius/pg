#!/bin/sh

# Function to display help
show_help() {
    echo "Usage:"
    echo "  On Linux/macOS: ./git-stats.sh [-a \"Author Name\"] [-t] [-s \"TIME\"] [-h]"
    echo "  On Windows (Git Bash): bash git-stats.sh [-a \"Author Name\"] [-t] [-s \"TIME\"] [-h]"
    echo ""
    echo "Options:"
    echo "  -a, --author       Specify the author name (e.g., \"Andrei Popovici\")."
    echo "  -t, --top          Show the top contributors by commit count with rankings."
    echo "  -s, --since \"TIME\"  Filter commits from a specific time (e.g., \"1 year ago\", \"6 months ago\")."
    echo "  -h, --help         Show this help message."
    exit 0
}

# If no arguments are provided, show help
if [ $# -eq 0 ]; then
    show_help
fi

# Enable Git's built-in cache for better performance
git config --local core.commitGraph true
git config --local gc.writeCommitGraph true

# Default values
AUTHOR=""
SHOW_TOP_CONTRIBUTOR=0
SINCE_FILTER=""

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
        -s|--since)
            SINCE_FILTER="$2"  # Properly store the time filter
            shift 2
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

# ✅ Fix: Only include `--since` if the user provides it
GIT_SINCE_OPTION=""
if [ -n "$SINCE_FILTER" ]; then
    # Store the parameter value without embedding quotes
    GIT_SINCE_OPTION="--since=$SINCE_FILTER"
fi

# Function to get commit count, lines added, and lines deleted more efficiently
get_git_stats() {
    local author="$1"
    local since_filter="$2"

    # Get commit count more efficiently with rev-list
    local total_commits
    if [ -n "$since_filter" ]; then
        total_commits=$(git rev-list --count --all --author="$author" --since="$since_filter")
    else
        total_commits=$(git rev-list --count --all --author="$author")
    fi

    # Get only the line stats with one pass
    local line_stats
    if [ -n "$since_filter" ]; then
        line_stats=$(git log --all --author="$author" --since="$since_filter" --numstat --pretty=format: |
            awk '
            NF == 3 { added += $1; deleted += $2 }
            END { print added, deleted }')
    else
        line_stats=$(git log --all --author="$author" --numstat --pretty=format: |
            awk '
            NF == 3 { added += $1; deleted += $2 }
            END { print added, deleted }')
    fi

    # Combine results
    echo "$total_commits $line_stats"
}

# If `-t` is used, show the top contributors with rankings (#1, #2, etc.)
if [ "$SHOW_TOP_CONTRIBUTOR" -eq 1 ]; then
    echo -e "🔝 Finding the top contributors..."

    # Build command with appropriate filter if needed
    if [ -n "$SINCE_FILTER" ]; then
        git shortlog -s -n --all --since="$SINCE_FILTER" |
            awk '{printf("#%d %s (%d commits)\n", NR, substr($0, index($0, $1) + length($1) + 1), $1);}'
    else
        git shortlog -s -n --all |
            awk '{printf("#%d %s (%d commits)\n", NR, substr($0, index($0, $1) + length($1) + 1), $1);}'
    fi
fi

# If `-a` is used, show stats for the author
if [ -n "$AUTHOR" ]; then
    echo -e "⏳ Fetching stats for author: $AUTHOR (Time filter: ${SINCE_FILTER:-No filter})"

    # Get all stats in one efficient pass
    if [ -n "$SINCE_FILTER" ]; then
        read total_commits total_added total_deleted <<< $(get_git_stats "$AUTHOR" "$SINCE_FILTER")
    else
        read total_commits total_added total_deleted <<< $(get_git_stats "$AUTHOR" "")
    fi
    # Output results
    echo -e "📊 Here are the stats for $AUTHOR"
    echo -e "➕ Lines added: +$total_added"
    echo -e "➖ Lines deleted: -$total_deleted"
    echo -e "✅ Total commits: $total_commits"
fi

# If no valid options were used, show help
if [ "$SHOW_TOP_CONTRIBUTOR" -eq 0 ] && [ -z "$AUTHOR" ]; then
    show_help
fi