import { reducerCases } from './constants';

export const initialeState = {
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
  targetUrl: {
    url: '',
    matchType: 'simple',
  },
  timing: {
    type: 'immediate',
    enum: ['immediate', 'delay', 'scroll'],
  },
  frequency: {
    type: 'submit',
    enum: ['submit', 'once', 'always'],
  },
  delayTime: 1,
  components: [
    {
      _id: '',
      type: 'checkbox',
      question: "We're sorry to see you go! What's your reason for leaving?",
      options: [
        "I didn't find what I was looking for",
        "I didn't find the website easy to use",
        'It was too expensive for me',
        'I found a better product/price elsewhere',
      ],
    },
    {
      _id: '',
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      _id: '',
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      _id: '',
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_OPEN_QUESTIONS:
      return {
        ...state,
        openQuestions: action.payload,
      };
    case reducerCases.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case reducerCases.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case reducerCases.SET_TARGET:
      return {
        ...state,
        target: action.payload,
      };
    case reducerCases.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case reducerCases.SET_BG_COLOR:
      return {
        ...state,
        bgColor: action.payload,
      };
    case reducerCases.SET_TEXT_COLOR:
      return {
        ...state,
        textColor: action.payload,
      };
    case reducerCases.SET_BUTTON_COLOR:
      return {
        ...state,
        buttonColor: action.payload,
      };
    case reducerCases.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case reducerCases.SET_LOGO:
      return {
        ...state,
        logo: action.payload,
      };
    case reducerCases.SET_OPEN_TYPE:
      return {
        ...state,
        openType: action.payload,
      };
    case reducerCases.SET_OPEN_APPEARANCE:
      return {
        ...state,
        openAppearance: action.payload,
      };
    case reducerCases.SET_OPEN_TARGET:
      return {
        ...state,
        openTarget: action.payload,
      };
    case reducerCases.SET_OPEN_SUMMARY:
      return {
        ...state,
        openSummary: action.payload,
      };
    case reducerCases.SET_CURRENT_TYPE:
      return {
        ...state,
        currentType: action.payload,
      };
    case reducerCases.SET_COMPONENTS:
      return {
        ...state,
        components: action.payload,
      };
    case reducerCases.SET_TIMING:
      return {
        ...state,
        timing: {
          ...state.timing,
          type: action.payload,
        },
      };
    case reducerCases.SET_FREQUENCY:
      return {
        ...state,
        frequency: {
          ...state.frequency,
          type: action.payload,
        },
      };
    case reducerCases.SET_DELAY_TIME:
      return {
        ...state,
        delayTime: action.payload,
      };
    case reducerCases.SET_NEXT_QUESTION:
      return {
        ...state,
        nextQuestion: action.payload,
      };
    case reducerCases.SET_TARGET_URL:
      return {
        ...state,
        targetUrl: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
