import {
  Box, Button, Paper, TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeDetailEditProps } from '../types/EmployeeDetailEditProps';
import { User } from '../types/User';

const EmployeeDetailEdit = ({
  employees,
  setSelected,
  saveEmployee,
}: EmployeeDetailEditProps) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState<User>();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modified, setModified] = useState(false);

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
          const employee = await employeeResponse.json();
          setSelectedEmployee(employee);
        }
      } catch (e) {
        console.error(e);
        navigate('/');
      }
    };
    getSelectedEmployee();
  }, [id]);

  useEffect(() => {
    if (selectedEmployee) {
      setFirst(selectedEmployee?.name.first);
      setLast(selectedEmployee?.name.last);
      setJobTitle(selectedEmployee?.job.title);
      setDepartment(selectedEmployee?.job.department);
      setCity(selectedEmployee?.location.city);
      setCountry(selectedEmployee?.location.country);
      setEmail(selectedEmployee?.email);
      setPhone(selectedEmployee?.phone);
    }
  }, [selectedEmployee]);

  const handleSaveButtonClick = async () => {
    // only save fields which have been changed
    const toSave = {
      ...(first !== selectedEmployee?.name.first && { first }),
      ...(last !== selectedEmployee?.name.last && { last }),
      ...(jobTitle !== selectedEmployee?.job.title && { jobTitle }),
      ...(department !== selectedEmployee?.job.department && { department }),
      ...(city !== selectedEmployee?.location.city && { city }),
      ...(country !== selectedEmployee?.location.country && { country }),
      ...(email !== selectedEmployee?.email && { email }),
      ...(phone !== selectedEmployee?.phone && { phone }),
    };

    if (Object.keys(toSave).length !== 0) {
      const saved = await saveEmployee(toSave, id);
      if (saved) navigate(`/${id}`);
    }
  };

  return (
    <div className="w-8/12 2xl:w-9/12">
      <div className="sticky top-0 flex justify-center m-2 align-middle">
        <Paper elevation={1} className="w-full h-screen p-6">
          <div className="m-4 text-2xl">Edit information</div>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="First name"
                placeholder="First"
                value={first}
                onChange={(e) => {
                  setFirst(e.target.value);
                  setModified(true);
                }}
              />
            </div>
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="Last name"
                placeholder="Last"
                value={last}
                onChange={(e) => {
                  setLast(e.target.value);
                  setModified(true);
                }}
              />
            </div>
          </Box>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-full m-2">
              <TextField
                fullWidth
                label="Job Title"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                  setModified(true);
                }}
              />
            </div>
          </Box>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-full m-2">
              <TextField
                fullWidth
                label="Department"
                placeholder="Department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setModified(true);
                }}
              />
            </div>
          </Box>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="City"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setModified(true);
                }}
              />
            </div>
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="Country"
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setModified(true);
                }}
              />
            </div>
          </Box>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setModified(true);
                }}
              />
            </div>
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setModified(true);
                }}
              />
            </div>
          </Box>
          {modified && (
            <div className="flex justify-center m-4">
              <Button variant="outlined" onClick={handleSaveButtonClick}>
                Save changes
              </Button>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default EmployeeDetailEdit;
