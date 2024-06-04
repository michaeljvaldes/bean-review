import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrentUserContext from './CurrentUserContext';

describe('<CurrentUserContext />', () => {
  test('it should mount', () => {
    render(<CurrentUserContext />);

    const CurrentUserContext = screen.getByTestId('CurrentUserContext');

    expect(CurrentUserContext).toBeInTheDocument();
  });
});