import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function HomePage() {
    const [searchCredential, setSearchCredential] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState('');

    const handleSearchChange = (e) => {
        setSearchCredential(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Perform search logic based on searchCredential and selectedDate values
        // Redirect or perform any necessary actions
        if (searchCredential !== '') {
            // Redirect to employee search page passing the searchCredential and selectedDate as URL parameters
            window.location.href = `/employee-search?credential=${encodeURIComponent(searchCredential)}&date=${encodeURIComponent(selectedDate)}`;
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f5f5f5">
            <Typography variant="h2" gutterBottom>Staffing Coordinator Portal</Typography>
            <Typography variant="h5" gutterBottom>Manage your staff and their shifts efficiently</Typography>
            <Box mt={5}>
                <Button variant="contained" color="primary" component={Link} to="/employee-list" style={{ marginRight: '20px' }}>View Employees</Button>
                <Button variant="contained" color="primary" component={Link} to="/employees/new" style={{ marginRight: '20px' }}>Add Employee</Button>
                <Button variant="contained" color="primary" component={Link} to="/shift-list">View Shifts</Button>
            </Box>
            <Box mt={5}>
                <form onSubmit={handleSearchSubmit}>
                    <FormControl>
                        <Select value={searchCredential} onChange={handleSearchChange} displayEmpty style={{ marginRight: '1em' }}>
                            <MenuItem value="" disabled>
                                Search Employees by Credential
                            </MenuItem>
                            <MenuItem value="RN">RN</MenuItem>
                            <MenuItem value="LVN/PT">LVN/PT</MenuItem>
                            <MenuItem value="BHS">BHS</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="selectedDate"
                        label="Select Date"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ marginRight: '1em' }}
                    />
                    <Button type="submit" variant="contained" color="primary">Search</Button>
                </form>
            </Box>
        </Box>
    );
}

export default HomePage;
