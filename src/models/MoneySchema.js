const mongoose = require('mongoose');

const model = new mongoose.Schema({
    UserId: String,
    Money: Number
})

module.exports = mongoose.model('money', model);