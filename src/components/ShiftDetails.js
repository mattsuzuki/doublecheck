import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './EmployeeList';

const ShiftDetails = ({ id }) => {
    const [shift, setShift] = useState(null);
    const [employees, setEmployees] = useState([]);

    // Fetch shift data when component mounts
    useEffect(() => {
        const fetchShift = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/shifts/${id}`);
                setShift(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchShift();
    }, [id]);

    // Fetch all employees when component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('http://localhost:3001/employees');
                setEmployees(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEmployees();
    }, []);

    // Function to assign an employee to a shift
    const assignEmployee = async (employeeId) => {
        try {
            const res = await axios.put(`http://localhost:3001/shifts/${id}`, {
                assignedEmployees: [...shift.assignedEmployees, employeeId],
            });

            setShift(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!shift || !employees) return <div>Loading...</div>;

    return (
        <div>
            <h2>Shift Details</h2>
            <p>Shift Name: {shift.shiftName}</p>
            <p>Start Time: {shift.startTime}</p>
            <p>End Time: {shift.endTime}</p>

            <h3>Assigned Employees</h3>
            <ul>
                {shift.assignedEmployees.map((employeeId) => {
                    const employee = employees.find((e) => e._id === employeeId);
                    return <li key={employeeId}>{employee ? employee.name : 'Loading...'}</li>;
                })}
            </ul>

            <h3>Assign Employee to Shift</h3>
            <EmployeeList onSelect={assignEmployee} />
        </div>
    );
};

export default ShiftDetails;
