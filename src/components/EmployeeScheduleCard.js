import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const EmployeeScheduleCard = ({ employee }) => {
    const [schedules, setSchedules] = useState(employee.schedules || {});

    useEffect(() => {
        setSchedules(employee.schedules);
    }, [employee]);

    const handleScheduleChange = async (day, shift, isChecked) => {
        const updatedSchedules = {
            ...schedules,
            [day]: {
                ...schedules[day],
                [shift]: isChecked
            }
        };

        setSchedules(updatedSchedules);

        try {
            await axios.put(`http://localhost:3001/employees/${employee._id}/schedules`, updatedSchedules);
        } catch (err) {
            console.error('Error updating schedule', err);
        }
    };

    return (
        <div className="employee-card">
            <h3 className="employee-name">Name: {employee.name}</h3>
            <p className="employee-info">Number: {employee.phoneNumber}</p>
            <p className="employee-info">Credentials: {employee.credential}</p>
            {Array.from({ length: 31 }).map((_, day) => (
                <div key={day}>
                    <h4>Day {day + 1}</h4>
                    <div>
                        <Checkbox
                            checked={schedules[day]?.AM || false}
                            onChange={(e) => handleScheduleChange(day, 'AM', e.target.checked)}
                        /> AM
                        <Checkbox
                            checked={schedules[day]?.PM || false}
                            onChange={(e) => handleScheduleChange(day, 'PM', e.target.checked)}
                        /> PM
                        <Checkbox
                            checked={schedules[day]?.NOC || false}
                            onChange={(e) => handleScheduleChange(day, 'NOC', e.target.checked)}
                        /> NOC
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeScheduleCard;
