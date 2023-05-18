import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList({ triggerUpdate }) {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    // This function runs whenever the component mounts or triggerUpdate changes.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/employees');
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees', err);
            }
        };

        fetchData();
    }, [triggerUpdate]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees?days=${search}`);
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Enter days"
            />
            <button onClick={handleSearch}>Search</button>

            {employees.map(employee => (
                <div key={employee._id}>
                    <h3>name:{employee.name}</h3>
                    <p>number:{employee.phoneNumber}</p>
                    <p>credentials:{employee.credential}</p>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;
