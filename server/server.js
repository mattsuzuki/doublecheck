const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/employee');
const Shift = require('./models/shift');

const app = express();

mongoose.connect('mongodb://localhost:27017/staffScheduler', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors());

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/employees', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        credential: req.body.credential,
        days: req.body.days,
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Shift endpoints
app.get('/shifts', async (req, res) => {
    try {
        const shifts = await Shift.find();
        res.json(shifts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/shifts', async (req, res) => {
    const shift = new Shift({
        shiftName: req.body.shiftName,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
    });

    try {
        const newShift = await shift.save();
        res.status(201).json(newShift);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
