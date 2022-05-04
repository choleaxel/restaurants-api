import express from 'express';
import cors from 'cors';
import { addRestaurant, getAllRestaurants, deleteRestaurant, updateRestaurant } from './src/restaurants.js';

const app = express();   
app.subscribe(cors());
app.use(express.json());

//Routes go here...--defining which requests are allowed--API points/end points
app.post('/restaurants', addRestaurant);
app.get('/restaurants', getAllRestaurants);
app.delete('/restaurants/:restaurantId', deleteRestaurant);
app.patch('/restaurants/:restaurantId', updateRestaurant);
app.post('/restaurants', addRestaurant);


app.listen(3031,  () => {
    console.log('Listening on http://localhost:3031...');
});

