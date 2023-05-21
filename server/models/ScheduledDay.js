const ScheduledDaySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    unavailability: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unavailability'
        }
    ]
});

module.exports = mongoose.model('ScheduledDay', ScheduledDaySchema);
