import { EmployeeDetailProps } from '../types/EmployeeDetailProps';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../types/User';

const EmployeeDetail = ({ setSelected, employees }: EmployeeDetailProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<User | string>();

  let { id } = useParams();

  useEffect(() => {
    // check if id in employees data, else fetch from api
    setSelected(Number(id));
    const getSelectedEmployee = async () => {
      console.log(employees);
      const selectedEmployeeInCache = employees.find(
        (employee) => employee.id === Number(id)
      );
      if (selectedEmployeeInCache) {
        setSelectedEmployee(selectedEmployeeInCache);
      } else {
        const employeeResponse = await fetch(
          `http://localhost:8080/user/${Number(id)}`
        );
        setSelectedEmployee(await employeeResponse.json());
      }
    };
    getSelectedEmployee();
  }, [id, employees, setSelected]);

  return (
    <div className="w-9/12">
      <div className="sticky top-7 m-2">{JSON.stringify(selectedEmployee)}</div>
    </div>
  );
};

export default EmployeeDetail;
