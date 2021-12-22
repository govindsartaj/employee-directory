import EmployeeList from './EmployeeList';
import {useEffect, useState} from 'react';
import { User } from '../types/User';

const EmployeeListContainer = () => {

  const [employees, setEmployees] = useState<Array<User>>([]);

  useEffect(() => {
    const getEmployees = async () => {
      const employeesResponse = await fetch('http://localhost:8080/users');
      const employeesJSON = await employeesResponse.json();
      setEmployees(employeesJSON);
    };

    getEmployees();
  }, []);

  return (
    <div className='flex align-middle justify-center'>
      <EmployeeList employees={employees} />
    </div>
  );
};

export default EmployeeListContainer;
