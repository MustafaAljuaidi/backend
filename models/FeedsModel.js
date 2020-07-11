// Importing mongoose
const mongoose = require('mongoose');

// Schema
const FeedsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        hashtags: {
            type: Array
        },
        image: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

const FeedsModel = mongoose.model('feeds', FeedsSchema);
module.exports = FeedsModel;