const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a movie title'],
        },
        year: String,
        imdbID: {
            type: String,
            unique: true, // Prevents duplicate movies in your DB
        },
        type: String,
        poster: String,
        // We store the fuzzy score if the user saves the recommendation
        fuzzyScore: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Movie', movieSchema);