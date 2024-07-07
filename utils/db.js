import { MongoClient } from 'mongodb';

class DBClient {
    // constructor() {
    //     this.host = process.env.DB_HOST || 'localhost';
    //     this.port = process.env.DB_PORT || 27017;
    //     this.database = process.env.DB_DATABASE || 'crumble';
    //     this.url = `mongodb://${this.host}:${this.port}`;
    //     this.isConnected = false;

    //     MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             this.isConnected = true;
    //             console.log('Connected to MongoDB');
    //             this.db = client.db(this.database);
    //             this.userCollection = this.db.collection('user');
    //             this.addressCollection = this.db.collection('address');
    //             this.categoryCollection = this.db.collection('category');
    //             this.productCollection = this.db.collection('product');
    //             this.orderCollection = this.db.collection('order');
    //         }
    //     });
    // }
    constructor() {
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || 27017;
        this.database = process.env.DB_DATABASE || 'crumble';
        this.url = `mongodb://${this.host}:${this.port}`;
        this.isConnected = false;
        this.client = null;
        this.db = null;
    }

    async connect() {
        try {
            this.client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
            this.isConnected = true;
            this.db = this.client.db(this.database);
            this.userCollection = this.db.collection('user');
            this.addressCollection = this.db.collection('address');
            this.categoryCollection = this.db.collection('category');
            this.productCollection = this.db.collection('product');
            this.orderCollection = this.db.collection('order');
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
        }
    }
}

const dbClient = new DBClient();
dbClient.connect().then(() => {
    console.log('Connection status:', dbClient.isConnected);
}).catch(err => {
    console.error('Error during connection:', err);
});

export default dbClient;
