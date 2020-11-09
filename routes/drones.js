const express = require('express');
const Drone = require('../models/Drone.model');

// require the Drone model here

const router = express.Router();

router.get('/drones/list', (req, res, next) => {
  // Iteration #2: List the drones
 Drone.find()
 .then((dronesFromDB) => {
   console.log(dronesFromDB)
  res.render('drones/list', {dronesFromDB})
 })
 .catch((err) => {
  res.render('error', {err})
});
});


router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
 res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
let {name, propellers, maxSpeed} = req.body;
console.log(req.body)

Drone.create({
    name,  
    propellers,
    maxSpeed,
})
.then (() => {
  res.redirect('/drones/list')
})
.catch(() => {
  res.redirect('/drones/create') 
})
});


router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.droneId;
  Drone.findById(droneId)
  .then((theDrone) => {
    //console.log('This is the drone:', theDrone)
    res.render('drones/update-form', {theDrone})
  })
  .catch((err) => {
    res.render('error', {err})
  })
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.droneId; 
  let {name, propellers, maxSpeed} = req.body;  
  Drone.findByIdAndUpdate(droneId, {
    name,
    propellers, 
    maxSpeed
  }).then(() => {
    res.redirect('/drones/list');
  })
  .catch(() => {
    res.redirect('/drones/update-form') 
  })
});


router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
 let droneId = req.params.droneId;

Drone.findByIdAndDelete(droneId)
  .then(() => {
  res.redirect('/drones/list');
})
});

module.exports = router;
