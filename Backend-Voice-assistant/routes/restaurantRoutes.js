const express = require('express');
const { getNearbyRestaurants } = require('../controllers/restaurantController');

const router = express.Router();

router.get('/nearby', getNearbyRestaurants);

module.exports = router;
