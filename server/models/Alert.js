const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
    targetPrice: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        enum: ['above', 'below'],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Alert', alertSchema);
