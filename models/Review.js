const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    comment: String,
    approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Review', reviewSchema);
