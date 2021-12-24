import { Box, Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeAddDetail = ({ saveEmployee }: { saveEmployee: Function }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const onAddEmployeeButtonClick = async () => {
    const saved = await saveEmployee(
      {
        first,
        last,
        jobTitle,
        department,
        city,
        country,
        email,
        phone,
      },
      undefined,
      { new: true }
    );
    if (saved) {
      navigate(`/${saved.id}`);
    }
  };

  return (
    <div className="w-8/12 2xl:w-9/12">
      <div className="sticky top-0 flex justify-center m-2 align-middle">
        <Paper elevation={1} className="w-full h-screen p-6">
          <div className="m-4 text-2xl">New Employee</div>
          <Box component="form" noValidate autoComplete="off" className="flex">
            <div className="w-1/2 m-2">
              <TextField
                fullWidth
                label="First name"
                placeholder="First"
                value={first}
                onChange={(e) => {
                  setFirst(e.target.value);
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
                }}
              />
            </div>
          </Box>

          <div className="flex justify-center m-4">
            <Button variant="outlined" onClick={onAddEmployeeButtonClick}>
              Add Employee
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default EmployeeAddDetail;
