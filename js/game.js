import {insertToMainContainer, createElement} from './util.js';
import {getHeader} from "./header";
import {level, INITIAL_STATE} from "./data/game-data";
import {getList} from "./stats-line";
import {getStatsTemplate} from "./stats";
import {setIntroScreen} from "./intro";
import {resize} from "./resize";

let answersArray = [];
let lastAnswersArray = [];
let currentGame;
currentGame = Object.assign({}, INITIAL_STATE);

const setListeners = () => {
  const form = document.querySelector(`.game__content`);
  form.addEventListener(`click`, onInputsChange);
  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    setIntroScreen();
  });
};
const getGameTamplate = (type, currentLevel, levelData) => {
  let template;
  let image1;
  let image2;
  let image3;

  switch (type) {
    case `two-of-two`:
      image1 = resize({width: 468, height: 458}, levelData[currentLevel].answers[0].image);
      image2 = resize({width: 468, height: 458}, levelData[currentLevel].answers[1].image);
      template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" width="${image1.width}" height="${image1.height}"}>
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
         <img src="${levelData[currentLevel].answers[1].image.url}" alt="Option 2"  width="${image2.width}" height="${image2.height}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getList(answersArray)}
  </section>`;

      break;
    case `tinder-like`:
      image1 = resize({width: 705, height: 455}, levelData[currentLevel].answers[0].image);
      template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
         <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" width="${image1.width}" height="${image1.height}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  ${getList(answersArray)}
  </section>`;

      break;

    case `one-of-three`:
      image1 = resize({width: 304, height: 455}, levelData[currentLevel].answers[0].image);
      image2 = resize({width: 304, height: 455}, levelData[currentLevel].answers[1].image);
      image3 = resize({width: 304, height: 455}, levelData[currentLevel].answers[2].image);
      template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" data-option=1 width="${image1.width}" height="${image1.height}">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${levelData[currentLevel].answers[1].image.url}" alt="Option 2" data-option=2 width="${image2.width}" height="${image1.height}">
      </div>
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[2].image.url}" alt="Option 3" data-option=3 width="${image3.width}" height="${image1.height}">
      </div>
    </form>
  ${getList(answersArray)}
  </section>`;

      break;
    default: template = `Error`;
  }

  return template;
};
const refreshLevelScreen = () => {
  const gameContainerElement = document.createDocumentFragment();
  const headerElement = createElement(getHeader(currentGame));
  const levelElement = createElement(getGameTamplate(level[currentGame.level].type, currentGame.level, level));
  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(levelElement);

  return gameContainerElement;
};
const onInputsChange = (evt) => {
  const inputs = document.querySelectorAll(`input`);
  switch (level[currentGame.level].type) {
    case `two-of-two`:checkTwoOfTwo(inputs); break;
    case `tinder-like`: checkTinderLike(inputs); break;
    case `one-of-three`: checkOneOfThree(inputs, evt); break;
    default: break;
  }
};
const goToNextLevel = (rightAnswer) => {
  let answer = {};

  if (currentGame.level < 10) {
    if (rightAnswer) {
      answer = {success: true, time: 15};
    } else {
      answer = {success: false, time: undefined};
    }
    answersArray.push(answer);
    currentGame.level += 1;
  }

  if (currentGame.level === 10 || currentGame.lives === 0) {
    if (lastAnswersArray.length < 3) {
      lastAnswersArray.push(answersArray);
    } else {
      lastAnswersArray.shift();
      lastAnswersArray.push(answersArray);
    }

    const statScreen = createElement(getStatsTemplate(lastAnswersArray));
    currentGame = Object.assign({}, INITIAL_STATE);

    answersArray = [];
    insertToMainContainer(statScreen);


  } else {
    startGame();
  }
};
const decLife = (lives) => {
  let newLives = lives - 1;
  if (newLives < 0) {
    newLives = 0;
  }
  currentGame.lives = newLives;
};
const checkOneOfThree = (inputs, evt) => {
  const targetOption = evt.target.dataset.option;
  const countPainting = level[currentGame.level].answers.slice().map((it) => it.type).filter(function (it) {
    return it === `painting`;
  }).length;
  const rightAnswer = (countPainting > 1) ? `photo` : `painting`;

  if (targetOption !== undefined) {
    if (level[currentGame.level].answers[targetOption - 1].type === rightAnswer) {
      goToNextLevel(true);
    } else {
      decLife(currentGame.lives);
      goToNextLevel(false);
    }
  }
};
const checkTinderLike = (inputs) => {
  for (const it of inputs) {
    if (it.checked) {
      if (it.value === level[currentGame.level].answers[0].type) {
        goToNextLevel(true);
      } else {
        decLife(currentGame.lives);
        goToNextLevel(false);
      }
    }
  }
};
const checkTwoOfTwo = (inputs) => {
  const checkedButtons = Array.from(inputs).map((item)=>
    item.checked ? item.value : ``).filter((it) => it !== ``);

  let answersData = level[currentGame.level].answers.map((item)=>
    item.type);

  if (checkedButtons.length > 1) {
    if (JSON.stringify(answersData) === JSON.stringify(checkedButtons)) {
      goToNextLevel(true);
    } else {
      decLife(currentGame.lives);
      goToNextLevel(false);
    }
  }
};


export const startGame = () => {
  insertToMainContainer(refreshLevelScreen());
  setListeners();
};
