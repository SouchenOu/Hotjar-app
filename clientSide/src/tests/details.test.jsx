import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '../pages/Surveys/CreateSurvey/Details';
import { reducerCases } from '../context/constants';

describe('Details Component', () => {
  const mockDispatch = jest.fn();
  const mockSetOpenComponent = jest.fn();

  const initialState = {
    name: 'Survey Name',
    description: 'Survey Description',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Details component correctly when closed', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent=""
        setOpenComponent={mockSetOpenComponent}
      />
    );

    expect(screen.getByText('Details:')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Name (internal) *')
    ).not.toBeInTheDocument();
  });

  test('opens the details section when clicked', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent=""
        setOpenComponent={mockSetOpenComponent}
      />
    );

    const toggleButton = screen.getByText('Details:').closest('div');
    // Simulates a click event on the toggle button.
    fireEvent.click(toggleButton);
    // Verifies that mockSetOpenComponent was called with "details", meaning the component should open
    expect(mockSetOpenComponent).toHaveBeenCalledWith('details');
  });

  test('closes the details section when already open', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent="details"
        setOpenComponent={mockSetOpenComponent}
      />
    );

    const toggleButton = screen.getByText('Details:').closest('div');
    fireEvent.click(toggleButton);
    // Confirms mockSetOpenComponent was called with null, closing the component.
    expect(mockSetOpenComponent).toHaveBeenCalledWith(null);
  });

  test('updates name input and dispatches correct action', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent="details"
        setOpenComponent={mockSetOpenComponent}
      />
    );

    const nameInput = screen.getByLabelText(/Name \(internal\) \*/i);
    fireEvent.change(nameInput, { target: { value: 'New Survey Name' } });
    // Verifies mockDispatch was called with the correct action to update the name field.
    expect(mockDispatch).toHaveBeenCalledWith({
      type: reducerCases.SET_NAME,
      payload: 'New Survey Name',
    });
  });

  test('updates description textarea and dispatches correct action', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent="details"
        setOpenComponent={mockSetOpenComponent}
      />
    );

    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(descriptionInput, {
      target: { value: 'New Survey Description' },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: reducerCases.SET_DESCRIPTION,
      payload: 'New Survey Description',
    });
  });

  test('clicking Next button calls setOpenComponent with "type"', () => {
    render(
      <Details
        state={initialState}
        dispatch={mockDispatch}
        openComponent="details"
        setOpenComponent={mockSetOpenComponent}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    // Confirms mockSetOpenComponent was called with "type", transitioning to the next step.
    expect(mockSetOpenComponent).toHaveBeenCalledWith('type');
  });
});
