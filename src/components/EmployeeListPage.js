import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3001/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            {employees.map((employee) => (
                <Link key={employee._id} to={`/employees/${employee._id}`}>
                    <div className="employee-card">
                        <h3>Name: {employee.name}</h3>
                        <p>Phone Number: {employee.phoneNumber}</p>
                        <p>Credential: {employee.credential}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default EmployeeListPage;
