const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const generateAnswersArray = (answersCount, successAnswers, fastAnswers, slowAnswers) => {
  let array = [];
  for (let i = 0; i < answersCount; ++i) {
    let answer = {
      success: false,
      time: undefined
    };
    if (i < successAnswers) {
      answer.success = true;
      if (i < fastAnswers) {
        answer.time = getRandomInt(1, 9);
      } else if (i >= fastAnswers && i < slowAnswers + fastAnswers) {
        answer.time = getRandomInt(21, 30);
      } else {
        answer.time = getRandomInt(11, 19);
      }
    } else {
      answer.success = false;

    }
    array.push(answer);
  }
  return array;
};
