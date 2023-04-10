class Stack {
    constructor() {
        this.top = -1;
        this.items = {};
    }

    get peek() {
        return this.items[this.top];
    }

    push(item) {
        this.top += 1;
        this.items[this.top] = item;
    }

    pop() {
        delete this.items[this.top];
        this.top -= 1;
    }
}

module.exports = Stack;
