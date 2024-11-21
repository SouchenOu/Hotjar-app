(function () {
  const scriptElement = document.currentScript;
  const scriptSrc = new URL(scriptElement.src);
  const siteId = scriptSrc.searchParams.get('siteId');
  const currentUrl = window.location.href;
  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  if (!siteId) {
    console.error('No site ID provided.');
    return;
  }

  fetch(`https://pro1-ubq1.onrender.com/survey/getSurveyData/${siteId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.html) {
        const survey = data.survey;
        const targetDevices = survey.target;
        const timing = survey.timing;
        const frequency = survey.frequency;
        const buttonColor = survey.buttonColor;
        const delayTime = survey.delayTime;
        const surveyId = survey.surveyId;
        const components = survey.components;

        const surveyContainer = document.createElement('div');
        surveyContainer.id = 'survey-container';
        document.body.appendChild(surveyContainer);
        surveyContainer.innerHTML = data.html;

        // Worked here on making the survey responsive for both mobile and desktop views,
        // adjusting styles based on target devices to ensure optimal display on different screen sizes.
        let additionalStyles = '';
        if (targetDevices.length === 2) {
          additionalStyles = `
                     <style>
                        @media (max-width:  440px) {
                                .component {
                                    position: fixed;
                                    box-sizing: border-box;
                                    max-height: 88vh; 
                                    box-sizing: border-box;
                                    padding-right : 50px;

                                }

                                #survey-content-container {
                                    width: 80%; 
                                    box-sizing: border-box;
                                    padding: 10px;
                                    margin: 0; 
                                    border-radius: 0.5rem;
                                }
                                .additional-content-container{
                                    width: 100%;
                                    height: auto;
                                }

                                h2 {
                                    font-size: 10px;
                                }

                                .toggle-icon {
                                    font-size: 20px;
                                }

                                .next-button, .skip-button {
                                    font-size: 12px;
                                }

                                textarea, input[type="email"] {
                                    height: 30px;
                                }
                                .scoreNumber {
                                  font-size: 18px;
                                  padding: 20px; 
                                 
                                }
                                .pic{
                                  max-height: 200px; 
                                }
                        }
                        @media (min-width: 540px) {
                                #survey-content-container {
                                    width: 300px;
                                    padding: 20px;
                                    margin-left: 0;
                                    right: 10px;
                                }

                                .survey-content {
                                    width: 2px;
                                    padding: 10px;
                                }

                                .component {
                                    position: static;
                                    margin-bottom: 20px;
                                }
                                .additional-content-container{
                                    
                                    width: 300px;
                                     height: auto;
                                }

                                h2 {
                                    font-size: 16px;
                                }

                                .toggle-icon {
                                    font-size: 20px;
                                }

                                .next-button, .skip-button {
                                    font-size: 12px;
                                }

                                textarea, input[type="email"] {
                                    height: 30px;
                                }
                                .scoreNumber {
                                  font-size: 19px;
                                  padding: 16px; 
                                 
                                }
                                   .pic{
                                  max-height: 300px; 
                                }
                        }
                     </style>
                    `;
        } else if (
          targetDevices.length === 1 &&
          targetDevices.includes('mobile')
        ) {
          additionalStyles = `
                        <style>
                            @media (min-width: 768px) {
                                .survey { display: none !important; }
                            }
                                 @media (max-width: 767px) {
                                    #survey-content-container {
                                        width: 340px;
                                        margin-right: 40px;
                                      
                                    }

                                    

                                    .component {
                                        margin-top: 30px;
                                    }

                                    h2 {
                                        font-size: 16px;
                                    }

                                    .toggle-icon {
                                        font-size: 20px;
                                    }

                                    .next-button, .skip-button {
                                        font-size: 12px;
                                    }

                                    textarea, input[type="email"] {
                                        height: 30px;
                                    }
                                }
                        </style>
                    `;
        } else if (
          targetDevices.length === 1 &&
          targetDevices.includes('desktop')
        ) {
          additionalStyles = `
                        <style>
                            @media (max-width: 767px) {
                                .survey { display: none !important; }
                            }
                            @media (min-width: 540px) {
                                #survey-content-container {
                                    width: 340px;
                                    padding: 20px;
                                    margin-left: 0;
                                    right: 10px;
                                }

                                .survey-content {
                                    width: 2px;
                                    padding: 10px;
                                }

                                .component {
                                    position: static;
                                    margin-bottom: 20px;
                                }
                                .additional-content-container{
                                    
                                    width: 340px;
                                     height: auto;
                                }

                                h2 {
                                    font-size: 16px;
                                }

                                .toggle-icon {
                                    font-size: 20px;
                                }

                                .next-button, .skip-button {
                                    font-size: 12px;
                                }

                                textarea, input[type="email"] {
                                    height: 30px;
                                }
                        }
                        </style>
                    `;
        }
        document.head.insertAdjacentHTML('beforeend', additionalStyles);

        // Worked here on implementing target URL matching logic based on different match types
        // (simple, startsWith, endsWith, contains) to control when the survey should be displayed based on the current URL.
        if (
          survey.targetUrl &&
          survey.targetUrl.url &&
          survey.targetUrl.matchType
        ) {
          const { url, matchType } = survey.targetUrl;

          let match = false;
          if (matchType === 'simple') {
            match = currentUrl === url;
          } else if (matchType === 'startsWith') {
            match = currentUrl.startsWith(url);
          } else if (matchType === 'endsWith') {
            match = currentUrl.endsWith(url);
          } else if (matchType === 'contains') {
            match = currentUrl.includes(url);
          }

          if (!match) {
            return;
          }
        }
        // Worked here on implementing survey display logic based on timing options (immediate, delay, scroll),
        // ensuring the survey appears at the specified times and only if it hasn't been closed in the current session.
        switch (timing) {
          case 'immediate':
            if (!sessionStorage.getItem(`surveyClosed-${surveyId}`)) {
              // window.addEventListener('load', () => {
              //   window.scrollTo(0, 0);
              //   adjustFixedComponentPosition();
              // });
              setTimeout(() => {
                adjustFixedComponentPosition();
              }, 1000);
            }

            break;

          case 'delay':
            if (delayTime) {
              if (!sessionStorage.getItem(`surveyClosed-${surveyId}`)) {
                const delayTimeProp = delayTime * 1000;
                setTimeout(() => {
                  adjustFixedComponentPosition();
                }, delayTimeProp);
              }
            }

            break;

          case 'scroll':
            if (!sessionStorage.getItem(`surveyClosed-${surveyId}`)) {
              window.addEventListener('scroll', () => {
                adjustFixedComponentPosition();
              });
            }
            break;

          default:
            console.error('Invalid timing option');
        }

        // When the skip button is clicked, this code triggers the display of the next component
        // and adjusts the position of the fixed component accordingly.
        document.querySelectorAll('.skip-button').forEach((button) => {
          button.addEventListener('click', () => {
            showNextComponent();
            adjustFixedComponentPosition();
          });
        });
        // This code handles the functionality for the "Next" button. When clicked, it triggers
        // the display of the next survey component, adjusts the position of the fixed component,
        // collects responses from each component (checkboxes, scoreBox, designFeedback, radio,
        // NPS, longTextAnswer, and email), and sends the collected response data to the database.
        let selectedScore = null;
        document.querySelectorAll('.next-button').forEach((button) => {
          button.addEventListener('click', async () => {
            showNextComponent();
            adjustFixedComponentPosition();

            let response = null;

            // Checkboxes
            const checkboxComponent = components.find(
              (comp) => comp._doc.type === 'checkbox'
            );
            if (checkboxComponent) {
              const checkboxes = document.querySelectorAll(
                'input[type="checkbox"]'
              );
              const checkboxAnswers = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
              if (checkboxAnswers.length > 0) {
                response = {
                  componentId: checkboxComponent._doc._id,
                  question: checkboxComponent._doc.question,
                  responseValue: checkboxAnswers,
                };
              }
            }
            //scoreBoxs
            const scoreBox = components.find(
              (comp) => comp._doc.type === 'scoreBox'
            );
            if (scoreBox) {
              if (selectedScore) {
                response = {
                  componentId: scoreBox._doc._id,
                  question: scoreBox._doc.question,
                  responseValue: selectedScore,
                };
              }
            }
            //designFeedback
            const feedback = components.find(
              (comp) => comp._doc.type === 'designFeedback'
            );
            if (feedback) {
              if (selectedScore) {
                response = {
                  componentId: feedback._doc._id,
                  question: feedback._doc.question,
                  responseValue: selectedScore,
                };
              }
            }
            //Radio
            const radioComponent = components.find(
              (comp) => comp._doc.type === 'radio'
            );
            if (radioComponent) {
              const radios = document.querySelectorAll(
                'input[type="checkbox"]'
              );
              const radioAnswers = Array.from(radios)
                .filter((radio) => radio.checked)
                .map((radio) => radio.value);
              if (radioAnswers.length > 0) {
                response = {
                  componentId: radioComponent._doc._id,
                  question: radioComponent._doc.question,
                  responseValue: radioAnswers,
                };
              }
            }

            // NPS Component
            const npsComponent = components.find(
              (comp) => comp._doc.type === 'nps'
            );
            if (npsComponent) {
              const npsAnswers = document.querySelector(
                'input[type="range"]'
              )?.value;
              if (npsAnswers) {
                response = {
                  componentId: npsComponent._doc._id,
                  question: npsComponent._doc.question,
                  responseValue: npsAnswers,
                };
              }
            }

            // Long Text Answer
            const textComponent = components.find(
              (comp) => comp._doc.type === 'longTextAnswer'
            );
            if (textComponent) {
              const longTextAnswer =
                document.getElementById('longTextAnswer')?.value;
              if (longTextAnswer) {
                response = {
                  componentId: textComponent._doc._id,
                  question: textComponent._doc.question,
                  responseValue: longTextAnswer,
                };
              }
            }

            // Email Input
            const emailComponent = components.find(
              (comp) => comp._doc.type === 'email'
            );
            if (emailComponent) {
              const emailInput = document.getElementById('email')?.value;
              if (emailInput) {
                response = {
                  componentId: emailComponent._doc._id,
                  question: emailComponent._doc.question,
                  responseValue: emailInput,
                };
              }
            }

            if (response) {
              try {
                const backendResponse = await fetch(
                  'https://pro1-ubq1.onrender.com/response/saveResponse',
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      surveyId: surveyId,
                      response: response,
                      sessionId: sessionId,
                    }),
                  }
                );
                const result = await backendResponse.json();
                if (backendResponse.ok) {
                  console.log('test');
                } else {
                  console.error('Server error:', result);
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              console.log('No valid response to send.');
            }
          });
        });
        // Here, I handle the survey's closing behavior based on the `frequency` setting:
        // - If `frequency` is 'submit', the survey will close upon submission, and a session storage flag is set to prevent reopening.
        // - If `frequency` is 'submit' or 'always', the close icon is hidden to control when users can close the survey.
        // - The close button sets session storage for `frequency` 'once' to prevent reopening, while `frequency` 'always' removes any session storage flags to keep the survey available.
        document
          .getElementById('close-survey-btn')
          .addEventListener('click', function () {
            if (frequency === 'submit') {
              sessionStorage.setItem(`surveyClosed-${surveyId}`, 'true');
            }

            document.querySelector('.survey').style.display = 'none';
          });
        if (frequency === 'submit' || frequency === 'always') {
          document.getElementById('close-icon').style.display = 'none';
        }
        document
          .getElementById('close-icon')
          .addEventListener('click', function () {
            if (frequency === 'once') {
              sessionStorage.setItem(`surveyClosed-${surveyId}`, 'true');
            }
            document.querySelector('.survey').style.display = 'none';
          });
        if (frequency === 'always') {
          sessionStorage.removeItem(`surveyClosed-${surveyId}`);
        }

        const toggleIcon = document.querySelectorAll('.toggle-icon');

        toggleIcon.forEach((icon) => {
          icon.addEventListener('click', toggleSurveyContent);
        });

        // Each toggle icon is set up to allow users to switch to a "short form" view of the survey,
        // displaying only the questions without additional content. When clicked, the icon triggers
        // the `toggleSurveyContent` function to collapse or expand the survey content.
        const questionTextElements =
          document.querySelectorAll('.text-question');
        questionTextElements.forEach((questionText) => {
          const text = questionText.textContent || questionText.innerHTML;
          if (text.length > 10) {
            questionText.textContent = text.slice(0, 25) + '...';
          }
        });

        // Checkbox logic to enable/disable Next button
        // This code iterates over each survey component to manage the state of the "Next" button.
        // The button is initially disabled and styled to indicate it cannot be clicked.
        // The button will remain disabled until the user interacts with the survey components:
        // - Selecting a checkbox
        // - Entering text in a textarea
        // - Changing the value in a score input
        // - Inputting a valid email address
        // Once the user performs any of these actions, the appropriate validation functions will enable the "Next" button, allowing progression in the survey.
        document.querySelectorAll('.component').forEach((component) => {
          const checkboxes = component.querySelectorAll(
            'input[type="checkbox"]'
          );
          const nextButton = component.querySelector('.next-button');
          const textarea = component.querySelector('textarea');
          const scoreBox = component.querySelectorAll('.scoreNumber');
          const emailInput = component.querySelector('.email-input');
          const scoreInput = component.querySelector('input[type="range"]');

          if (scoreBox) {
            nextButton.disabled = true;
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.backgroundColor = '#cccccc';
            scoreBox.forEach((score) => {
              score.addEventListener('click', () => {
                selectedScore = score.textContent.trim();
                scoreBoxCheck(score, scoreBox, nextButton, buttonColor);
              });
            });
          }
          if (scoreInput) {
            nextButton.disabled = true;
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.backgroundColor = '#cccccc';
            scoreInput.addEventListener('change', () => {
              checkScoreInput(scoreInput, nextButton, buttonColor);
            });
          }

          if (checkboxes.length > 0) {
            nextButton.disabled = true;
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.backgroundColor = '#cccccc';

            checkboxes.forEach((checkbox) => {
              checkbox.addEventListener('change', () => {
                checkCheckboxes(component, nextButton, buttonColor);
              });
            });
          }

          if (textarea) {
            nextButton.disabled = true;
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.backgroundColor = '#cccccc';

            textarea.addEventListener('input', () => {
              checkTextarea(textarea, nextButton, buttonColor);
            });
          }

          if (emailInput) {
            nextButton.disabled = true;
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.backgroundColor = '#cccccc';

            emailInput.addEventListener('input', () => {
              validateEmail(emailInput, nextButton, buttonColor);
            });
          }
        });
      }
    })
    .catch((error) => console.error('Error loading survey:', error));

  function scoreBoxCheck(score, scoreNumbers, nextButton, buttonColor) {
    nextButton.disabled = false;
    nextButton.style.cursor = 'pointer';
    if (buttonColor) {
      nextButton.style.backgroundColor = buttonColor;
    } else {
      nextButton.style.backgroundColor = '#007BFF';
    }
    scoreNumbers.forEach((score) => {
      score.style.backgroundColor = '';
    });
    score.style.backgroundColor = 'blue';
  }
  function checkCheckboxes(component, nextButton, buttonColor) {
    const checkboxes = component.querySelectorAll('input[type="checkbox"]');
    let checked = false;

    checkboxes.forEach((checkbox) => {
      const label = checkbox.parentElement;

      if (checkbox.checked) {
        label.style.backgroundColor = '#E1EBEE';
        checked = true;
      }
    });
    if (checked) {
      nextButton.disabled = false;
      nextButton.style.cursor = 'pointer';
      if (buttonColor) {
        nextButton.style.backgroundColor = buttonColor;
      } else {
        nextButton.style.backgroundColor = '#007BFF';
      }
    } else {
      nextButton.disabled = true;
      nextButton.style.cursor = 'not-allowed';
      nextButton.style.backgroundColor = '#cccccc';
    }
  }

  function checkTextarea(textarea, nextButton, buttonColor) {
    if (textarea.value.trim() !== '') {
      nextButton.disabled = false;
      nextButton.style.cursor = 'pointer';
      if (buttonColor) {
        nextButton.style.backgroundColor = buttonColor;
      } else {
        nextButton.style.backgroundColor = '#007BFF';
      }
    } else {
      nextButton.disabled = true;
      nextButton.style.cursor = 'not-allowed';
      nextButton.style.backgroundColor = '#cccccc';
    }
  }

  function validateEmail(input, nextButton, buttonColor) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(input.value)) {
      nextButton.disabled = false;
      nextButton.style.cursor = 'pointer';
      if (buttonColor) {
        nextButton.style.backgroundColor = buttonColor;
      } else {
        nextButton.style.backgroundColor = '#007BFF';
      }
    } else {
      nextButton.disabled = true;
      nextButton.style.cursor = 'not-allowed';
      nextButton.style.backgroundColor = '#cccccc';
    }
  }

  function showNextComponent() {
    let currentComponentIndex = 0;
    const components = document.querySelectorAll('.component');

    components.forEach((component, index) => {
      if (component.style.display === 'block') {
        currentComponentIndex = index;
      }
    });

    if (currentComponentIndex < components.length - 1) {
      components[currentComponentIndex].style.display = 'none';
      currentComponentIndex++;
      components[currentComponentIndex].style.display = 'block';
      window.scrollTo(0, 0);
    }
  }
  function adjustFixedComponentPosition() {
    const components = document.querySelectorAll('.component');
    components.forEach((component) => {
      if (component.style.display === 'block') {
        const content = component.querySelector('.survey-content');
        if (content) {
          component.style.position = 'fixed';
          component.style.bottom = '0';
          component.style.left = '0';
          component.style.right = '0';
          component.style.top = 'auto';
          component.style.margin = '0 auto';
          component.style.padding = '20px';
        }
      }
    });
  }
  function checkScoreInput(score, nextButton, buttonColor) {
    if (score.value > 0) {
      nextButton.disabled = false;
      nextButton.style.cursor = 'pointer';
      if (buttonColor) {
        nextButton.style.backgroundColor = buttonColor;
      } else nextButton.style.backgroundColor = '#007BFF';
    } else {
      nextButton.disabled = true;
      nextButton.style.cursor = 'not-allowed';
      nextButton.style.backgroundColor = '#cccccc';
    }
  }
  function toggleSurveyContent() {
    const currentIcon = event.target;
    const contentContainer = currentIcon
      .closest('.component')
      .querySelector('.survey-content');
    const additionalContentContainer = currentIcon
      .closest('.component')
      .querySelector('.additional-content-container');
    if (contentContainer.style.display === 'none') {
      contentContainer.style.display = 'block';
      additionalContentContainer.style.display = 'none';
    } else {
      contentContainer.style.display = 'none';
      additionalContentContainer.style.display = 'block';
    }
  }
})();
