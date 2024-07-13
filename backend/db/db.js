const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Restaurant';

let client;
let db;

const connectToDatabase = async () => {
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if there is a connection error
    }
};

const getCollection = (collectionName) => {
    const db = client.db(dbName); // Ensure client and dbName are defined and accessible
    return db.collection(collectionName);
};

// Connect to the database immediately
connectToDatabase();


module.exports = { connectToDatabase, getCollection };
