import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage'; // import HomePage component
import ParentComponent from './components/ParentComponent';
import EmployeeDetails from './components/EmployeeDetails';
import ShiftForm from './components/ShiftForm';
import ShiftDetails from './components/ShiftDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees/new" element={<ParentComponent />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employee-list" element={<ParentComponent />} />

        <Route path="/shifts/new" element={<ShiftForm />} />
        <Route path="/shifts/:id" element={<ShiftDetails />} />
        {/* more routes as necessary */}
        <Route path="/" element={<HomePage />} /> {/* default route */}
      </Routes>
    </Router>
  );
}

export default App;
