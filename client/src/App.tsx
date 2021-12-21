import React, { useEffect, useState } from 'react';
import './App.css';
import EmployeeListContainer from './components/EmployeeListContainer';
import { User } from './types/User';

function App() {
  const [employees, setEmployees] = useState<Array<User>>();

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch('http://localhost:8080/users');
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON);
    };

    getEmployees();
  }, []);

  return (
    <div className="App">
      <EmployeeListContainer employees={employees} />
    </div>
  );
}

export default App;
