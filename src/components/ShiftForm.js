import React, { useState } from 'react';
import axios from 'axios';

const ShiftForm = () => {
    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/shifts', {
                shiftName,
                startTime,
                endTime,
            });

            // Clear the form fields after successful submission
            setShiftName('');
            setStartTime('');
            setEndTime('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Shift Name:
                <input type="text" value={shiftName} onChange={(e) => setShiftName(e.target.value)} required />
            </label>

            <label>
                Start Time:
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </label>

            <label>
                End Time:
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </label>

            <button type="submit">Create Shift</button>
        </form>
    );
};

export default ShiftForm;
