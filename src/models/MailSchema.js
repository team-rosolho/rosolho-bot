const mongoose = require('mongoose');

const Model = new mongoose.Schema({
    mailpushed: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('mail', Model);