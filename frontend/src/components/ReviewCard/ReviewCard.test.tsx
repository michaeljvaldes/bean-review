import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewCard from './ReviewCard';

describe('<ReviewCard />', () => {
  test('it should mount', () => {
    render(<ReviewCard />);
    
    const reviewCard = screen.getByTestId('ReviewCard');

    expect(reviewCard).toBeInTheDocument();
  });
});