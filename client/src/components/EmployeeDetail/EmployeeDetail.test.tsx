import { render, screen } from '@testing-library/react';
import React from 'react';
import Router, { BrowserRouter } from 'react-router-dom';
import { User } from '../../types/User';
import EmployeeDetail from './EmployeeDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
let useParamsSpy = jest.spyOn(Router, 'useParams');

// const fakeEmployeesData: Array<User> = [
//   { id: 1, name: { first: 'jim', last: 'john' }, job },
// ];

test('renders message and shows no employee data when no id present in path', () => {
  useParamsSpy.mockReturnValue({ id: undefined });
  render(
    <BrowserRouter>
      <EmployeeDetail
        employees={[]}
        setSelected={() => console.log('fake function')}
        deleteEmployee={() => console.log('fake function')}
      />
    </BrowserRouter>
  );
  const noEmployeeSelected = screen.getByText(
    'Select an employee to view more information'
  );
  expect(noEmployeeSelected).toBeInTheDocument();
  useParamsSpy.mockClear();
});

test('renders employee data when valid id present in path', () => {
  useParamsSpy.mockReturnValue({ id: '1' });

  render(
    <BrowserRouter>
      <EmployeeDetail
        employees={[]}
        setSelected={() => console.log('fake function')}
        deleteEmployee={() => console.log('fake function')}
      />
    </BrowserRouter>
  );
  const noEmployeeSelected = screen.getByText(
    'Select an employee to view more information'
  );
  expect(noEmployeeSelected).toBeInTheDocument();
  useParamsSpy.mockClear();
});

export {};
