const mongoose = require('mongoose');

const UnavailabilitySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Unavailability', UnavailabilitySchema);
