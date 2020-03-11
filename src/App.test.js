import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Dweet header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/dweet/i);
expect(headerElement).toBeInTheDocument();
});
