import connectDb from './connectDb.js'; //no {} b/c it's the default import, normal export needs {}

//adding a restaurant
//  export function addRestaurant() {} old way, es5

// export const addRestaurant = (req, res) => {
//     // check if request is valid
//     if(!req.body || !req.body.name || !req.body.address) { //is there something in body or name or address?
//         res.status(401).send('Invalid request');
//         return;
//     }
//     // connect to firestore
//     const db = connectDb();
//     // prepare the data 
//     const newRestaurant = {
//         name: req.body.name,
//         address: req.body.address,
//         rating: req.body.rating || 3,   //or statement b/c we didn't check if there was a rating/cuisine
//         cuisine: req.body.cuisine || 'American' //setting a default assumption 
//     }
//     // add data to the restaurants collection
//     db.collection('restaurants').add(newRestaurant)
//     // respond with success
//     // respond with error
// } 

//async await method applied to same as above
export const addRestaurant = async (req, res) => {
    // check if request is valid
    if(!req.body || !req.body.name || !req.body.address) { //is there something in body or name or address?
        res.status(401).send('Invalid request');
        return;
    }
    // connect to firestore
const db = connectDb();
    // prepare the data 
    const newRestaurant = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        rating: req.body.rating || 3,   //or statement b/c we didn't check if there was a rating/cuisine
        cuisine: req.body.cuisine || 'American' //setting a default assumption 
    }
    // add data to the restaurants collection
    try {
    const doc = await db.collection('restaurants').add(newRestaurant);
    // respond with success
    res.status(201).send('Restaurant created ' + doc.id);
    } catch (err) {
    // respond with error
    res.status(500).send(err);
    }
} 

export const getAllRestaurants = async (req, res) => {
    const db = connectDb();
    try {const snapshot = await db.collection('restaurants').get();
    const restaurantsArray = snapshot.doc.map(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        return restaurant;
    })
res.send(restaurantsArray);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const deleteRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    if(!restaurantId) {
      res.status(401).send('Invalid request');
      return;
    }
    try {
    const db = connectDb();
    await db.collection("restaurants").doc(restaurantId).delete()
      .then(() => {
        res.send('Restaurant deleted.');
      })
    } catch (err) {
        res.status(500).send(err);
      };
  } 


  export const updateRestaurant = async (req, res) => {
    if(!req.params || !req.params.restaurantId || !req.body) {
      res.status(401).send('Invalid request');
      return;
    }
    try {
    const { restaurantId } = req.params;
    const db = connectDb();
    await db.collection('restaurants').doc(restaurantId).update(req.body)
      .then(() => {
        res.send('Restaurant updated.');
      })
     } catch (err) {
        res.status(500).send(err);
      };
  }