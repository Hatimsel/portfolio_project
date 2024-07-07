import { v4 as uuidv4 } from 'uuid'

export class User {
    image = ''
    addresses = []
    reviews = []
    
    constructor(email, password, type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }

    addAddress(address) {
        this.addAddress.push(address);
    }

    addReview(review) {
        this.reviews.push(review);
    }
}

export class Category {
    image = ''

    constructor(title, description = '') {
        this.title = title;
        this.description = description;
    }

    // addProduct(product) {
    //     this.products.push(product);
    // }

    // deleteProduct(product) {
    //     this.products = this.products
    //                     .filter(item => item !== product);
    // }
}

export class Product {
    image = ''
    category = ''
    description  = ''

    constructor(title, price, userId) {
        this.title = title;
        this.price = price;
        this.userId = userId;
    }

    addDescription(description) {
        this.description = description;
    }

    addCategory(category) {
        this.category = category;
    }
}

export class Order {
    shippedAt = '';
    deliveredAt = '';

    constructor(productId, userId) {
        this.productId = productId;
        this.userId = userId;
        this.status = 'Processing';
        this.placedAt = new Date();
    }

    isShipped() {
        this.status = 'Shipped';
        this.shippedAt = new Date();
    }

    isDelivered() {
        this.status = 'Delivered';
        this.deliveredAt = new Date();
    }
}

export class Review {
    constructor(orderId, feedback, stars) {
        this.orderId = orderId;
        this.feedback = feedback;
        this.stars = stars;
    }
}
