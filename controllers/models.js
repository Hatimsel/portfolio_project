import { v4 as uuidv4 } from 'uuid'

export class User {
    // id = ""
    addresses = []
    image = ""
    
    constructor(email, password, type) {
        this.email = email;
        this.password = password;
        this.type = type;
        // this.id = uuidv4();
    }

    addAddress(address) {
        this.addAddress.push(address);
    }

}

export class Address {
    constructor(title = '', address) {
        this.title = title;
        this.address = address;
    }
}

export class Category {
    image = ''
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
    }
}

export class Product {
    image = ''
    category = ''
    description  = ''

    constructor(title, price) {
        // this.id = uuidv4();
        this.title = title;
        this.price = price;
    }

    addDescription(description) {
        this.description = description;
    }
}

export class Order {
    constructor(productId, userId) {
        // this.id = uuidv4();
        this.productId = productId;
        this.userId = userId;
        this.status = 'Processing';
    }

    isShipped() {
        this.status = 'Shipped';
    }

    isDelivered() {
        this.status = 'Delivered';
    }
}

// const user = new User('hatim', 'selmun', 'seller');
// console.log(user);

// const address = new Address('Home', 'st12. assilah');
// console.log(address);

// const product = new Product('Burger', 5);
// console.log(product);

// const order = new Order(product.id, user.id);
// console.log(order);
// order.isShipped();
// console.log(order);
// order.isDelivered();
// console.log(order);

// const category = new Category('Fast Food');
// console.log(category);

// module.exports = User;
