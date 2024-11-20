/***
 * Initial Rendering Test: Checks if the Page component and essential UI elements (like titles and buttons) are rendered properly.
Navigate Test: Verifies that the navigate function is called when the close button (faXmark) is clicked. */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Page from '../pages/Surveys/CreateSurvey/Page';
import { useStateProvider } from '../context/StateContext';
import '@testing-library/jest-dom';

// Import useNavigate directly
import { useNavigate } from 'react-router-dom';

// Mocking the context and axios
jest.mock('axios');
jest.mock('../context/StateContext', () => ({
  useStateProvider: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Page Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Setup mock for state context
    useStateProvider.mockReturnValue([{ userInfo: { _id: 'testUserId' } }]);

    axios.post.mockResolvedValue({ status: 201 }); // Mock the API call to resolve with a 201 status
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/site/66dc92aa477274e6a0a172a9/survey/create/template/66d30d9c822cb9f4756efee7',
        ]}
      >
        <Page />
      </MemoryRouter>
    );

    // Check if this two elements are present in the page
    expect(screen.getByText('Create a new survey')).toBeInTheDocument();
    expect(screen.getByText('Create survey')).toBeInTheDocument();
  });

  test('navigates home when close icon is clicked', () => {
    const mockNavigate = jest.fn(); // Create a mock navigate function
    useNavigate.mockReturnValue(mockNavigate); // Ensure that useNavigate returns the mock function

    render(
      <MemoryRouter
        initialEntries={[
          '/site/66dc92aa477274e6a0a172a9/survey/create/template/66d30d9c822cb9f4756efee7',
        ]}
      >
        <Page />
      </MemoryRouter>
    );
    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);

    // Check if navigate is called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/site/undefined/surveys');
  });
});
