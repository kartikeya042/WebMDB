const User = require('../models/User');
const RecommendationHistory = require('../models/RecommendationHistory');

// @desc    Register a new user
// @route   POST /api/users
const registerUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Save a fuzzy recommendation result
const saveRecommendation = async (userId, params, movies) => {
    try {
        await RecommendationHistory.create({
            userId,
            inputParams: params,
            recommendedMovies: movies
        });
    } catch (error) {
        console.error("Error saving history:", error.message);
    }
};

module.exports = { registerUser, saveRecommendation };