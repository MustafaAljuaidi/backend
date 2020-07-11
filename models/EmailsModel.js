// Importing mongoose
const mongoose = require('mongoose');

// Schema
const EmailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        }
    }
);

const EmailsModel = mongoose.model('emails', EmailsSchema);
module.exports = EmailsModel;