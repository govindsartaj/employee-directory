import { EmployeeDetailProps } from '../types/EmployeeDetailProps';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EmployeeDetailMenu from './EmployeeDetailMenu';

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
      <div className="sticky top-0 flex justify-center m-2 align-middle">
        <Paper elevation={1} className="w-full h-screen p-6">
          <div>
            {id && selectedEmployee ? (
              <div>
                <EmployeeDetailMenu
                  deleteEmployee={deleteEmployee}
                  id={Number(id)}
                />
                <div className="flex justify-center align-middle">
                  <Avatar
                    alt={`Avatar for ${selectedEmployee?.name?.first} ${selectedEmployee?.name?.last}`}
                    src={selectedEmployee?.picture?.large}
                    sx={{ height: '10rem', width: '10rem' }}
                  />
                </div>
                <div className="pt-4 text-2xl font-bold text-center">{`${selectedEmployee?.name?.first} ${selectedEmployee?.name?.last}`}</div>
                <div className="p-0 text-xl font-medium text-center">{`${selectedEmployee?.job?.title}`}</div>
                <div className="p-0 text-xl font-light text-center">
                  Department:{' '}
                  <span className="font-medium">
                    {selectedEmployee?.job?.department}
                  </span>
                </div>
                <div className="flex justify-center m-1 align-middle">
                  <img
                    src="https://www.svgrepo.com/show/133442/location.svg"
                    className="w-6 h-6 mx-1"
                    alt="location icon"
                  />
                  {`${selectedEmployee?.location?.city}, ${selectedEmployee?.location?.country}`}
                </div>
                <div className="flex justify-center m-1 align-middle">
                  <img
                    src="https://www.svgrepo.com/show/14478/email.svg"
                    className="w-6 h-6 mx-1"
                    alt="email icon"
                  />
                  <a
                    className="underline"
                    href={`mailto:${selectedEmployee?.email}`}
                  >
                    {selectedEmployee?.email}
                  </a>
                </div>
                <div className="flex justify-center m-1 align-middle">
                  <img
                    src="https://www.svgrepo.com/show/46197/phone.svg"
                    className="w-6 h-6 mx-1"
                    alt="phone icon"
                  />
                  <a
                    className="underline"
                    href={`tel:${selectedEmployee?.phone}`}
                  >
                    {selectedEmployee?.phone}
                  </a>
                </div>
              </div>
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
