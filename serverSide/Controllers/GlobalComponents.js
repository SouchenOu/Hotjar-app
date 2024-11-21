import {
  generateButtons,
  generateFeedback,
  generateLogo,
  generateNPS,
  generateOptions,
  generateScore,
  generateText,
} from './surveyComponents.js';

export const generateComponent = (
  component,
  index,
  isArabic,
  survey,
  inputType,
  fullImageURL,
  logoPath
) => {
  const logoHtml = generateLogo(logoPath, isArabic);
  const Htmlcomponent =
    component.type === 'checkbox' || component.type === 'radio'
      ? generateOptions(component.options, survey, inputType)
      : component.type === 'nps'
        ? generateNPS(component, survey)
        : component.type === 'score' || component.type === 'scoreBox'
          ? generateScore(component, survey)
          : component.type === 'designFeedback'
            ? generateFeedback(component, survey, fullImageURL)
            : component.type === 'longTextAnswer' || component.type === 'email'
              ? generateText(component.type)
              : '';
  const buttonsHtml = generateButtons(isArabic);

  return `
        <div class="component" style="display: ${index === 0 ? 'block' : 'none'}; position: fixed; z-index: 9999;">
            <div id="survey-content-container" class="survey-content" style="display: block; background-color: ${survey.backgroundColor}; border: 1px solid #d1d5db; height: auto; border-radius: 0.5rem;">
                <div style="display: flex;align-items: center; justify-content: space-between;    width: 100%;">
                    <i class="toggle-icon fas fa-caret-down" style=" top: 30px;  font-size: 20px; width: 20px; height: 20px; cursor: pointer; color: #686868;"></i>
                    <i id="close-icon" class="fas fa-times" style="top: 30px;   font-size: 20px; width: 20px; height: 20px; cursor: pointer; color: #686868;"></i>

                </div>
                <div style="margin-top: 20px; gap: 20px">
                    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                        ${logoHtml}
                        <h2 style="font-size: 16px; color: ${survey.textColor};">${component.question}</h2>
                    </div>
                    <div style="flex: 1; overflow-y: auto; width: 100%;">
                        ${Htmlcomponent}
                        

                    </div>
                    ${buttonsHtml}
                </div>
            </div>
            <div class="additional-content-container" style="display: none; background-color: ${survey.backgroundColor}; border: 1px solid #d1d5db; border-radius: 0.5rem; padding : 5px">
                ${
                  !isArabic
                    ? `
                    <i class="toggle-icon fas fa-caret-up" style="position: absolute; top: 30px; margin-left: 20px; font-size: 20px; width: 30px; height: 30px; cursor: pointer; color: #686868;"></i>
                    <h1 class="text-question" style="font-size: 18px; color: #000000;  margin-left: 50px;">${component.question}</h1>
                `
                    : `
                    <i class="toggle-icon fas fa-caret-up" style="position: absolute; top: 30px; margin-right: 20px; font-size: 20px; width: 30px; height: 30px; cursor: pointer; color: #686868;"></i>
                    <h1 class="text-question" style="font-size: 18px; color: #000000; margin-right: 50px;">${component.question}</h1>
                `
                }
            </div>
        </div>
    `;
};
