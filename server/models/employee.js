const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    credential: String,
    preferredUnit: String,
    notes: String,
    days: [String],
});

module.exports = mongoose.model('Employee', EmployeeSchema);
