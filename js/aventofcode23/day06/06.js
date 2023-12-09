const fs = require("fs");

const computeAllTimings = (time) => {
  const distances = [];
  for (let i = 0; i <= time; i++) {
    const speed = i;
    const distance = (time - i) * speed;
    distances.push(distance);
  }
  return distances;
};

function main() {
  const raceLog = fs.readFileSync("06.in").toString("utf-8").split("\n");
  const timings = raceLog[0]
    .split(":")[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));

  const distances = raceLog[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));

  const fullTime = Number(timings.join("")); //P2
  const fullDistance = Number(distances.join("")); //P2

  const results = [];
  for (let i = 0; i < timings.length; i++) {
    const raceResults = computeAllTimings(timings[i]).filter(
      (e) => e >= distances[i],
    );
    results.push(raceResults.length);
  }

  const nbOfWays = results.reduce((prev, curr) => curr * prev, 1);
  console.log(nbOfWays); //P1

  const finalRaceResult = computeAllTimings(fullTime).filter(
    (e) => e >= fullDistance,
  ).length;
  console.log(finalRaceResult); //P2

  //  console.log(computeAllTimings(7));
}

main();
