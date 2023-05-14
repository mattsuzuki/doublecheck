const mongoose = require('mongoose');
const { Schema } = mongoose;

const shiftSchema = new Schema({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
