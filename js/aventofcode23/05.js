const assert = require("assert");
const fs = require("fs");
const almanac = fs.readFileSync("05.in").toString("utf-8").split("\n\n");

const parseMap = (map) => {
  return map.split('\n').filter(e=>e!=='');
}

const checkRange = (line, number) => {
  return +number;
};

const getSoilFromSeed = (seed) => {
  const seed2soil = almanac[1].split(":")[1];
  const lines = parseMap(seed2soil);
  let soil = -1;
  for(let line of lines) {
    soil = checkRange(line, seed);
    if(soil !== -1) break;
  }
  assert(soil !== -1);
  return soil;
};

const getFertilizerFromSoil = (soil) => {
  const soil2fertilizer = almanac[2].split(":")[1];
};

const getWaterFromFertilizer = (fertilizer) => {
  const fertilizer2water = almanac[3].split(":")[1];
};

const getLightFromWater = (water) => {
  const water2light = almanac[4].split(":")[1];
};

const getTempFromLight = (light) => {
  const light2temp = almanac[5].split(":")[1];
};

const getHumidityFromTemp = (temp) => {
  const temp2humidity = almanac[6].split(":")[1];
};

const getLocationFromHumidity = (humidity) => {
  const humidity2location = almanac[7].split(":")[1];
};

function main() {
  const seeds = almanac[0].split(":")[1];
  let min = -1;
  seeds.split(' ').filter(e=> e!=='').forEach(seed => {
    let output = '';
    output += `Seed ${seed},`;
    const soil = getSoilFromSeed(seed);
    output += `soil ${soil},`;
    const fertilizer = getFertilizerFromSoil(soil);
    output += `fertilizer ${fertilizer},`;
    const water = getWaterFromFertilizer(fertilizer);
    output += `water ${water},`;
    const light = getLightFromWater(water);
    output += `light ${light},`;
    const temp = getTempFromLight(light);
    output += `temperature ${temp},`;
    const humidity = getHumidityFromTemp(temp);
    output += `humidity ${humidity},`;
    const location = getLocationFromHumidity(humidity);
    output += `location ${location}.`;
    //console.log(output);
    if(min === -1 || min > +location) {
      min = +location;
    }
  });

  console.log(min);
}

main();
