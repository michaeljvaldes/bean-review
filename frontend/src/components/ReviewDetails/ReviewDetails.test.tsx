import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewDetails from './ReviewDetails';

describe('<ReviewDetails />', () => {
  test('it should mount', () => {
    render(<ReviewDetails />);
    
    const reviewDetails = screen.getByTestId('ReviewDetails');

    expect(reviewDetails).toBeInTheDocument();
  });
});