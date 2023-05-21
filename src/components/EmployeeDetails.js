import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [assignedDays, setAssignedDays] = useState([]);
    const [assignedShifts, setAssignedShifts] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedShift, setSelectedShift] = useState('');

    useEffect(() => {
        fetchEmployeeDetails();
        fetchAssignedDays();
        fetchAssignedShifts();
    }, [id]);

    const fetchAssignedDays = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees/${id}/days`);
            setAssignedDays(response.data);
        } catch (error) {
            console.error('Error fetching assigned days:', error);
        }
    };

    const fetchAssignedShifts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees/${id}/shifts`);
            setAssignedShifts(response.data);
        } catch (error) {
            console.error('Error fetching assigned shifts:', error);
        }
    };

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleShiftChange = (e) => {
        setSelectedShift(e.target.value);
    };

    const addAssignedDay = async () => {
        try {
            await axios.post(`http://localhost:3001/employees/${id}/days`, {
                day: selectedDay,
            });
            fetchAssignedDays();
            setSelectedDay('');
        } catch (error) {
            console.error('Error adding assigned day:', error);
        }
    };

    const addAssignedShift = async () => {
        try {
            await axios.post(`http://localhost:3001/employees/${id}/shifts`, {
                shift: selectedShift,
            });
            fetchAssignedShifts();
            setSelectedShift('');
        } catch (error) {
            console.error('Error adding assigned shift:', error);
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Employee Details</h2>
            <p>Name: {employee.name}</p>
            <p>Phone Number: {employee.phoneNumber}</p>
            <p>Credential: {employee.credential}</p>
            {/* Display other employee details as needed */}
            <h3>Assigned Days</h3>
            <ul>
                {assignedDays.map((day) => (
                    <li key={day._id}>{day.day}</li>
                ))}
            </ul>
            <div>
                <select value={selectedDay} onChange={handleDayChange}>
                    <option value="">Select a day</option>
                    {/* Render options for days */}
                </select>
                <button onClick={addAssignedDay}>Add Day</button>
            </div>

            <h3>Assigned Shifts</h3>
            <ul>
                {assignedShifts.map((shift) => (
                    <li key={shift._id}>{shift.shift}</li>
                ))}
            </ul>
            <div>
                <select value={selectedShift} onChange={handleShiftChange}>
                    <option value="">Select a shift</option>
                    {/* Render options for shifts */}
                </select>
                <button onClick={addAssignedShift}>Add Shift</button>
            </div>
        </div>
    );
}

export default EmployeeDetails;
