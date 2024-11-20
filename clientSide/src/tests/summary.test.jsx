import { render, fireEvent, screen } from '@testing-library/react';
import Summary from '../pages/Surveys/CreateSurvey/Summary';
import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('Summary Component', () => {
  const mockDispatch = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockNextQuestion = jest.fn();
  const mockSetNextQuestion = jest.fn();

  // Move the mockSetOpenComponent here so it's used in the component
  const mockSetOpenComponent = jest.fn();
  const state = {
    name: 'Test Survey',
    description: 'This is a test survey',
    components: [
      { type: 'checkbox', question: 'Test Question 1' },
      { type: 'radio', question: 'Test Question 2' },
    ],
    status: true,
    target: '',
    bgColor: '#fff',
    buttonColor: '#000',
    textColor: '#000',
    language: 'en',
    logo: '',
    timing: { type: 'immediate' },
    frequency: { type: 'daily' },
    targetUrl: '',
    delayTime: 0,
  };

  const defaultProps = {
    openComponent: 'summary',
    setOpenComponent: mockSetOpenComponent, // Use the mock function here
    state: state,
    dispatch: mockDispatch,
    handleSubmit: mockHandleSubmit,
    isEditMode: false,
    nextQuestion: null,
    setNextQuestion: mockSetNextQuestion,
  };

  test('renders Summary component and toggles openComponent state', () => {
    render(<Summary {...defaultProps} />);

    // Find the element to click that should toggle the component visibility
    const toggleElement = screen.getByText(/Summary:/);

    // Simulate a click event
    fireEvent.click(toggleElement);

    // Ensure that the mock function was called with `null` as expected
    expect(mockSetOpenComponent).toHaveBeenCalledWith(null);
    expect(mockSetOpenComponent).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit when "Create Survey" button is clicked', async () => {
    const mockHandleSubmit = jest.fn();
    render(
      <Summary
        openComponent="summary"
        setOpenComponent={mockSetOpenComponent}
        state={state}
        dispatch={mockDispatch}
        handleSubmit={mockHandleSubmit}
        isEditMode={false}
        nextQuestion={mockNextQuestion}
        setNextQuestion={mockSetNextQuestion}
      />
    );

    // Check that the "Create Survey" button is rendered
    const button = screen.getByTestId('create-survey-button');
    // Click the button
    fireEvent.click(button);
    // Ensure handleSubmit is called
    await waitFor(
      () => {
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );
  });

  //   it('should show a success toast after survey creation', async () => {
  //     // Mock the response from handleSubmit
  //     mockHandleSubmit.mockResolvedValueOnce({
  //       status: 201,
  //     });

  //     render(
  //       <Summary
  //         openComponent="summary"
  //         setOpenComponent={mockSetOpenComponent}
  //         state={state}
  //         dispatch={mockDispatch}
  //         handleSubmit={mockHandleSubmit}
  //         isEditMode={false}
  //         nextQuestion={mockNextQuestion}
  //         setNextQuestion={mockSetNextQuestion}
  //       />
  //     );

  //     // Simulate the button click
  //     const button = screen.getByText('Create Survey');
  //     fireEvent.click(button);

  //     // Wait for the async call to complete and check if toast.success was called
  //     await waitFor(() => {
  //       expect(toast.success).toHaveBeenCalledWith('creating survey successfully');
  //     });
  //   });
});
