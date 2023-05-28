import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedShift, setSelectedShift] = useState('');

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    const assignShift = async () => {
        try {
            await Promise.all(selectedDays.map(day => {
                return axios.post(`http://localhost:3001/employees/${id}/shifts`, {
                    shift: selectedShift,
                    date: new Date(new Date().getFullYear(), selectedMonth, day),
                });
            }));
            // refresh the employee details or do some other update
        } catch (error) {
            console.error('Error assigning shift:', error);
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

            <h3>Assign Shifts</h3>
            <div>
                <select value={selectedMonth} onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedDays([]);
                }}>
                    {/* Replace this with actual month options */}
                    <option value="0">January</option>
                    <option value="1">February</option>
                    {/* Render rest of the months */}
                </select>
            </div>

            <div>
                {[...Array(new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate()).keys()].map(day => (
                    <div key={day}>
                        <input type="checkbox" id={`day-${day + 1}`} value={day + 1} checked={selectedDays.includes(day + 1)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedDays([...selectedDays, day + 1]);
                                } else {
                                    setSelectedDays(selectedDays.filter(d => d !== day + 1));
                                }
                            }}
                        />
                        <label htmlFor={`day-${day + 1}`}>{day + 1}</label>
                    </div>
                ))}
            </div>

            <div>
                <input type="radio" id="AM" name="shift" value="AM" checked={selectedShift === 'AM'}
                    onChange={(e) => setSelectedShift(e.target.value)}
                />
                <label htmlFor="AM">AM</label>

                <input type="radio" id="PM" name="shift" value="PM" checked={selectedShift === 'PM'}
                    onChange={(e) => setSelectedShift(e.target.value)}
                />
                <label htmlFor="PM">PM</label>

                <input type="radio" id="NOC" name="shift" value="NOC" checked={selectedShift === 'NOC'}
                    onChange={(e) => setSelectedShift(e.target.value)}
                />
                <label htmlFor="NOC">NOC</label>
            </div>

            <button onClick={assignShift}>Assign Shift</button>
        </div>
    );
}

export default EmployeeDetails;
