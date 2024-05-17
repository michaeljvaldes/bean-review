import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SideDrawer from './SideDrawer';

describe('<SideDrawer />', () => {
  test('it should mount', () => {
    render(<SideDrawer />);
    
    const sideDrawer = screen.getByTestId('SideDrawer');

    expect(sideDrawer).toBeInTheDocument();
  });
});