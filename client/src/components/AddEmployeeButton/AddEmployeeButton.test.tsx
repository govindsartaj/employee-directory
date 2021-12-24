import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddEmployeeButton from './AddEmployeeButton';

test('renders new employee link', () => {
  render(
    <BrowserRouter>
      <AddEmployeeButton />
    </BrowserRouter>
  );
  const linkElement = screen.getByTestId('new-employee-link');
  expect(linkElement).toBeInTheDocument();
});

export {};
