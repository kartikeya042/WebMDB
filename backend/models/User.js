const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    preferences: {
        favoriteGenres: [String],
        defaultMood: { type: String, default: 'casual' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);