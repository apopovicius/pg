const n = 7
const schedule = [0, 0, 1, 0, 2, 2, 2]
const m = 2
const refactor = [2, 2]

function solveAndVisualize(n, schedule, m, refactor) {
    // 1. Run the optimal logic to find the minimum days
    let minDays = solve(n, schedule, m, refactor);

    if (minDays === -1) {
        console.log("Impossible to complete.");
        return;
    }

    console.log(`Optimal Solution found: ${minDays} days.`);
    console.log(`Verifying schedule compliance (1 task at a time)...`);

    // 2. Reconstruct the specific schedule for 'minDays'
    // We fix the release dates to the latest possible moments (as the algorithm does)
    let releaseDay = new Array(m + 1).fill(-1);
    for (let i = 0; i < minDays; i++) {
        const module = schedule[i];
        if (module > 0) {
            releaseDay[module] = i;
        }
    }

    // Map day -> Release Event
    let releaseMap = new Map();
    for (let i = 1; i <= m; i++) {
        releaseMap.set(releaseDay[i], i);
    }

    // Forward simulation with Earliest Deadline First (EDF) for work allocation
    let workDone = new Array(m + 1).fill(0);
    let workNeeded = [...refactor]; // 0-indexed

    console.log("\n--- Day-by-Day Schedule ---");

    for (let day = 0; day < minDays; day++) {
        let output = `Day ${day}: `;

        // Check if we MUST release today
        if (releaseMap.has(day)) {
            let moduleToRelease = releaseMap.get(day);
            // Verify work is done
            let needed = refactor[moduleToRelease - 1];
            let done = workDone[moduleToRelease];

            if (done === needed) {
                output += `✅ RELEASE Module ${moduleToRelease} (Work ${done}/${needed})`;
                console.log(output);
                continue; // Day used for release
            } else {
                output += `❌ FAIL Release Module ${moduleToRelease} (Work ${done}/${needed})`;
                console.log(output);
                console.log("CRITICAL ERROR: Algorithm claimed success but simulation failed.");
                return;
            }
        }

        // If not releasing, we can work.
        // Strategy: Pick the module with the EARLIEST UPCOMING DEADLINE that needs work.
        let targetModule = -1;
        let earliestDeadline = Infinity;

        for (let mod = 1; mod <= m; mod++) {
            let done = workDone[mod];
            let needed = refactor[mod - 1];
            let deadline = releaseDay[mod];

            if (done < needed) {
                // Must be released in future
                if (deadline > day && deadline < earliestDeadline) {
                    earliestDeadline = deadline;
                    targetModule = mod;
                }
            }
        }

        if (targetModule !== -1) {
            workDone[targetModule]++;
            let needed = refactor[targetModule - 1];
            output += `🔨 Work on Module ${targetModule} (Progress: ${workDone[targetModule]}/${needed}, Deadline: Day ${releaseDay[targetModule]})`;
        } else {
            output += `💤 Idle (No urgent work or all done)`;
        }
        console.log(output);
    }

    console.log("--- End of Schedule ---\n");
}


// --- Original Solution Logic ---
function solve(n, schedule, m, refactor) {
    let left = 1, right = n;
    let ans = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (canFinish(mid, schedule, m, refactor)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

function canFinish(days, schedule, m, refactor) {
    let releaseDay = new Array(m + 1).fill(-1);
    for (let i = 0; i < days; i++) {
        const module = schedule[i];
        if (module > 0) {
            releaseDay[module] = i;
        }
    }
    for (let i = 1; i <= m; i++) {
        if (releaseDay[i] === -1) return false;
    }
    let workNeeded = 0;
    let dayToReleaseModule = new Map();
    for (let i = 1; i <= m; i++) {
        dayToReleaseModule.set(releaseDay[i], i);
    }
    for (let i = days - 1; i >= 0; i--) {
        if (dayToReleaseModule.has(i)) {
            let module = dayToReleaseModule.get(i);
            workNeeded += refactor[module - 1];
        } else {
            if (workNeeded > 0) {
                workNeeded--;
            }
        }
    }
    return workNeeded === 0;
}

solveAndVisualize(n, schedule, m, refactor);
