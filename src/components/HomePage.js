import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function HomePage() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f5f5f5">
            <Typography variant="h2" gutterBottom>Staffing Coordinator Portal</Typography>
            <Typography variant="h5" gutterBottom>Manage your staff and their shifts efficiently</Typography>
            <Box mt={5}>
                <Button variant="contained" color="primary" component={Link} to="/employee-list" style={{ marginRight: '20px' }}>View Employees</Button>
                <Button variant="contained" color="primary" component={Link} to="/employees/new" style={{ marginRight: '20px' }}>Add Employee</Button>
                <Button variant="contained" color="primary" component={Link} to="/shift-list">View Shifts</Button>

            </Box>
        </Box>
    );
}

export default HomePage;
