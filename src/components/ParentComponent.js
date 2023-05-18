import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

function ParentComponent() {
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const location = useLocation();

    const handleAddEmployee = () => {
        setTriggerUpdate(!triggerUpdate);
    };

    const renderComponent = () => {
        switch (location.pathname) {
            case '/employees/new':
                return <EmployeeForm handleAddEmployee={handleAddEmployee} />;
            case '/employee-list':
                return <EmployeeList triggerUpdate={triggerUpdate} />;
            default:
                return null;
        }
    };

    return renderComponent();
}

export default ParentComponent;
