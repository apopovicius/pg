#!/bin/sh

# Initialize counters
total_added=0
total_deleted=0
total_commits=0

# Store git log output in a variable to avoid subshell issues
git_log_output=$(git log --all --numstat --pretty="%H" --author="Andrei Popovici" --since=1.year)

# Process each line without losing variables
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
echo "Lines added: +$total_added"
echo "Lines deleted: -$total_deleted"
echo "Total commits: $total_commits"
