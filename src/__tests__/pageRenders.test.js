import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

afterEach(cleanup);

test('Header is rendered', () => {
  const { getByText } = render(<Header />);
  getByText(/Brocolli & Co./);
});

test('Footer is rendered', () => {
  const { getByText } = render(<Footer />);
  getByText(/All rights reserved./);
});

