import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Questions from '../pages/Surveys/CreateSurvey/Questions';

describe('Questions component', () => {
  const mockSetOpenComponent = jest.fn();
  const mockNextQuestion = jest.fn();
  const mockDispatch = jest.fn();

  const mockState = {
    userInfo: undefined,
    openQuestions: false,
    name: 'Exit-intent survey',
    description:
      'Gather feedback before visitors leave your site and reduce your bounce rate',
    target: ['desktop', 'mobile'],
    status: false,
    bgColor: '#FFFFFF',
    buttonColor: '#007BFF',
    textColor: '#000000',
    language: 'en',
    logo: '',
    openType: false,
    openAppearance: false,
    openTarget: false,
    openSummary: false,
    currentType: 'checkbox',
    nextQuestion: undefined,
    targetUrl: { url: '', matchType: 'simple' },
    timing: { type: 'immediate', enum: ['immediate', 'delay', 'scroll'] },
    frequency: { type: 'submit', enum: ['submit', 'once', 'always'] },
    delayTime: '1',
    components: [
      {
        _id: '',
        type: 'checkbox',
        question: "We're sorry to see you go! What's your reason for leaving?",
        options: ['Option 1', 'Option 2'],
      },
      {
        _id: '',
        type: 'longTextAnswer',
        question: 'What could we do to improve?',
        text: '',
      },
    ],
  };

  test('renders correctly with initial props', () => {
    render(
      <Questions
        openComponent="someValue"
        setOpenComponent={mockSetOpenComponent}
        template={{ someKey: 'someValue' }}
        dispatch={mockDispatch}
        state={mockState}
        nextQuestion={mockNextQuestion}
      />
    );

    // Ensure the component renders expected content based on state and props
    expect(screen.getByText(/Exit-intent survey/)).toBeInTheDocument();
    expect(screen.getByText(/We're sorry to see you go!/)).toBeInTheDocument();
  });
});
