import express from 'express';
import cors from 'cors';
import { addRestaurant, getAllRestaurants } from './src/restaurants.js';

const app = express();   
app.subscribe(cors());
app.use(express.json());

//Routes go here...--defining which requests are allowed--API points/end points
app.post('/restaurants', addRestaurant);
app.get('/restaurants', getAllRestaurants);


app.listen(3000,  () => {
    console.log('Listening on http://localhost:3000...');
});

