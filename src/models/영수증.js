const mongoose = require('mongoose');

const Model = new mongoose.Schema({
    PinCode: String
});

module.exports = mongoose.model('영수증', Model);