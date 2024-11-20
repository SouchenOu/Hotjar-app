export const generateLogo = (logoPath, isArabic) => {
  return logoPath
    ? `<img src="${logoPath}" alt="Survey Logo" style="width: 30px; height: 30px; margin-${isArabic ? 'right' : 'left'}: 120px;">`
    : '';
};

export const generateOptions = (options, survey, inputType) => {
  return options
    .map(
      (option) => `
        <label style="display: flex; align-items: center; margin: 5px 0; padding: 1px 10px; border: 1px solid #505050; border-radius: 30px; width: 100%; background-color: #ffffff;" 
            onmouseover="this.style.backgroundColor='#E1EBEE';" onmouseout="this.style.backgroundColor='#ffffff';">
            <input type="checkbox" value="${option}"
                ${
                  inputType === 'checkbox'
                    ? `style="margin-right: 10px; width: 20px; height: 20px; color: #00308F;"`
                    : `onchange="this.style.backgroundColor = this.checked ? '#00BFFF' : '#ffffff';" style="-webkit-appearance: none; appearance: none; border-radius: 50%; width: 20px;height: 20px; border: 2px solid #00308F; background-color: #ffffff; cursor: pointer; position: relative; margin-right: 10px;"`
                } />
            <span style="font-size: 15px; color: ${survey.textColor}; padding: 5px 10px; cursor: pointer;">${option}</span>
        </label>
    `
    )
    .join('');
};

export const generateNPS = (component, survey) => {
  return `
        <div>
            <input
                type="range"
                min="0"
                max="10"
                value="0"
                oninput="this.style.background = 'linear-gradient(to right, #007BFF ' + (this.value / 10 * 100) + '%, #ccc ' + (this.value / 10 * 100) + '%')"
                style="width: 100%; height: 2px; background: linear-gradient(to right, #007BFF); border-radius: 5px;"
            />
            <div style="display: flex; justify-content: space-between; font-size: 16px; margin-top: 5px; color: #000000;">
                ${Array.from({ length: 11 }, (_, i) => `<span>${i}</span>`).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 5px; color: #000000;">
                <span style="color: ${survey.textColor};">${component.lowScoreTitle}</span>
                <span style="color: ${survey.textColor};">${component.highScoreTitle}</span>
            </div>
        </div>
    `;
};

export const generateScore = (component, survey) => {
  const number = ['1', '2', '3', '4', '5'];

  return `
        <div style="display: flex; flex-wrap: wrap; gap: 20px; padding-top: 30px">
            <div style="cursor: pointer">
                ${number
                  .map(
                    (num) => `
                    <span class="scoreNumber" style="font-size: 18px; font-weight: bold; border: 2px solid #d1d5db; padding: 10px; padding-left: 20px; padding-right: 20px; color: ${survey.textColor};">${num}</span>
                `
                  )
                  .join('')}
            </div>
            <div style="display: flex; gap: 80px; justify-content: space-between; font-size: 16px; margin-top: 5px; color: #000000">
                <span style="color: ${survey.textColor}; font-size: 15px">${component.lowScoreTitle}</span>
                <span style="color: ${survey.textColor}; font-size: 15px">${component.highScoreTitle}</span>
            </div>
        </div>
    `;
};

export const generateText = (type) => {
  return `
        ${
          type === 'longTextAnswer'
            ? `<textarea id="longTextAnswer" placeholder="Please type here..." style="width: 100%; color: black; padding: 10px; border: 1px solid #ccc; border-radius: 4px; height: 50%;" onfocus="this.style.borderColor='blue'" onblur="this.style.borderColor='#ccc'"></textarea>`
            : `<input class="email-input" id="email" type="email" placeholder="Please type here..." style="width: 100%; color: black; padding: 10px; height: 35px; border: 1px solid #ccc; border-radius: 4px;" onfocus="this.style.borderColor='blue'" onblur="this.style.borderColor='#ccc'"/>`
        }
    `;
};
export const generateFeedback = (component, survey, fullImageURL) => {
  const number = ['1', '2', '3', '4', '5'];

  return `
        <div>
        ${component.image ? `<img src="${fullImageURL}" alt="Design Feedback Image" style="width: 100%; max-width: 400px; height: auto; max-height: 300px; object-fit: contain;" />` : ''}
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px">
                <div style="cursor: pointer">
                    ${number
                      .map(
                        (num) => `
                        <span class="scoreNumber" style="font-size: 18px; font-weight: bold; border: 2px solid #d1d5db; padding: 10px; padding-left: 20px; padding-right: 20px; color: ${survey.textColor};">${num}</span>
                    `
                      )
                      .join('')}
                </div>
                <div style="display: flex; gap: 70px; justify-content: space-between; font-size: 16px; margin-top: 5px; color: #000000">
                    <span style="color: ${survey.textColor}">${component.lowScoreTitle}</span>
                    <span style="color: ${survey.textColor}">${component.highScoreTitle}</span>
                </div>
            </div>
        </div>
    `;
};

export const generateButtons = (isArabic) => {
  return `
        <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
            <button class="skip-button" style="font-size: 15px; background-color: transparent; color: black; border: none; cursor: pointer; text-decoration: underline;">
                ${isArabic ? 'تجاوز' : 'Skip'}
            </button>
            <button class="next-button" style="font-size: 15px; height: 30px; width: 70px; font-weight: bold; background-color: #007BFF; color: white; border: none; cursor: pointer;">
                ${isArabic ? 'التالي' : 'Next'}
            </button>
        </div>
    `;
};
