import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeList() {
    // fetch employee list from API
    const employees = []; // placeholder

    return (
        <div style={{ margin: '1rem' }}>
            <h1>Employee List</h1>
            {employees.length > 0 ? (
                employees.map((employee) => (
                    <Link to={`/employees/${employee.id}`} key={employee.id}>
                        <div style={{ margin: '0.5rem 0' }}>
                            {employee.name} ({employee.credential})
                        </div>
                    </Link>
                ))
            ) : (
                <p>No employees found</p>
            )}
            <Link to="/employees/new">
                <button style={{ margin: '0.5rem 0' }}>Add Employee</button>
            </Link>
        </div>
    );
}

export default EmployeeList;
