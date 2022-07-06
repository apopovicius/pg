class Singleton {
    constructor() {

        if(Singleton.instance instanceof Singleton) {
            return Singleton.instance;
        }

        this.data = { 
            'location': 'Iasi',
            'age': Math.floor(Math.random() * 80)
        };

        Object.freeze(this.data); // wont allow to modify from exterior
        Object.freeze(this);
        Singleton.instance = this;
    }

    get(key) {
        return this.data[key];
    }
}


let s1 = new Singleton();
console.log(s1.get('age'));
let s2 = new Singleton();
s1 === s2;