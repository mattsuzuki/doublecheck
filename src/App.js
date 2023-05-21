import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import ParentComponent from './components/ParentComponent';
import EmployeeDetails from './components/EmployeeDetails';
import ShiftForm from './components/ShiftForm';
import ShiftDetails from './components/ShiftDetails';
import EmployeeListPage from './components/EmployeeListPage';
import FilteredEmployeesPage from './components/FilteredEmployeesPage'; // Import the FilteredEmployeesPage component
import ShiftListPage from './components/ShiftListPage'; // Import the ShiftListPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees/new" element={<ParentComponent />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} /> {/* Add route for EmployeeDetails */}
        <Route path="/employee-list" element={<EmployeeListPage />} />
        <Route path="/filtered-employees" element={<FilteredEmployeesPage />} />
        <Route path="/shifts/new" element={<ShiftForm />} />
        <Route path="/shifts/:id" element={<ShiftDetails />} />
        <Route path="/shift-list" element={<ShiftListPage />} /> {/* Add route for ShiftListPage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
