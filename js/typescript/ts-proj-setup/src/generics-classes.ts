interface Quiz {
    name: string
    type: string
}

interface Course {
    name: string,
    author: string,
    price: number
}

//generic class
class Sellable<T> {
    public cart: T[] = []
    addToCart(product: T) {
        this.cart.push(product)
    }
}

const mySell = new Sellable<Quiz>();