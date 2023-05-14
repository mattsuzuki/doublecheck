const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    credential: { type: String, required: true },
    days: [{ type: String }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
