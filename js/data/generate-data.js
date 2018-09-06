const COUNT_LEVELS = 10;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const generateAnswersArray = (successAnswers, falseAnswers, fastAnswers, slowAnswers) => {
  let array = [];
  for (let i = 0; i < COUNT_LEVELS; ++i) {
    let answer = {
      success: undefined,
      time: undefined
    };

    if (successAnswers > 0) {
      answer.success = true;
      --successAnswers;

      if (fastAnswers > 0) {
        answer.time = getRandomInt(1, 9);
        --fastAnswers;
      } else if (slowAnswers > 0) {
        answer.time = getRandomInt(20, 30);
        --slowAnswers;
      } else if ((COUNT_LEVELS - fastAnswers + slowAnswers) > 0) {
        answer.time = getRandomInt(11, 19);
      }
    } else if (falseAnswers > 0) {
      answer.success = false;
      --falseAnswers;
    }

    array.push(answer);
  }
  return array;
};
