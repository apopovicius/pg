import fs from "node:fs";
import assert from "node:assert/strict";

const content = fs.readFileSync("data.in").toString("utf-8").split("\n");
let resP1 = 0;
let resP2 = 0;

const moveLeft = (pointing, x) => {
  console.log(`Left -> Pointing: ${pointing}, rotation: ${x}`);
  const ticks = pointing - x;
  if (ticks < 0) {
    if (pointing !== 0) {
      resP2++;
      console.log(`Response#2 updated: ${resP2}`);
    }
    return 100 + ticks;
  } else return ticks;
};

const moveRight = (pointing, x) => {
  console.log(`Right -> Pointing: ${pointing}, rotation: ${x}`);
  const ticks = pointing + x;
  if (ticks > 100) {
    if (pointing !== 0) {
      resP2++;
      console.log(`Response#2 updated: ${resP2}`);
    }
    return ticks - 100;
  } else return ticks;
};

const operate = (pointing, val) => {
  const values = val.split("");
  let rotation = +val.substring(1);
  if (rotation > 100) {
    console.log(`Overrotation: ${rotation}`);
    const digits = val.substring(1).length;
    if (true) {
      console.log(`Rotating #times:${Math.floor(rotation / 100)}`);
      assert(!isNaN(rotation / 100));
      resP2 += Math.floor(rotation / 100);
      console.log(`Response#2 updated: ${resP2}`);
    }
    rotation = +val.substring(digits - 1); // 986 -> 86
    console.log(`Overrotation calibrated: ${rotation}`);
  }
  if (values[0] === "R") return moveRight(pointing, rotation);
  return moveLeft(pointing, rotation);
};

let pointing = 50;

for (const x of content) {
  if (x.length > 0) {
    pointing = operate(pointing, x);
    assert((pointing) => 0, "Negative number");
    assert(pointing <= 100, "Over limit");
    if (pointing === 100) pointing = 0;
    console.log(`After ${pointing}`);
    if (pointing === 0) {
      resP1++;
      resP2++;
    }
  }
}

fs.writeFileSync("data.out", resP1.toString() + "\n", { encoding: "utf-8" });
fs.writeFileSync("data.out", resP2.toString(), {
  encoding: "utf-8",
  flag: "a+",
});
