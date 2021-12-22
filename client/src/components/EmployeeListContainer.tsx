import EmployeeList from './EmployeeList';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import EmployeeDetail from './EmployeeDetail';
import TextField from '@mui/material/TextField';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const EmployeeListContainer = () => {
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selected, setSelected] = useState();

  const getEmployeesWithPre = async (id: number) => {
    const employeesResponse = await fetch(
      `http://localhost:8080/user?pre=${id}`
    );
    const employeesJSON = await employeesResponse.json();
    setEmployees(employeesJSON.users);
  };

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch(`http://localhost:8080/user`);
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON.users);
    };
    getEmployees();
  }, []);

  if (
    selected &&
    employees.length > 0 &&
    !employees.find((employee) => employee.id === selected)
  ) {
    getEmployeesWithPre(selected);
  }

  return (
    <Router>
      <div className="m-4">
        <div className="flex h-8">
          <TextField
            hiddenLabel
            placeholder="Search by name or title"
            size="small"
            className="w-4/12 2xl:w-3/12"
          />
          Filters
        </div>
        <div className="flex flex-row align-middle justify-center">
          <EmployeeList
            employees={employees}
            selected={selected}
            setSelected={setSelected}
          />
          <Routes>
            <Route
              path="/:id"
              element={
                <EmployeeDetail
                  setSelected={setSelected}
                  employees={employees}
                />
              }
            />
            <Route
              path="/"
              element={
                <EmployeeDetail
                  setSelected={setSelected}
                  employees={employees}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default EmployeeListContainer;
