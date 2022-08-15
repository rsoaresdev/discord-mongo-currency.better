const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    coinsInWallet: Number,
    coinsInBank: Number,
    bankSpace: Number,
    inventory: { type: Array, default: null },
    work: { type: Number, default: null }
});

module.exports = mongoose.model('currency', CurrencySchema);
