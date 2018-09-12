import {render, show} from './util.js';
import {INITIAL_STATE, levelsData} from "./data/game-data";
import getStatsTemplate from "./stats";
import game2 from "./screens/two-of-two";
import game1 from "./screens/tinder-like";
import game3 from "./screens/one-of-three";
import setGreetingScreen from "./screens/greeting";


let answersArray = [];
let lastAnswersArray = [];
let currentState;
currentState = Object.assign({}, INITIAL_STATE);


const getGameClass = (type) => {
  switch (type) {
    case `tinder-like`:
      show(game1(currentState, answersArray));
      break;
    case `two-of-two`:
      show(game2(currentState, answersArray));
      break;
    case `one-of-three`:
      show(game3(currentState, answersArray));
      break;

  }
};

export const winLevel = (isWin) => {

  let currentAnswer = {};

  if (currentState.level < 10) {
    if (isWin) {
      currentAnswer = {success: true, time: 15};
    } else {
      currentState.lives--;
      currentAnswer = {success: false, time: undefined};
    }
    answersArray.push(currentAnswer);
    currentState.level++;
  }

  if (currentState.level === 10 || currentState.lives === 0) {
    if (lastAnswersArray.length < 3) {
      lastAnswersArray.push(answersArray);
    } else {
      lastAnswersArray.shift();
      lastAnswersArray.push(answersArray);
    }

    const statScreen = render(getStatsTemplate(lastAnswersArray));
    currentState = Object.assign({}, INITIAL_STATE);

    answersArray = [];
    show(statScreen);
    const backButton = document.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      show(setGreetingScreen());
    });

  } else {
    startGame();
  }
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


export const decLife = (lives) => {
  let newLives = lives - 1;
  if (newLives < 0) {
    newLives = 0;
  }
  currentState.lives = newLives;
};

export const startGame = () => {
  getGameClass(levelsData[currentState.level].type);
};
