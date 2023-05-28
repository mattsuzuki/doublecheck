import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function EmployeeForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [credential, setCredential] = useState('');
    const [gender, setGender] = useState('');
    const [shifts, setShifts] = useState([]);
    const [error, setError] = useState(null);

    const handleShiftChange = (e) => {
        const selectedShifts = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        setShifts(selectedShifts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phoneNumber || !credential || shifts.length === 0) {
            setError('All fields are required');
            return;
        }
        try {
            const employeeData = {
                name,
                phoneNumber,
                credential,
                gender,
                shifts,
            };
            const response = await axios.post('http://localhost:3001/employees', employeeData);
            console.log(response.data);
            setError(null);
        } catch (error) {
            setError('Error adding employee: ' + error.message);
            console.error('Error adding employee:', error);
        }
    };

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
                        <label htmlFor="gender">Gender</label>
                        <Select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="unsure">Unsure</MenuItem>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shifts">Shifts</label>
                        <Select multiple value={shifts} onChange={handleShiftChange} inputProps={{ id: 'shifts' }}>
                            <MenuItem value="Morning">Morning</MenuItem>
                            <MenuItem value="Afternoon">Afternoon</MenuItem>
                            <MenuItem value="NOC">NOC</MenuItem>
                        </Select>
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Add Employee
                    </Button>
                    {error && <p>{error}</p>}
                </form>
                <div className='spaced'>
                    <Link to="/">
                        <Button variant="contained" color="primary">
                            Back to Homepage
                        </Button>
                    </Link>
                </div>
                <div className='spaced'>
                    <Link to="/employee-list">
                        <Button variant="contained" color="primary">
                            View Employees
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
