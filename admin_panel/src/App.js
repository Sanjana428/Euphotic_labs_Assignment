import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const AdminDashboard = () => {
    const [dishes, setDishes] = useState([]);
    const [newDishName, setNewDishName] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newIsPublished, setNewIsPublished] = useState(false);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get('/dishes');
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const addDish = async () => {
        try {
            await axios.post('/dishes', {
                dishName: newDishName,
                imageUrl: newImageUrl,
                isPublished: newIsPublished
            });
            fetchDishes();
            setNewDishName('');
            setNewImageUrl('');
            setNewIsPublished(false);
        } catch (error) {
            console.error('Error adding dish:', error);
        }
    };

    const togglePublishStatus = async (dishId, isPublished) => {
        try {
            const response = await axios.put(`/dishes/${dishId}`, {
                isPublished: !isPublished
            });
            console.log('Publish status toggled', response.data);
            fetchDishes();
        } catch (error) {
            console.error('Error toggling publish status:', error);
            console.log('dishId:', dishId);

        }
    };



    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <div className="add-dish-container">
                <h3>Add New Dish</h3>
                <input type="text" value={newDishName} onChange={(e) => setNewDishName(e.target.value)} placeholder="Dish Name" className="input-field" />
               <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Image URL" className="input-field" required />
                <label className="checkbox-label">
                    Publish:
                    <input type="checkbox" checked={newIsPublished} onChange={() => setNewIsPublished(!newIsPublished)} className="custom-checkbox"/>
    
                </label>
                <button onClick={addDish} className="add-button">Add Dish</button>
            </div>
            <div className="dishes-list-container">
                <h3>Dishes List</h3>
                {dishes.map(dish => (
                    <div className="dish-card" key={dish._id}>
                        <p>{dish.dishName}</p>
                        <img src={dish.imageUrl} alt={dish.dishName} />
                        <p>Published: {dish.isPublished.toString()}</p>
                        <button onClick={() => togglePublishStatus(dish._id, dish.isPublished)}>Toggle Publish</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;

