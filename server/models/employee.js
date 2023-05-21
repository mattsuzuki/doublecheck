const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    shiftType: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    credential: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    scheduledDays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ScheduledDay'
        }
    ],
    shifts: [ShiftSchema],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
