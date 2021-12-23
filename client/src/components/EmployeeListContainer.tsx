import EmployeeList from './EmployeeList';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import EmployeeDetail from './EmployeeDetail';
import TextField from '@mui/material/TextField';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from 'react-router-dom';
import EmployeeDetailEdit from './EmployeeEditDetail';
import { Button } from '@mui/material';
import EmployeeAddDetail from './EmployeeAddDetail';

const EmployeeListContainer = () => {
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selected, setSelected] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const getEmployeesWithPre = async (id: number) => {
    const employeesResponse = await fetch(
      `http://localhost:8000/user?pre=${id}`
    );
    const employeesJSON = await employeesResponse.json();
    setEmployees(employeesJSON.users);
  };

  const deleteEmployee = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/user/${id}`, {
        method: 'DELETE',
      });
      const resJSON = await res.json();
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (e) {
      console.error('delete employee failed');
    }
  };

  const saveEmployee = async (
    details: SaveEmployeeDetails,
    id: number = -1,
    options = { new: false }
  ) => {
    console.log(id, details);
    try {
      const res = await fetch(
        `http://localhost:8000/user${options.new ? '' : `/${id}`}`,
        {
          method: options.new ? 'POST' : 'PUT',
          body: JSON.stringify(details),
          headers: {
            'Content-type': 'application/json; charset=UTF-8', // Indicates the content
          },
        }
      );
      const updatedEmployee: User = await res.json();
      setEmployees(
        options.new
          ? [...employees, updatedEmployee]
          : employees.map((employee) => {
              if (employee.id === updatedEmployee.id) {
                return updatedEmployee;
              } else {
                return employee;
              }
            })
      );
      return updatedEmployee;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch(
        `http://localhost:8000/user?p=${currentPage}`
      );
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON.users);
      setTotalPages(employeesJSON.pageCount);
      setTotalResults(employeesJSON.total);
    };
    if (
      selected &&
      employees.length > 0 &&
      !employees.find((employee) => employee.id === selected)
    ) {
      console.log(currentPage);
      getEmployeesWithPre(selected);
    } else {
      getEmployees();
    }
  }, [currentPage, selected]);

  return (
    <Router>
      <div className="m-4">
        <div className="flex justify-between h-8">
          <TextField
            hiddenLabel
            placeholder="Search by name or title"
            size="small"
            className="w-4/12 2xl:w-3/12"
          />
          <div className="mx-2 mt-1">
            <Button variant="outlined">
              <Link to={'/new'}>New employee</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-center align-middle">
          <EmployeeList
            employees={employees}
            selected={selected}
            setSelected={setSelected}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalResults={totalResults}
          />
          <Routes>
            <Route
              path="/:id/edit"
              element={
                <EmployeeDetailEdit
                  employees={employees}
                  setSelected={setSelected}
                  saveEmployee={saveEmployee}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <EmployeeDetail
                  setSelected={setSelected}
                  employees={employees}
                  deleteEmployee={deleteEmployee}
                />
              }
            />
            <Route path="/new" element={<EmployeeAddDetail saveEmployee={saveEmployee} />} />
            <Route
              index
              element={
                <EmployeeDetail
                  setSelected={setSelected}
                  employees={employees}
                  deleteEmployee={deleteEmployee}
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
