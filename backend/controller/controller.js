const { getCollection } = require('../db/db');
const { ObjectId } = require('mongodb'); // Import ObjectId

const collectionName = 'MyDishes'; // Adjust collection name as per your setup

exports.getAllDishes = async (req, res) => {
    try {
        const collection = getCollection(collectionName);
        const dishes = await collection.find({}).toArray();
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addDish = async (req, res) => {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.insertOne(req.body);
        console.log('Insertion Result:', result.ops[0]);
        result.ops[0];
    } catch (error) {
        console.error('Error adding dish:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateDish = async (req, res) => {
    try {
        const { dishId } = req.params;
        const { isPublished } = req.body;
        const collection = getCollection(collectionName);
        const result = await collection.updateOne(
            { _id: new ObjectId(dishId) },
            { $set: { isPublished } }
        );
        res.json(result);
    } catch (error) {
        console.error('Error updating dish:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.togglePublishStatus = async (req, res) => {
    try {
        const { dishId } = req.params;
        const { isPublished } = req.body;
        const collection = getCollection(collectionName);
        // const dish = await collection.findOne({ _id: new ObjectId(dishId) });

        // const updatedIsPublished = !dish.isPublished;
        const result = await collection.updateOne(
            { _id: new ObjectId(dishId) },
            { $set: { isPublished } }
        );
        res.json(result);
    } catch (error) {
        console.error('Error toggling publish status:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};


