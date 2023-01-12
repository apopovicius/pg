function justify(text, width) {
    if (text.length <= width) return text;
    const textArray = text.split(' ');
    let sentence = '';
    let justifyText = '';
    for (let word of textArray) {
        if (sentence.length + word.length <= width) {
            sentence += word;
            sentence += ' ';
            continue;
        }
        // taking out last space from sentence
        sentence = sentence.slice(0, -1);
        let sentenceArray = sentence.split(' ');
        // all words-1 should have at least one space +
        // remaining from sentence = diff(frameWidth-sentenceLength)
        let extraSpaces = width - sentence.length;
        let totalNrOfSpaces = sentenceArray.length - 1 + extraSpaces;
        let arrayOfSpace = [];

        for (let i = 0; i < sentenceArray.length - 1; i++) {
            arrayOfSpace[i] = 1;
        }
        for (let i = 0; i < extraSpaces; i++) {
            if (i >= sentenceArray.length - 1) {
                extraSpaces = extraSpaces - i;
                i = 0;
            }
            arrayOfSpace[i] += 1;
        }

        sentence = '';
        let spaces = '';
        for (let i = 0; i < sentenceArray.length; i++) {
            sentence += sentenceArray[i];
            //take the spaces from array;
            spaces = ' '.repeat(arrayOfSpace[i]) || '\n';
            sentence += spaces;
        }

        justifyText += sentence;
        sentence = word + ' ';
    }

    if (!justifyText.includes(sentence)) {
        if (sentence[sentence.length - 1] === ' ') {
            sentence = sentence.slice(0, -1);
        }
        justifyText += sentence;
    }

    console.log(justifyText);
    return justifyText;
}

const LIPSUM =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.';

const expected = `Lorem  ipsum  dolor  sit amet,
consectetur  adipiscing  elit.
Vestibulum    sagittis   dolor
mauris,  at  elementum  ligula
tempor  eget.  In quis rhoncus
nunc,  at  aliquet orci. Fusce
at   dolor   sit   amet  felis
suscipit   tristique.   Nam  a
imperdiet   tellus.  Nulla  eu
vestibulum    urna.    Vivamus
tincidunt  suscipit  enim, nec
ultrices   nisi  volutpat  ac.
Maecenas   sit   amet  lacinia
arcu,  non dictum justo. Donec
sed  quam  vel  risus faucibus
euismod.  Suspendisse  rhoncus
rhoncus  felis  at  fermentum.
Donec lorem magna, ultricies a
nunc    sit    amet,   blandit
fringilla  nunc. In vestibulum
velit    ac    felis   rhoncus
pellentesque. Mauris at tellus
enim.  Aliquam eleifend tempus
dapibus. Pellentesque commodo,
nisi    sit   amet   hendrerit
fringilla,   ante  odio  porta
lacus,   ut   elementum  justo
nulla et dolor.`;

const textJust = justify(LIPSUM, 30);
console.log(textJust.length, expected.length);
for (let i = 0; i < textJust.length; i++) {
    if (textJust[i] !== expected[i]) {
        console.log(textJust[i], expected[i]);
    }
}

//justify('123 45 6', 7);
