// EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

export default function EmployeeForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [credential, setCredential] = useState('');
    const [days, setDays] = useState([]);
    const [shifts, setShifts] = useState([]);

    const handleDayChange = (e) => {
        const selectedDays = Array.from(e.target.selectedOptions, (option) => option.value);
        setDays(selectedDays);
    };

    const handleShiftChange = (e) => {
        const selectedShifts = Array.from(e.target.selectedOptions, (option) => option.value);
        setShifts(selectedShifts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeData = {
                name,
                phoneNumber,
                credential,
                days,
                shifts,
            };
            const response = await axios.post('http://localhost:3001/employees', employeeData);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Phone Number:
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
            <label>
                Credential:
                <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} />
            </label>
            <label>
                Days:
                <select multiple value={days} onChange={handleDayChange}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </label>
            <label>
                Shifts:
                <select multiple value={shifts} onChange={handleShiftChange}>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="NOC">NOC</option>
                </select>
            </label>
            <button type="submit">Add Employee</button>
        </form>
    );
}
