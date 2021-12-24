import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeDetailContent from './EmployeeDetailContent';
import { BrowserRouter } from 'react-router-dom';

const fakeEmployeeData = {
  id: 3,
  name: { first: 'Firstname', last: 'Lastname' },
  job: { title: 'Scrum Master', department: 'Tech' },
  location: { city: 'Lisbon', country: 'Portugal' },
  email: 'firstnamelastname@example.com',
  phone: '83243244',
  picture: {
    thumbnail: 'somepicture.png',
    medium: 'somepicture.png',
    large: 'somepicture.png',
  },
};

test('renders all employee data fields', () => {
  render(
    <BrowserRouter>
      <EmployeeDetailContent
        selectedEmployee={fakeEmployeeData}
        id={fakeEmployeeData.id}
        deleteEmployee={() => console.log('fake function')}
      />
    </BrowserRouter>
  );
  const avatar = screen.getByTestId('employee-detail-content-avatar');
  const name = screen.getByTestId('employee-detail-content-name');
  const jobTitle = screen.getByTestId('employee-detail-content-job-title');
  const department = screen.getByTestId('employee-detail-content-department');
  const location = screen.getByTestId('employee-detail-content-location');
  const email = screen.getByTestId('employee-detail-content-email');
  const phone = screen.getByTestId('employee-detail-content-phone');

  expect(avatar).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(jobTitle).toBeInTheDocument();
  expect(department).toBeInTheDocument();
  expect(location).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
});
