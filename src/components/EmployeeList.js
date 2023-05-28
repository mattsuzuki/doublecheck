import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList({ triggerUpdate }) {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCredential, setFilterCredential] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, [triggerUpdate]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/employees');
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees?days=${search}&credential=${filterCredential}`);
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
        }
    };

    const handleFilterChange = (e) => {
        setFilterCredential(e.target.value);
    };

    const handleNote = async (id) => {
        // TODO: Implement note functionality
        console.log('Note clicked for employee:', id);
    };

    const handleTakeOffShift = async (id) => {
        // TODO: Implement take off shift functionality
        console.log('Take off shift clicked for employee:', id);
    };

    const filteredEmployees = filterCredential
        ? employees.filter((employee) => employee.credential === filterCredential)
        : employees;

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
                <select value={filterCredential} onChange={handleFilterChange} className="filter-select">
                    <option value="">All Credentials</option>
                    <option value="RN">RN</option>
                    <option value="LVN/PT">LVN/PT</option>
                    <option value="BHS">BHS</option>
                </select>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {filteredEmployees.map((employee) => (
                <div key={employee._id} className="employee-card">
                    <h3 className="employee-name">Name: {employee.name}</h3>
                    <p className="employee-info">Number: {employee.phoneNumber}</p>
                    <p className="employee-info">Credentials: {employee.credential}</p>
                    <div className="employee-buttons">
                        <Link to={`/employees/${employee._id}`} className="employee-button">
                            View
                        </Link>
                        <button className="employee-button" onClick={() => handleNote(employee._id)}>
                            Make Note
                        </button>
                        <button className="employee-button" onClick={() => handleTakeOffShift(employee._id)}>
                            Take Off Shift
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;