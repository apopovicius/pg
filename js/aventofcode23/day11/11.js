const fs = require('fs');
const expandHorizontally = (smallG) => {
  let galaxy = [];
  smallG.forEach(line => {
    const empty = line.split('').filter(e=>e === '.').length === line.length ? true: false;
    if(empty) {
      console.log(`Got one empty line: ${line}`);
      galaxy.push(line);
    }
    galaxy.push(line);
  });
  return galaxy;
}
function main() {
  const smallG = fs.readFileSync('11.in').toString('utf-8').split('\n');
  console.log(smallG.length);
  const galaxy = expandHorizontally(smallG);
  //console.log(galaxy);
  console.log(galaxy.length);
}

main();
