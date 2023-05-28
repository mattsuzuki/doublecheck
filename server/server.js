const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/Employee');
const Shift = require('./models/Shift');
const Note = require('./models/Note');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/staffScheduler', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors());

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server');
});

// GET all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE new employee
app.post('/employees', async (req, res) => {
    console.log(req.body); // This is the new line
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ message: 'Error creating employee', error: err });
    }
});

// UPDATE employee
app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE employee
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// SEARCH for employees by credential and unit
app.get('/employees/search', async (req, res) => {
    try {
        const { credential, unit } = req.query;

        const employees = await Employee.find({
            credential: credential,
            preferredUnit: unit,
        });

        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all notes for an employee
app.get('/employees/:id/notes', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).populate('notes');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee.notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE new note for an employee
app.post('/employees/:id/notes', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const note = new Note(req.body);
        await note.save();
        employee.notes.push(note);
        await employee.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Your shift routes here...

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
