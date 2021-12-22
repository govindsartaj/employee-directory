import EmployeeList from './EmployeeList';
import { useEffect, useState } from 'react';
import { User } from '../types/User';

const EmployeeListContainer = () => {
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selected, setSelected] = useState()

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch('http://localhost:8080/users');
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON);
    };

    getEmployees();
  }, []);

  return (
    <div className="">
      Hey
      <div className="flex flex-row align-middle justify-center">
        <EmployeeList employees={employees} selected={selected} setSelected={setSelected}/>
        <div>{JSON.stringify(employees.find((employee) => employee.id === selected))}</div>
      </div>
    </div>
  );
};

export default EmployeeListContainer;
