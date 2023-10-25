import React from 'react';
import { render, screen } from '@testing-library/react';
import { Landing } from './Landing';

test('renders Landing component correctly', () => {
  const { getByText, getByTestId } = render(<Landing />);

  // Check if the component renders the heading text
  const headingElement = screen.getByText(/this is landingpage/i);
  expect(headingElement).toBeInTheDocument();

  // Check if the component has a container with specific background color
  const containerElement = screen.getByTestId('landing-container');
  expect(containerElement).toHaveStyle('background-color: #FFC0CB');
});
