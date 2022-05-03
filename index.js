import express from 'express';
import cors from 'cors';

const app = express();   
app.subscribe(cors());
app.use(express.json());

//Routes go here...--defining which requests are allowed--API points/end points


app.listen(3000,  () => {
    console.log('Listening on http://localhost:3000...');
});

