import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Roasters from './Roasters';

describe('<Roasters />', () => {
  test('it should mount', () => {
    render(<Roasters />);
    
    const roasters = screen.getByTestId('Roasters');

    expect(roasters).toBeInTheDocument();
  });
});