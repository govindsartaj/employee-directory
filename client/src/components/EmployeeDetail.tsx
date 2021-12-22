import { EmployeeDetailProps } from '../types/EmployeeDetailProps';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const EmployeeDetail = ({ setSelected, employees }: EmployeeDetailProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<User>();

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // check if id in employees data, else fetch from api
    setSelected(Number(id));
    const getSelectedEmployee = async () => {
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
          `http://localhost:8080/user/${Number(id)}`
        );
        setSelectedEmployee(await employeeResponse.json());
      }
    };
    getSelectedEmployee();
  }, [id, employees, setSelected]);

  return (
    <div className="w-8/12 2xl:w-9/12">
      <div className="sticky top-0 m-2 flex justify-center align-middle">
        <Paper elevation={1} className="p-6 h-screen w-full">
          <div>
            {id && selectedEmployee ? (
              <div>
                <div className="flex align-middle justify-center">
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
                <div className="flex align-middle justify-center m-1">
                  <img
                    src="https://www.svgrepo.com/show/133442/location.svg"
                    className="h-6 w-6 mx-1"
                    alt="location icon"
                  />
                  {`${selectedEmployee?.location?.city}, ${selectedEmployee?.location?.country}`}
                </div>
                <div className="flex align-middle justify-center m-1">
                  <img
                    src="https://www.svgrepo.com/show/14478/email.svg"
                    className="h-6 w-6 mx-1"
                    alt="email icon"
                  />
                  <a
                    className="underline"
                    href={`mailto:${selectedEmployee?.email}`}
                  >
                    {selectedEmployee?.email}
                  </a>
                </div>
                <div className="flex align-middle justify-center m-1">
                  <img
                    src="https://www.svgrepo.com/show/46197/phone.svg"
                    className="h-6 w-6 mx-1"
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
