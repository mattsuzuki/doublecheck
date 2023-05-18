const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    shiftName: String,
    startTime: String,
    endTime: String,
    unit: String,
    requiredCredentials: [String],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

module.exports = mongoose.model('Shift', ShiftSchema);
