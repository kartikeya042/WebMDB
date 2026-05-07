const mongoose = require('mongoose');

const searchHistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    query: {
        type: String,
        required: true
    },
    resultsCount: Number
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);