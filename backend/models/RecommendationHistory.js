const mongoose = require('mongoose');

const recommendationHistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inputParams: {
        genre: String,
        mood: String,
        timeAvailable: Number,
        minRating: Number,
        yearRange: String
    },
    recommendedMovies: [{
        title: String,
        imdbID: String,
        fuzzyScore: Number,
        recommendationLevel: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('RecommendationHistory', recommendationHistorySchema);