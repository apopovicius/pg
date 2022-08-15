/* Factory function is a function that create an object that will be return in the end
function factory() {
    return {...}
}
- simple
- no duplication
- data privacy
*/

const me = {
    name: 'Ben',
    talk() {
        return `Hello I am ${this.name}`;
    }
}

const mark = {
    name: 'Mark',
    talk() {
        return `Hello I am ${this.name}`;
    }
}
me.talk();
mark.talk();


function personFactory(name) {
    return {
        talk() {
            return `Hello I am ${name}`;
        }
    }
}

const me2 = personFactory('Eugene');
me2.talk();
const mark2 = personFactory('Marcos');
mark2.talk();



// example 2
function createElement(type, text, color) {
    const el = document.createElement(type);
    el.innerText = text;
    el.style.color = color;
    document.body.append(el);
    return {
        el,
        setText(text) {
            el.innerText = text;
        },
        setColor(color) {
            el.style.color = color;
        }
    }
}

const h1 = createElement('h1', 'Ahoy', 'red')
h1.setColor('blue');
h1.setText('Not so easy!')


const p = createElement('p', 'para', 'yellow')
p.setColor('grey');
p.setText('my para')