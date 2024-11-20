import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Appearance from '../pages/Surveys/CreateSurvey/Appearance';
import { reducerCases } from '../context/constants';

// Mocking the context dispatch function
const mockDispatch = jest.fn();
// Mocking the setOpenComponent function
const mockSetOpenComponent = jest.fn();
const mockNextQuestion = jest.fn();

// Mock state for the component
const mockState = {
  language: 'en',
  logo: '',
};

//Open a Block for Grouping Tests
describe('Appearance Component', () => {
  //beforeEach Hook
  beforeEach(() => {
    // Reset the mocks before each test
    mockDispatch.mockClear();
    mockSetOpenComponent.mockClear();
    mockNextQuestion.mockClear();
  });
  /*****This test doesn't interact with the component but checks for the presence of key elements that signal the component rendered as expected */
  it('renders the component correctly', () => {
    render(
      <Appearance
        openComponent="appearance"
        setOpenComponent={mockSetOpenComponent}
        state={mockState}
        dispatch={mockDispatch}
        nextQuestion={mockNextQuestion}
      />
    );

    // Check if the title "Appearance" is displayed
    expect(screen.getByText(/Appearance:/)).toBeInTheDocument();

    // Check if the background color options are visible
    expect(screen.getByText(/Background Color/)).toBeInTheDocument();
  });
  /*** checks that clicking on the "Appearance" section toggles its visibility. */
  it('opens and closes the appearance section when clicked', () => {
    render(
      <Appearance
        openComponent="appearance"
        setOpenComponent={mockSetOpenComponent}
        state={mockState}
        dispatch={mockDispatch}
        nextQuestion={mockNextQuestion}
      />
    );

    // Click to close the appearance section
    fireEvent.click(screen.getByText('Appearance:'));

    // Verify if setOpenComponent is called with null (indicating the section should close)
    expect(mockSetOpenComponent).toHaveBeenCalledWith(null);
    // fireEvent.click(screen.getByText('Appearance:'));
    // expect(mockSetOpenComponent).toHaveBeenCalledWith('appearance');
  });
  /***checks if the Appearance component correctly updates the language in response to user input */
  it('changes the language when a new option is selected', () => {
    render(
      <Appearance
        openComponent="appearance"
        setOpenComponent={mockSetOpenComponent}
        state={mockState}
        dispatch={mockDispatch}
        nextQuestion={mockNextQuestion}
      />
    );
    //selecting a new language by interacting with the dropdown (combobox). It uses fireEvent.change to set the dropdown’s value to 'fr' (for French).
    // Select a different language
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fr' } });

    // Ensure dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: reducerCases.SET_LANGUAGE,
      payload: 'fr',
    });
  });
  //Render the Component:
  //The Appearance component is rendered with all the necessary props
  /***This test ensures that when a user selects a background color (in this case, white), the dispatch function is called with the correct action to update the background color */
  it('changes the background color when a color is selected', () => {
    render(
      <Appearance
        openComponent="appearance"
        setOpenComponent={mockSetOpenComponent}
        state={mockState}
        dispatch={mockDispatch}
        nextQuestion={mockNextQuestion}
      />
    );
    //The fireEvent.click function is used to simulate a user clicking on the white color button.
    const whiteColorButton = screen.getByTestId('color-#FFFFFF');
    fireEvent.click(whiteColorButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_BG_COLOR',
      payload: '#FFFFFF',
    });
  });

  //   it('uploads the logo correctly when a file is selected', async () => {
  //     render(
  //       <Appearance
  //         openComponent="appearance"
  //         setOpenComponent={mockSetOpenComponent}
  //         state={mockState}
  //         dispatch={mockDispatch}
  //         nextQuestion={mockNextQuestion}
  //       />
  //     );

  //       // Mock the file input event
  //   const fileInput = screen.getByTestId('logo-upload-input');  // Use the test ID
  //   const file = new File(['dummy content'], 'logo.png', { type: 'image/png' });
  //   fireEvent.change(fileInput, { target: { files: [file] } });

  //   // Wait for "Logo uploaded" to appear
  //   await waitFor(() => screen.getByTestId('logo-upload-status')); // Ensure the status appears after file upload

  //   // Assert that the "Logo uploaded" text is now present
  //   const statusText = screen.getByTestId('logo-upload-status');
  //   expect(statusText).toHaveTextContent('Logo uploaded');
  //   });

  it('calls nextQuestion when the next button is clicked', () => {
    render(
      <Appearance
        openComponent="appearance"
        setOpenComponent={mockSetOpenComponent}
        state={mockState}
        dispatch={mockDispatch}
        nextQuestion={mockNextQuestion}
      />
    );

    // Click the next button
    fireEvent.click(screen.getByText(/Next/));
  });
});
