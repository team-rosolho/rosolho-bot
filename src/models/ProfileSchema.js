const mongoose = require('mongoose');

module.exports = mongoose.model('profile', new mongoose.Schema({
    guildId: String,
    userId: String,
    warns: { type: Number, default: 0 }
}));