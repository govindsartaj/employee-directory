import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeListContainer from './EmployeeListContainer';
import { User } from '../../types/User';
import { act } from 'react-dom/test-utils';

const unmockedFetch = global.fetch;

afterAll(() => {
  global.fetch = unmockedFetch;
});

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

test('renders employees from server', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          users: fakeEmployeesData,
          pageCount: 1,
          total: fakeEmployeesData.length,
          filterValues: {},
        }),
    })
  ) as jest.Mock;

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<EmployeeListContainer />);
  });

  const employee1 = screen.getByText(/jim john/i);
  const employee2 = screen.getByText(/firsty lasty/i);

  expect(employee1).toBeInTheDocument();
  expect(employee2).toBeInTheDocument();
});

test('renders detail view when employee in list is clicked', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          users: fakeEmployeesData,
          pageCount: 1,
          total: fakeEmployeesData.length,
          filterValues: {},
        }),
    })
  ) as jest.Mock;

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<EmployeeListContainer />);
  });

  // click on employee in list
  const employeeInList = screen.getByText(/jim john/i);

  fireEvent.click(employeeInList);
  const employeeInListAndDetail = screen.getAllByText(/jim john/i);

  // the employee's name should appear twice; once in list and once in detail
  expect(employeeInListAndDetail.length).toEqual(2);
});

export {};
