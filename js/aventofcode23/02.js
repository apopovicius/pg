const fs = require('fs');
const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const countGems = (round) => {
  const gems = round.split(',');
  let red = 0;
  let blue = 0;
  let green = 0;
  gems.forEach( gem => {
    const parts = gem.split(' ');
    switch(parts[2]) {
      case 'red': red +=+parts[1]; break;
      case 'blue': blue +=+parts[1]; break;
      case 'green': green +=+parts[1]; break;
      default: 
        throw new Error(`corrupted game! gem: ${parts[2]} not found`);
    }
  });
  return [red, green, blue];
};


const games = fs.readFileSync('02.in').toString('utf-8').split('\n');
let red = 0;
let green = 0;
let blue = 0;
let sum = 0;

games.forEach( g => {
  console.log(g);
  const parts = g.split(':');
  const key = parts[0].split(' ')[1];
  const rounds = parts[1].split(';');
  rounds.forEach( ro => {
    let [r,g,b] = countGems(ro);
    console.log(r,' ', g, ' ', b);
    red +=r;
    green += g;
    blue += b;
  });
  console.log(`After game ${key} we got red:${red}, green: ${green}, blue: ${blue} gems`);
  if(red > MAX_RED || green > MAX_GREEN || blue > MAX_BLUE) console.log(`Invalid game! Over the threshold`);
  else {
    sum += +key;
  }
  red = 0;
  blue = 0;
  green = 0;
});

console.log(sum);
