const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    day: {
        type: Number,
        min: 1,
        max: 31,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Sick', 'Vacation', 'Off'],
        default: 'Scheduled'
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
