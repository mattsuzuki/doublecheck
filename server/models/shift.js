const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    shift: { type: String, required: true, enum: ['AM', 'PM', 'NOC'] },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' }
});
const Shift = mongoose.model('Shift', shiftSchema);
module.exports = mongoose.model('Shift', ShiftSchema);



