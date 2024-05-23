import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateReviewForm from './CreateReviewForm';

describe('<CreateReviewForm />', () => {
  test('it should mount', () => {
    render(<CreateReviewForm />);

    const CreateReviewForm = screen.getByTestId('CreateReviewForm');

    expect(CreateReviewForm).toBeInTheDocument();
  });
});