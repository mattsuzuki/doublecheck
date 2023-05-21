import React from 'react';

function FilteredEmployeesPage({ location }) {
    const { filteredEmployees } = location.state;

    return (
        <div>
            <h2>Filtered Employees</h2>
            <h3>Scheduled to Work</h3>
            <ul>
                {filteredEmployees.scheduled.map((employee) => (
                    <li key={employee._id}>{employee.name}</li>
                ))}
            </ul>
            <h3>Not Scheduled to Work</h3>
            <ul>
                {filteredEmployees.notScheduled.map((employee) => (
                    <li key={employee._id}>{employee.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FilteredEmployeesPage;
