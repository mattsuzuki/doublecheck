// EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function EmployeeForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [credential, setCredential] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeData = {
                name,
                phoneNumber,
                credential
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
            <button type="submit">Add Employee</button>
        </form>
    );
}
