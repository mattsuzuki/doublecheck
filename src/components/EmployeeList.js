import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function EmployeeList({ triggerUpdate }) {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCredential, setFilterCredential] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, [triggerUpdate]);

    useEffect(() => {
        fetchEmployees();
    }, [filterCredential]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees?credential=${filterCredential}`);
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
        }
    };

    const handleFilterChange = (e) => {
        setFilterCredential(e.target.value);
    };

    return (
        <div className="employee-list-container">
            <Link to="/" className="back-link">
                Back to Homepage
            </Link>
            <div className="search-filter">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter days"
                    className="search-input"
                />
                <FormControl>
                    <InputLabel id="filter-credential-label">Credential</InputLabel>
                    <Select
                        labelId="filter-credential-label"
                        id="filter-credential"
                        value={filterCredential}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All Credentials</MenuItem>
                        <MenuItem value="RN">RN</MenuItem>
                        <MenuItem value="LVN/PT">LVN/PT</MenuItem>
                        <MenuItem value="BHS">BHS</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {employees.map((employee) => (
                <div key={employee._id} className="employee-card">
                    <h3 className="employee-name">Name: {employee.name}</h3>
                    <p className="employee-info">Number: {employee.phoneNumber}</p>
                    <p className="employee-info">Credentials: {employee.credential}</p>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;
