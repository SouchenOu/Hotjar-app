const defaultComponents = {
  nps: [
    {
      type: 'nps',
      question: 'How likely are you to recommend us to a friend or colleague?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  textAnswer: [
    {
      type: 'longTextAnswer',
      question:
        'What are the top challenges that you or your company are facing now?',
      text: '',
    },
    {
      type: 'nps',
      question: 'How likely are you to recommend us to a friend or colleague?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'longTextAnswer',
      question: 'Which features are most valuable to you from those products?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  AllSurveys: [
    {
      type: 'checkbox',
      question: "We're sorry to see you go! What's your reason for leaving?",
      options: [
        "I didn't find what I was looking for",
        "I didn't find the website easy to use",
      ],
    },
    {
      type: 'longTextAnswer',
      question:
        'What are the top challenges that you or your company are facing now?',
      text: '',
    },

    {
      type: 'longTextAnswer',
      question: 'Which features are most valuable to you from those products?',
      text: '',
    },

    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  CheckboxScore: [
    {
      type: 'checkbox',
      question: "We're sorry to see you go! What's your reason for leaving?",
      options: [
        "I didn't find what I was looking for",
        "I didn't find the website easy to use",
      ],
    },
    {
      type: 'scoreBox',
      question: 'How likely are you to recommend us to a friend or colleague?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'nps',
      question: 'How likely are you to recommend us to a friend or colleague?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'longTextAnswer',
      question: 'Which features are most valuable to you from those products?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  checkbox: [
    {
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
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  radio: [
    {
      type: 'radio',
      question: 'Help us improve:',
      options: [
        'Give feedback 💬',
        'Suggest an idea 💡',
        'Report an issue 🐞',
        'Something else (please specify)',
      ],
    },
    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  designFeedback: [
    {
      type: 'designFeedback',
      question: 'How satisfied are you with this design?',
      image: '/home.png',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  score: [
    {
      type: 'scoreBox',
      question: 'How likely are you to recommend us to a friend or colleague?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  scoreBox: [
    {
      type: 'scoreBox',
      question: 'What was your first impression of our website?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
      type: 'radio',
      question: 'Where did you first hear about us?',
      options: [
        'Colleague',
        'Social media',
        'Search engine (Google, Bing, etc)',
        'Blog/publications',
        'Webinar',
        'Other (please specify)',
      ],
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  textAnswer: [
    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'radio',
      question: 'Where did you first hear about us?',
      options: [
        'Colleague',
        'Social media',
        'Search engine (Google, Bing, etc)',
        'Blog/publications',
        'Webinar',
        'Other (please specify)',
      ],
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  AllSurveys: [
    {
      type: 'radio',
      question: 'Where did you first hear about us?',
      options: [
        'Colleague',
        'Social media',
        'Search engine (Google, Bing, etc)',
      ],
    },
    {
      type: 'scoreBox',
      question: 'What was your first impression of our website?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },

    {
      type: 'longTextAnswer',
      question: 'What could we do to improve?',
      text: '',
    },
    {
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
  CheckboxScore: [
    {
      type: 'scoreBox',
      question: 'What was your first impression of our website?',
      lowScoreTitle: 'Not likely at all',
      highScoreTitle: 'Extremely likely',
    },
    {
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
      type: 'email',
      question:
        "We may want to follow up. If you're happy to be contacted, enter your email:",
      validation: '',
    },
    {
      type: 'cta',
      question:
        'Thank you for answering this survey. Your feedback is highly appreciated!',
    },
  ],
};

export default defaultComponents;
