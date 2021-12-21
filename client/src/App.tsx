import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState<any>();

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
      <div>
        {employees
          ? employees.results.map((a: any) => <div>{`${a.name.first} ${a.name.last }`}</div>)
          : 'loading'}
      </div>
    </div>
  );
}

export default App;
