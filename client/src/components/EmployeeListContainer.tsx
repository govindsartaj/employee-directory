import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { User } from '../types/User';
import encodeFilters from '../util/encodeFilters';
import EmployeeAddDetail from './EmployeeAddDetail';
import EmployeeDetail from './EmployeeDetail';
import EmployeeDetailEdit from './EmployeeEditDetail';
import EmployeeList from './EmployeeList';
import HeaderBar from './HeaderBar';

const EmployeeListContainer = () => {
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selected, setSelected] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [availableFilters, setAvailableFilters] = useState<AvailableFilters>();
  const [appliedFilters, setAppliedFilters] = useState<AvailableFilters>({
    department: [],
    country: [],
  });
  const [appliedSorting, setAppliedSorting] = useState<string>('nameAsc');
  const [searchQuery, setSearchQuery] = useState('');

  // set to a random number to track when data is modified
  const [isModifyingEmployees, setIsModifyingEmployees] = useState(0);

  const deleteEmployee = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/user/${id}`, {
        method: 'DELETE',
      });
      const resJSON = await res.json();
      setEmployees(employees.filter((employee) => employee.id !== id));
      setIsModifyingEmployees(Math.random());
    } catch (e) {
      console.error('delete employee failed');
    }
  };

  const saveEmployee = async (
    details: SaveEmployeeDetails,
    id: number = -1,
    options = { new: false }
  ) => {
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
      setIsModifyingEmployees(Math.random());
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
      setAvailableFilters(employeesJSON.filterValues);
    };

    if (
      appliedFilters &&
      appliedFilters.country.length === 0 &&
      appliedFilters.department.length === 0 &&
      searchQuery.length === 0
    ) {
      getEmployees();
    }
  }, [currentPage, isModifyingEmployees, appliedFilters, searchQuery]);

  // fetch data when filters change
  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch(
        `http://localhost:8000/user?p=${currentPage}&search=${searchQuery}&sort=${appliedSorting}&${encodeFilters(
          appliedFilters
        )}`
      );
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON.users);
      setTotalPages(employeesJSON.pageCount);
      setTotalResults(employeesJSON.total);
    };

    getEmployees();
  }, [
    appliedFilters,
    appliedSorting,
    currentPage,
    isModifyingEmployees,
    searchQuery,
  ]);

  return (
    <Router>
      <div className="m-4">
        <HeaderBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex flex-row justify-center align-middle">
          <EmployeeList
            employees={employees}
            selected={selected}
            setSelected={setSelected}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalResults={totalResults}
            availableFilters={availableFilters}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            appliedSorting={appliedSorting}
            setAppliedSorting={setAppliedSorting}
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
            <Route
              path="/new"
              element={<EmployeeAddDetail saveEmployee={saveEmployee} />}
            />
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
