import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './types/User';

function App() {
  const [employees, setEmployees] = useState<Array<User>>();

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch('http://localhost:8080/users');
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON.results);
    };

    getEmployees();
  }, []);

  return (
    <div className="App">
      <div>
        {employees
          ? employees.map((a: User) => (
              <div>{`${a.name.first} ${a.name.last}`}</div>
            ))
          : 'loading'}
      </div>
    </div>
  );
}

export default App;
