import { render, screen } from '@testing-library/react';
import React from 'react';
import Behavior from '../pages/Surveys/CreateSurvey/Behavior';
import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

describe('Behavior component', () => {
  const mockSetOpenComponent = jest.fn();
  const mockDispatch = jest.fn();
  const mockState = {
    timing: {
      type: 'immediate',
      enum: ['immediate', 'delay', 'scroll'],
    },
    frequency: {
      type: 'submit',
      enum: ['submit', 'once', 'always'],
    },
    delayTime: 0,
  };
  beforeEach(() => {
    mockDispatch.mockClear(); // Clear any previous calls to the mock function
  });

  test('renders the Behavior component', () => {
    render(
      <Behavior
        openComponent="behavior"
        setOpenComponent={mockSetOpenComponent}
        dispatch={mockDispatch}
        state={mockState}
      />
    );

    // Check if elements are rendering correctly
    expect(screen.getByText('Behavior:')).toBeInTheDocument();
    expect(
      screen.getByText('Shown immediately, multiple responses')
    ).toBeInTheDocument();
    expect(screen.getByText('Timing')).toBeInTheDocument();
    expect(screen.getByText('Frequency')).toBeInTheDocument();
  });
  test('toggles the component visibility', () => {
    const mockSetOpenComponent = jest.fn();
    const mockDispatch = jest.fn();
    const state = {
      timing: { type: 'immediate' },
      frequency: { type: 'once' },
      delayTime: 0,
    };

    // Render the component with initial openComponent as null
    render(
      <Behavior
        openComponent="behavior" // Initial state is null
        setOpenComponent={mockSetOpenComponent}
        dispatch={mockDispatch}
        state={state}
      />
    );

    // Find the element that triggers the toggle
    const toggleElement = screen.getByText(/Behavior:/);

    // First click: should open the component, setting 'behavior'
    fireEvent.click(toggleElement);

    // Check if mockSetOpenComponent was called with 'behavior'
    expect(mockSetOpenComponent).toHaveBeenCalledWith(null);
    expect(mockSetOpenComponent).toHaveBeenCalledTimes(1); // Ensure it's called once
  });
});
