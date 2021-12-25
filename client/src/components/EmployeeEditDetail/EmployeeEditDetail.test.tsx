import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeEditDetail from './EmployeeEditDetail';
import Router, { BrowserRouter } from 'react-router-dom';
import { User } from '../../types/User';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

let useParamsSpy = jest.spyOn(Router, 'useParams');

const fakeEmployeesData: Array<User> = [
  {
    id: 1,
    name: { first: 'Jim', last: 'John' },
    job: { title: 'Software Developer', department: 'Tech' },
    location: { city: 'Paris', country: 'France' },
    email: 'jimjohn@example.com',
    phone: '823847328',
    picture: {
      thumbnail: 'somepicture.png',
      medium: 'somepicture.png',
      large: 'somepicture.png',
    },
  },
  {
    id: 2,
    name: { first: 'Firsty', last: 'Lasty' },
    job: { title: 'Product Manager', department: 'Tech' },
    location: { city: 'London', country: 'England' },
    email: 'firstylasty@example.com',
    phone: '82235668',
    picture: {
      thumbnail: 'somepicture.png',
      medium: 'somepicture.png',
      large: 'somepicture.png',
    },
  },
];


test('renders prefilled edit employee form fields for valid id', () => {
  useParamsSpy.mockReturnValue({ id: '1' });

  render(
    <BrowserRouter>
      <EmployeeEditDetail
        employees={fakeEmployeesData}
        saveEmployee={() => console.log('mock save function')}
        setSelected={() => console.log('mock save function')}
      />
    </BrowserRouter>
  );
  const firstNameField = screen.getByTestId('edit-user-first-name-input');
  const lastNameField = screen.getByTestId('edit-user-last-name-input');
  const jobTitleField = screen.getByTestId('edit-user-job-title-input');
  const departmentField = screen.getByTestId('edit-user-department-input');
  const cityField = screen.getByTestId('edit-user-city-input');
  const countryField = screen.getByTestId('edit-user-country-input');
  const emailField = screen.getByTestId('edit-user-email-input');
  const phoneField = screen.getByTestId('edit-user-phone-input');
  expect(firstNameField).toBeInTheDocument();
  expect(firstNameField).not.toHaveValue('');
  expect(lastNameField).toBeInTheDocument();
  expect(lastNameField).not.toHaveValue('');
  expect(jobTitleField).toBeInTheDocument();
  expect(jobTitleField).not.toHaveValue('');
  expect(departmentField).toBeInTheDocument();
  expect(departmentField).not.toHaveValue('');
  expect(cityField).toBeInTheDocument();
  expect(cityField).not.toHaveValue('');
  expect(countryField).toBeInTheDocument();
  expect(countryField).not.toHaveValue('');
  expect(emailField).toBeInTheDocument();
  expect(emailField).not.toHaveValue('');
  expect(phoneField).toBeInTheDocument();
  expect(phoneField).not.toHaveValue('');
  useParamsSpy.mockClear();
});

test('renders save changes button on field change', () => {
  useParamsSpy.mockReturnValue({ id: '1' });

  render(
    <BrowserRouter>
      <EmployeeEditDetail
        employees={fakeEmployeesData}
        saveEmployee={() => console.log('mock save function')}
        setSelected={() => console.log('mock save function')}
      />
    </BrowserRouter>
  );

  // simulate input change event
  const firstNameField = screen.getByTestId('edit-user-first-name-input');
  fireEvent.change(firstNameField, { target: { value: 'whatever' } });

  // check that save button is rendered
  const submitButton = screen.getByTestId('edit-user-submit-button');
  expect(submitButton).toBeInTheDocument();
  useParamsSpy.mockClear();
});

export {};
