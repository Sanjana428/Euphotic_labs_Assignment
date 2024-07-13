const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/db'); // Assuming you have a database connection utility

// Define the collection name
const collectionName = 'MyDishes';

// Function to get the dishes collection from MongoDB
async function getDishesCollection() {
    const database = await getDatabase();
    return database.collection(collectionName);
}

// Fetch all dishes
async function getAllDishes() {
    const collection = await getDishesCollection();
    return await collection.find({}).toArray();
}

// Add a new dish
async function addDish(dish) {
    try {
        const collection = getDishesCollection();
        const result = await collection.insertOne(dish);
        return result.ops[0];
    } catch (error) {
        console.error('Error adding dish:', error);
        throw new Error('Error adding dish');
    }
}


// Update a dish by dishId
async function updateDish(dishId, updatedDish) {
    const collection = await getDishesCollection();
    const filter = { _id: ObjectId(dishId) };
    const updateDoc = {
        $set: {
            dishName: updatedDish.dishName,
            imageUrl: updatedDish.imageUrl,
            isPublished: updatedDish.isPublished
        }
    };
    const result = await collection.updateOne(filter, updateDoc);
    return result;
}

// Toggle publish status of a dish by dishId
async function togglePublishStatus(dishId, isPublished) {
    const collection = await getDishesCollection();
    const filter = { _id: ObjectId(dishId) };
    const updateDoc = {
        $set: {
            isPublished: isPublished === 'true'
        }
    };
    const result = await collection.updateOne(filter, updateDoc);
    return result;
}


module.exports = {
    getAllDishes,
    addDish,
    updateDish,
    togglePublishStatus,
};
