// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model.js');
const DB_NAME = 'express-drones-dev';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const drones = [
  {
    name: 'My First Drone',
    propellers: 4,
    maxSpeed: 18
  },
  {
    name: 'My Second Drone',
    propellers: 6,
    maxSpeed: 24
  },
  {
    name: 'My Third Drone',
    propellers: 8,
    maxSpeed: 38,
  }
];


// Then we create the books.
Drone.create(drones)
  .then(dronesFromDB => {
    console.log(`Created ${dronesFromDB.length} drones in my drones DB`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating drones based on the seed file: ${err}`));