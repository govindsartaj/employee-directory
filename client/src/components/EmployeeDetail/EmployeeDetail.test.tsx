import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Router, { BrowserRouter } from 'react-router-dom';
import { User } from '../../types/User';
import EmployeeDetail from './EmployeeDetail';

const unmockedFetch = global.fetch;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

afterAll(() => {
  global.fetch = unmockedFetch;
});

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

const fakeNonMemoryEmployeeFetchResponse = {
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
  const noEmployeeSelected = screen.getByTestId(
    'no-employee-found-or-selected-message'
  );
  expect(noEmployeeSelected).toBeInTheDocument();
  useParamsSpy.mockClear();
});

test('renders employee data when valid id present in path', () => {
  useParamsSpy.mockReturnValue({ id: '1' });
  render(
    <BrowserRouter>
      <EmployeeDetail
        employees={fakeEmployeesData}
        setSelected={() => console.log('fake function')}
        deleteEmployee={() => console.log('fake function')}
      />
    </BrowserRouter>
  );
  const employeeSelected = screen.getByText(/jim john/i);
  expect(employeeSelected).toBeInTheDocument();

  const detailsContent = screen.getByTestId('employee-detail-content');
  expect(detailsContent).toBeInTheDocument();
  useParamsSpy.mockClear();
});

test('renders employee data from api if employee id not in memory but in db', async () => {
  useParamsSpy.mockReturnValue({ id: '3' });
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeNonMemoryEmployeeFetchResponse),
    })
  ) as jest.Mock;

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(
      <BrowserRouter>
        <EmployeeDetail
          employees={fakeEmployeesData}
          setSelected={() => console.log('fake function')}
          deleteEmployee={() => console.log('fake function')}
        />
      </BrowserRouter>
    );
  });
  const employeeName = screen.getByText(/firstname lastname/i);
  expect(employeeName).toBeInTheDocument();

  const detailsContent = screen.getByTestId('employee-detail-content');
  expect(detailsContent).toBeInTheDocument();

  useParamsSpy.mockClear();
});

test('renders message and no employee info if employee id not in memory or in db', async () => {
  useParamsSpy.mockReturnValue({ id: '66' });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject(new Error('employee not found')),
    })
  ) as jest.Mock;

  render(
    <BrowserRouter>
      <EmployeeDetail
        employees={[]}
        setSelected={() => console.log('fake function')}
        deleteEmployee={() => console.log('fake function')}
      />
    </BrowserRouter>
  );
  const noEmployeeSelected = screen.getByTestId(
    'no-employee-found-or-selected-message'
  );
  expect(noEmployeeSelected).toBeInTheDocument();
  useParamsSpy.mockClear();
});

export {};
