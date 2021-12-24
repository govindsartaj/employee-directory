import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeDetailProps } from '../types/EmployeeDetailProps';
import { User } from '../types/User';
import EmployeeDetailContent from './EmployeeDetailContent';

const EmployeeDetail = ({
  setSelected,
  employees,
  deleteEmployee,
}: EmployeeDetailProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<User>();

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // check if id in employees data, else fetch from api
    setSelected(Number(id));
    const getSelectedEmployee = async () => {
      try {
        if (!id) {
          navigate('/', { replace: true });
          return;
        }
        const selectedEmployeeInCache = employees.find(
          (employee) => employee.id === Number(id)
        );
        if (selectedEmployeeInCache) {
          setSelectedEmployee(selectedEmployeeInCache);
        } else {
          const employeeResponse = await fetch(
            `http://localhost:8000/user/${Number(id)}`
          );
          setSelectedEmployee(await employeeResponse.json());
        }
      } catch (e) {
        console.error(e);
        navigate('/');
      }
    };
    getSelectedEmployee();
  }, [id]);

  return (
    <div className="w-8/12 2xl:w-9/12">
      <div className="sticky top-0 flex justify-center p-2 align-middle">
        <Paper elevation={1} className="w-full h-screen p-6">
          <div>
            {id && selectedEmployee ? (
              <EmployeeDetailContent
                selectedEmployee={selectedEmployee}
                deleteEmployee={deleteEmployee}
                id={Number(id)}
              />
            ) : (
              <div className="text-center">
                Select an employee to view more information
              </div>
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default EmployeeDetail;
