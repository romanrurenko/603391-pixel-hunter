

export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 2,
  time: 0
});

const POINTS = {
  successAnswer: 100,
  fastAnswer: 50,
  slowAnswer: -50,
  forLife: 50
};

export const decLife = (lives) => {
  let newLives = lives - 1;
  if (newLives < 0) {
    newLives = 0;
  }
  return newLives;
};

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

export const gamePoints = (answers, lives) => {
  let sumGamePoint = 0;
  let oneAnswerPoints = 0;
  let successAnswers = 0;
  answers.forEach((element) => {
    if (element.success) {
      successAnswers += 1;
    }
    oneAnswerPoints = 0;
    oneAnswerPoints += (element.success) ? POINTS.successAnswer : 0;
    if (element.time >= 20) {
      oneAnswerPoints += POINTS.slowAnswer;
    }
    if (element.time < 10) {
      oneAnswerPoints += POINTS.fastAnswer;
    }
    sumGamePoint += oneAnswerPoints;
  }
  );
  sumGamePoint += lives * POINTS.forLife;
  if (successAnswers < 10) {
    sumGamePoint = -1;
  }

  return sumGamePoint;
};


