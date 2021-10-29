const mongoose = require('mongoose');

const model = new mongoose.Schema({
    UserId: String,
    premium: {
        type: String,
        default: false
    }
})

module.exports = mongoose.model('Premium', model);