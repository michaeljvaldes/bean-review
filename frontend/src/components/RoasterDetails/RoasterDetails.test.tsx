import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoasterDetails from './RoasterDetails';

describe('<RoasterDetails />', () => {
  test('it should mount', () => {
    render(<RoasterDetails />);

    const roasterDetails = screen.getByTestId('RoasterDetails');

    expect(roasterDetails).toBeInTheDocument();
  });
});