const express = require('express');
const router = express.Router();
const { 
    searchMovies, 
    getMovieDetails, 
    getTrendingMovies, 
    recommendMovies 
} = require('../controllers/movieController');

// Import user registration
const { registerUser } = require('../controllers/userController');

// Movie Routes
router.get('/search/:query', searchMovies);
router.get('/details/:id', getMovieDetails);
router.get('/trending', getTrendingMovies);
router.post('/recommend', recommendMovies);

// User Routes
router.post('/users/register', registerUser);

module.exports = router;