import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeAddDetail from './EmployeeAddDetail';
import { BrowserRouter } from 'react-router-dom';

test('renders add employee form fields', () => {
  render(
    <BrowserRouter>
      <EmployeeAddDetail
        saveEmployee={() => console.log('mock save function')}
      />
    </BrowserRouter>
  );
  const firstNameField = screen.getByTestId('add-user-first-name-input');
  const lastNameField = screen.getByTestId('add-user-last-name-input');
  const jobTitleField = screen.getByTestId('add-user-job-title-input');
  const departmentField = screen.getByTestId('add-user-department-input');
  const cityField = screen.getByTestId('add-user-city-input');
  const countryField = screen.getByTestId('add-user-country-input');
  const emailField = screen.getByTestId('add-user-email-input');
  const phoneField = screen.getByTestId('add-user-phone-input');
  const submitButton = screen.getByTestId('add-user-submit-button');
  expect(firstNameField).toBeInTheDocument();
  expect(lastNameField).toBeInTheDocument();
  expect(jobTitleField).toBeInTheDocument();
  expect(departmentField).toBeInTheDocument();
  expect(cityField).toBeInTheDocument();
  expect(countryField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(phoneField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

export {};
