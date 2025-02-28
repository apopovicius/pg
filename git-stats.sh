#!/bin/sh

# Function to display help
show_help() {
    echo "Usage:"
    echo "  On Linux/macOS: ./git-stats.sh [-a \"Author Name\"] [-t] [-s \"TIME\"] [-h]"
    echo "  On Windows (Git Bash): bash git-stats.sh [-a \"Author Name\"] [-t] [-s \"TIME\"] [-h]"
    echo ""
    echo "Options:"
    echo "  -a, --author       Specify the author name (e.g., \"Andrei Popovici\")."
    echo "  -t, --top          Show the top contributor by commit count."
    echo "  -s, --since \"TIME\"  Filter commits from a specific time (e.g., \"1 year ago\", \"6 months ago\")."
    echo "  -h, --help         Show this help message."
    exit 0
}

# If no arguments are provided, show help
if [ $# -eq 0 ]; then
    show_help
fi

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
    # Handle date parameter with spaces correctly
    GIT_SINCE_OPTION="--since=$SINCE_FILTER"
fi

# Function to get commit count, lines added, and lines deleted in one pass
get_git_stats() {
    local author="$1"
    local since_option="$2"
    local total_commits=0
    local total_added=0
    local total_deleted=0

    # Get stats using git log
    # Use eval to ensure proper handling of shell arguments with quotes
    eval "git log --all --author=\"$author\" $since_option --numstat --pretty=\"%H\"" | awk '
    NF == 1 { commits++ }
    NF == 3 { added += $1; deleted += $2 }
    END { print commits, added, deleted }'
}

# If `-t` is used, show the top contributors
if [ "$SHOW_TOP_CONTRIBUTOR" -eq 1 ]; then
    echo -e "🔝 Finding the top contributors..."
    if [ -n "$SINCE_FILTER" ]; then
        git shortlog -s -n --all --since="$SINCE_FILTER"
    else
        git shortlog -s -n --all
    fi
fi

# If `-a` is used, show stats for the author
if [ -n "$AUTHOR" ]; then
    echo -e "⏳ Fetching stats for author: $AUTHOR (Time filter: ${SINCE_FILTER:-No filter})"

    # Call function to get all stats in one pass
    # Call function to get all stats in one pass
    if [ -n "$SINCE_FILTER" ]; then
        read total_commits total_added total_deleted <<< $(get_git_stats "$AUTHOR" "--since=\"$SINCE_FILTER\"")
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