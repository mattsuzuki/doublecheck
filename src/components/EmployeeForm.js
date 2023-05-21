import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import './EmployeeForm.css';

export default function EmployeeForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [credential, setCredential] = useState('');
    const [assignedDates, setAssignedDates] = useState([]);
    const [assignedShifts, setAssignedShifts] = useState([]);
    const [currentEmployees, setCurrentEmployees] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCurrentEmployees();
    }, []);

    const fetchCurrentEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/employees');
            setCurrentEmployees(response.data);
        } catch (error) {
            console.error('Error fetching current employees:', error);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (assignedDates.includes(selectedDate)) {
            setAssignedDates(assignedDates.filter((date) => date !== selectedDate));
        } else {
            setAssignedDates([...assignedDates, selectedDate]);
        }
    };

    const handleShiftChange = (e) => {
        const selectedShifts = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        setAssignedShifts(selectedShifts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phoneNumber || !credential) {
            setError('All fields are required');
            return;
        }
        try {
            const employeeData = {
                name,
                phoneNumber,
                credential,
                assignedDates,
                assignedShifts,
            };
            const response = await axios.post('http://localhost:3001/employees', employeeData);
            console.log(response.data);
            setError(null);
        } catch (error) {
            setError('Error adding employee: ' + error.message);
            console.error('Error adding employee:', error);
        }
    };

    // Function to get the number of days in a month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    // Function to generate an array of dates in the selected month
    const generateDatesArray = () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const daysInMonth = getDaysInMonth(year, month);
        const datesArray = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const day = i < 10 ? `0${i}` : `${i}`;
            const date = `${year}-${month}-${day}`;
            datesArray.push(date);
        }

        return datesArray;
    };

    const monthDates = generateDatesArray();

    return (
        <div className="employee-form-container">
            <div className="employee-form">
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <TextField id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <TextField id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credential">Credential</label>
                        <Select
                            id="credential"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                        >
                            <MenuItem value="RN">RN</MenuItem>
                            <MenuItem value="LVN/PT">LVN/PT</MenuItem>
                            <MenuItem value="BHS">BHS</MenuItem>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignedDates">Assigned Dates</label>
                        {monthDates.map((date) => (
                            <div key={date}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={date}
                                        checked={assignedDates.includes(date)}
                                        onChange={handleDateChange}
                                    />
                                    {new Date(date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignedShifts">Assigned Shifts</label>
                        <Select multiple value={assignedShifts} onChange={handleShiftChange} inputProps={{ id: 'assignedShifts' }}>
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                            <MenuItem value="NOC">NOC</MenuItem>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="currentEmployees">Current Employees</label>
                        <Select
                            id="currentEmployees"
                            multiple
                            value={[]}
                            onChange={() => { }}
                            inputProps={{ id: 'currentEmployees' }}
                        >
                            {currentEmployees.map((employee) => (
                                <MenuItem key={employee._id} value={employee._id}>
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Add Employee
                    </Button>
                    {error && <p>{error}</p>}
                </form>
                <Link to="/">
                    <Button variant="contained" color="primary" style={{ marginTop: '1em' }}>
                        Back to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
}
